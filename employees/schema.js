const Mongoose = require("mongoose");

const EmployeeSchema = new Mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    number: {
        type: String,
        unique: true
    }
});

module.exports = EmployeeSchema;