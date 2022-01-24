const jwt = require('jsonwebtoken');
const asyncfun = require('./catchasyncerror.js');
const User = require('../model/usermodel.js')
const ErrorHandler = require('../utils/errorhandel.js');

exports.isAuthenticatedUser = asyncfun(async (req, res, next)=>{
    const { token } = req.cookies;

    if (!token) {
        return next(new ErrorHandler('Please login to access this resource', 401))
    }

    const decodeData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodeData.id);
    next()

})

exports.authorizesRole = (...roles)=>{
     return (req, res, next)=>{
       
         if (!roles.includes(req.user.role)) {
             return next(
                 new ErrorHandler(`Role: ${req.user.role} is allowed to acces this resource`)
             )
         }
         next();
     }

}