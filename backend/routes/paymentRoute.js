const express = require('express')
const { processpayment, sendApiKey } = require('../controllers/paymentController')
const route = express.Router()
const { isAuthenticatedUser } = require('../middelware/auth')

route.post('/payment/process', isAuthenticatedUser, processpayment)
route.get('/stripeapikey', isAuthenticatedUser, sendApiKey)

module.exports = route

