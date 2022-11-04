const mongoose = require('mongoose');

const dishSchema = mongoose.Schema({
    Name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50
    },
    TypeChef: {
        type: String,
        required: true,
        minLength: 3,
    }
});

module.exports = mongoose.model('Dish', dishSchema);