const express = require('express')
const route = express.Router()
const {getAllProdut, createProduct, updateproduct, deleteproduct,getproductdetails, productReview, getReviews, deleteReviews, getAdminProducts} = require('../controllers/productcontroller.js')
const { isAuthenticatedUser, authorizesRole } = require('../middelware/auth.js')

route.get('/products' ,  getAllProdut)
// route.route('/products').get(isAuthenticatedUser, getAllProdut)
route.post('/admin/products/new',isAuthenticatedUser, authorizesRole('admin'), createProduct);
route.put('/admin/products/:id',isAuthenticatedUser, authorizesRole('admin'), updateproduct);
route.delete('/admin/products/:id',isAuthenticatedUser, authorizesRole('admin'), deleteproduct);
route.get('/products/:id',getproductdetails);
route.put('/review',isAuthenticatedUser, productReview);
route.get("/reviews", getReviews);
route.delete("/reviews",isAuthenticatedUser, deleteReviews);
route.get('/admin/products', isAuthenticatedUser,authorizesRole("admin"),getAdminProducts)

module.exports = route