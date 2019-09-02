const express = require('express')
const router = express.Router()

// @route  GET /
// @desc   Get home page
// @access Public
router.get('/', (req, res, next) => {
    res.render('index')
})

module.exports = router