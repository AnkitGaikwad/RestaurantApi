

// cache middleware 
const cache = async (req, res, next) =>{
    const username = req.params.username;
    
    //console.log('username: CC ' + username);
    client.get(username, (err, data) => {
        if (err) throw err.message;
        if (data != null) {
            res.send("cached data");
        } else {
            next();
        }
    });
}

module.exports = cache;