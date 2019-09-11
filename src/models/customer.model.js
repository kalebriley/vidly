const Joi = require('joi')
const Mongoose = require('mongoose')
const Joigoose = require('joigoose')(Mongoose)

const joiCustomerSchema = Joi.object({
    name: Joi.string().min(3).required(),
    isGold: Joi.boolean().default(false),
    phone: Joi.string().min(7).regex(/[0-9]/),
    email: Joi.string().email().required(),
})
const mongooseCustomerSchema = new Mongoose.Schema(Joigoose.convert(joiCustomerSchema))
const Customer = Mongoose.model('Customer', mongooseCustomerSchema)

function validateCustomer(customer) {
    return Joi.validate(customer, joiCustomerSchema);
}

module.exports.Customer = Customer
module.exports.validateCustomer = validateCustomer