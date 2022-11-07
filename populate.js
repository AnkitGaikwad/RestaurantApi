require('dotenv').config();
const connectDB = require('./db/connect');
const chefsData = require('./data');
const Chef = require('./Models/Chef');
const Dish = require('./Models/Dish');

function createDishesTableData(chefsData) {
    let dishes = [];
    for (let i = 0; i < chefsData.length; i++) {
        for (let j = 0; j < chefsData[i].Speciality.length; j++) {
            let tempDish = {};
            tempDish.Name = chefsData[i].Speciality[j];
            tempDish.TypeChef = chefsData[i].TypeChef;
            dishes.push(tempDish);
        }
    }
    return dishes;
}
const dishesData = createDishesTableData(chefsData);

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        console.log("Successfully connected to DB");
        await Chef.deleteMany();
        await Chef.create(chefsData);
        console.log("Successfully inserted all chefs");
        await Dish.deleteMany();
        await Dish.create(dishesData);
        console.log("Successfully inserted all dishes");
        process.exit(0);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

start();