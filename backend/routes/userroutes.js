const express = require('express');
const route = express.Router();
const { registerUser, 
        loginUser, 
        logout, 
        forgetPassword, 
        resetpassword, 
        getUserdetails, 
        updatePassword, 
        updateProfile, 
        getAllUsers, 
        singleUser, 
        updateUserRole,
        deletUser} = require("../controllers/usercontroller.js");
const { isAuthenticatedUser, authorizesRole } = require('../middelware/auth.js');
route.post('/register', registerUser)
route.post('/login', loginUser)
route.get('/logout', logout)
route.post('/password/forget', forgetPassword)
route.put('/password/reset/:token', resetpassword)
route.get('/me',isAuthenticatedUser, getUserdetails)
route.put('/password/update', isAuthenticatedUser, updatePassword)
route.put('/me/update', isAuthenticatedUser, updateProfile)
route.get('/admin/users', isAuthenticatedUser, authorizesRole('admin'), getAllUsers)
route.get('/admin/user/:id',isAuthenticatedUser, authorizesRole('admin'), singleUser)
route.put('/admin/user/:id',isAuthenticatedUser, authorizesRole('admin'), updateUserRole)
route.delete('/admin/user/:id',isAuthenticatedUser, authorizesRole('admin'),deletUser)


module.exports = route