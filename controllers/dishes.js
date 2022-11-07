const Dish = require('../Models/Dish');
const Chef = require('../Models/Chef');
const Order = require('../Models/Order');
const asyncWrapper = require('../Middleware/async');

const getDishRequest = asyncWrapper( async (req, res) => {
        const query = req.query;
        const dish = await Dish.findOne({Name: query.name});
        const chefType = dish.TypeChef;
        res.staus(200).send(`Your requested dish ${query.name} is being prepared.`);
        //saveOrder();
        // const token = jwt.sign({username, password}, process.env.JWT_SECRET, {expiresIn: '30d'});
        // console.log(token);
        let order = {};
        order.DishName = query.name;
        order.TypeChef = chefType;
        order.CustomerName = query.cus;
        await Order.create(order);
    }   
);

module.exports = {
    getDishRequest
};