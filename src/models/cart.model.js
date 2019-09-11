const Joi = require('joi')
const Mongoose = require('mongoose')
const Joigoose = require('joigoose')(Mongoose)

const joiCartSchema = Joi.object({
    customer: Joi.string().meta({ type: 'ObjectId', ref: 'Customer' }).required(),
    items: Joi.array().items(Joi.string().meta({ type: 'ObjectId', ref: 'Rental' })).required()
})