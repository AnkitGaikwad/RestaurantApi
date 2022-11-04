const mongoose = require('mongoose');

const chefSchema = mongoose.Schema({
    TypeChef: {
        type: String,
        required: true,
        minLength: 3,
    },
    Name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 30
    },
    Speciality: {
        type : Array , 
        default : [],
    },
    Available: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Chef', chefSchema);