const jwt = require('jsonwebtoken');
const CustomAPIError = require('../errors/custom-error');
const Ajv = require('ajv');
const StatusCodes = require('http-status-codes');
const redis = require('redis');
const redisPort = 6379;

const client = redis.createClient({
    legacyMode: true
});

client.connect()
    .then(async (res) => {
        console.log('connected to redis server');
    })
    .catch((err) => {
        console.log('err happened' + err);
    });

const authenticationMiddleware = async (req, res, next) => {
    // AJV for req body validation
    var userSchema = {  
        type: 'object',  
        properties: {
            username: {
                type: 'string',     
            },    
            password: { type: 'string' }  
        },  
        required: ['username', 'password'],
        additionalProperties: false
    };
    const ajv = new Ajv({allErrors: true});
    try { 
        const validate = ajv.addSchema(userSchema).compile(userSchema);
        const valid = validate(req.body);
        if (!valid) {
            throw validate.errors[0].message;
        }
    } catch (error) {
        res.status(StatusCodes.UNAUTHORIZED).end('Invalid body format: ' + error);    
        return; 
    }

    // Validating the JWT token
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new CustomAPIError('no token provided', 400);
    }
    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        throw new CustomAPIError('Not authorized to access this route', 400);
    }

    cache(req, res, next);
    client.set(req.body.username, req.body.password);
    next();
};

function cache(req, res, next) {
    const username = req.body.username;
    //console.log('username: CC ' + username);
    client.get(username, (err, data) => {
        if (err) throw err.message;
        if (data != null) {
            console.log("cached data", username);
        } else {
            next();
        }
    });
}

module.exports = authenticationMiddleware;