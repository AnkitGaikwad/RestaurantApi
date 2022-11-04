const Order = require('../Models/Order');

const getAllOrders = async (req, res) => {
    const name = req.params.name;
    const ordersList = await Order.find({ChefName: name});
    //console.log(ordersList);
    res.send(`Welcome ${name}, your orders are: \n ${ordersList}`);
};

module.exports = {
    getAllOrders
};