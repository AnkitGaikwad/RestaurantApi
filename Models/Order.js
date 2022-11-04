const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    DishName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50
    },
    TypeChef: {
        type: String,
        required: true,
        minLength: 3,
    },
    ChefName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 30
    },
    CustomerName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 30
    },
    status: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Order', orderSchema);