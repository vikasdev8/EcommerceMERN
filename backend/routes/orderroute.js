const express = require('express')
const route = express.Router()
const { newOrder, getAllOrder, getAllOrders, updateOrderStatus, deleteOrder, GetsingleOrder } = require('../controllers/ordercontroller')
const {isAuthenticatedUser, authorizesRole} = require('../middelware/auth.js')



route.post('/order/new',isAuthenticatedUser, newOrder)
route.get('/order/me',isAuthenticatedUser, getAllOrder)
route.get('/admin/order',isAuthenticatedUser,authorizesRole("admin"), getAllOrders)
route.put('/admin/order/status/:id',isAuthenticatedUser,authorizesRole("admin"), updateOrderStatus)
route.delete('/order/:id',isAuthenticatedUser, deleteOrder)
route.get('/order/me/:id', isAuthenticatedUser, GetsingleOrder)

module.exports = route