const { Customer, validateCustomer } = require('../models/customer.model')
const express = require('express')
const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
        let customers = await Customer.find().sort({ name: 1 })
        res.send(customers)
    }
    catch (ex) {
        res.send({ error: ex.message })
    }
    finally {
        next()
    }
})

router.get('/:id', async (req, res, next) => {
    const { error } = validateCustomer(req.body)

    if (error) {
        res.send({ error: error.message })
        next()
    }
    else {
        try {
            let customer = await Customer.findById(req.params.id)
            res.send(customer)
        }
        catch (ex) {
            res.send({ error: ex.message })
        }
        finally {
            next()
        }
    }
})

router.post('/', async (req, res, next) => {
    let { error } = validateCustomer(req.body)

    if (error) {
        res.status(400).send({ error: error.details[0].message })
    }
    //else if (genreExists(req.body))
    //  res.status(400).send({ error: `Genre with that name already exists` })
    else {
        try {
            const newCustomer = new Customer(req.body)
            const savedCustomer = await newCustomer.save()
            res.send(savedCustomer)
        }
        catch (ex) {
            res.status(400).send({ error: ex.message })
        }
    }
});

router.put('/:id', async (req, res, next) => {
    let { error } = validateCustomer(req.body)

    if (error) {
        res.status(400).send({ error: error.details[0].message })
        next()
    }
    try {
        const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, {
            $set: {
                name: req.body.name.toLowerCase(),
                isGold: req.body.isGold,
                phone: req.body.phone,
                email: req.body.email
            }
        }, { new: true })
        res.send(updatedCustomer)
    }
    catch (ex) {
        res.status(400).send({ error: `That genre does not exist` })
    }
    finally {
        next()
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const deletedCourse = await Course.findByIdAndRemove(req.params.id)
        res.send(deletedCourse)
    }
    catch (ex) {
        res.status(400).send({ error: `That genre does not exist` })
    }
    finally {
        next()
    }
});

module.exports = router

