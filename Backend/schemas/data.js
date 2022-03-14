const Joi = require('joi');

const mongoose = require('mongoose');

const schema = mongoose.Schema;

const registerschema = new schema({
    name: {
        type: String,
        required: true
        
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 300
    }



})

const unischema = new schema({
    College_Name: String,
    Genders_Accepted: String,
    Campus_Size: Number,
    Total_Students: Number,
    Total_Faculty: Number,
    Established_Year: Number,
    Rating: Number,
    University: String,
    Courses: [{
        type: String
    }],
    Facilities: [{
        type: String
    }],
    City: String,
    State: String,
    Country: String,
    College_Type: String,
    Average_Fees: Number

    


})

const user = mongoose.model('user', registerschema);

function validateUser(User) {
    const Schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    };
    return Schema.validate(User);
}
const uni = mongoose.model('uni', unischema);


exports.user = user;
exports.validate = validateUser;
exports.uni = uni;

