const Chef = require('../Models/Chef');
const Order = require('../Models/Order');
const asyncWrapper = require('../Middleware/async');

const getAllOrders = asyncWrapper( async (req, res) => {
    const name = req.params.name;
    const chef = await Chef.findOne({Name: name});
    const ordersList =  await Order.find({TypeChef: chef.TypeChef});
    let chefOrders = [];
    for (let i = 0; i < ordersList.length; i++) {
        for (let j = 0; j < chef.Speciality.length; j++) {
            if (ordersList[i].DishName === chef.Speciality[j]) {
                chefOrders.push(ordersList[i]);
            }
        }
    }
    res.status(200).json({"Welcome": `${name}`, "Orders List": chefOrders});
} );

module.exports = {
    getAllOrders
};