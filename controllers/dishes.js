const Dish = require('../Models/Dish');
const Chef = require('../Models/Chef');
const Order = require('../Models/Order');

const getDishRequest = async (req, res) => {
    try {
        const query = req.query;
        const dish = await Dish.findOne({Name: query.name});
        const chefType = dish.TypeChef;
        const chefList = await Chef.find({TypeChef: chefType});
        let chefName = '';
        for (let i = 0; i < chefList.length; i++) {
            let speciality = chefList[i].Speciality;
            for (let j = 0; j < speciality.length; j++) {
                if (speciality[j] === query.name) {
                    chefName = chefList[i].Name;
                    break;
                }
            }
        }
        res.send(`Your requested dish ${query.name} is being prepared by Chef ${chefName}`);
        //saveOrder();
        let order = {};
        order.DishName = query.name;
        order.TypeChef = chefType;
        order.ChefName = chefName;
        order.CustomerName = query.cus;
        await Order.create(order);
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    getDishRequest
};