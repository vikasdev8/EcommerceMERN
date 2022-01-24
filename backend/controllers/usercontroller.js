const ErrorHandler = require('../utils/errorhandel.js');
const asyncfun = require('../middelware/catchasyncerror.js')
const User = require('../model/usermodel.js');
const  sendToken = require('../utils/jwttoken.js')
const sendEmail = require('../utils/sendemail.js')
const crypto = require("crypto");
var cloudinary = require('cloudinary'); 

// Register User

exports.registerUser = asyncfun(async(req, res, next)=>{

  const myCloud =  await cloudinary.v2.uploader.upload(req.body.avatar,{
        folder: "avatars",
        width:150,
        crop: "scale"
    })

    const {name, email, password} = req.body
    const user = await User.create({
        name, 
        email, 
        password,
        avatar:{
            Public_id:myCloud.public_id,
            Url:myCloud.secure_url 
        }
    });

    sendToken(user, 201, res)


});


// Login User

exports.loginUser = asyncfun(async(req, res, next)=>{
    const {email, password} = req.body;

    //checking if user give password and email both 

    if (!email || !password) {
        return next(new ErrorHandler('Please Enter your E mail And Password', 400))
    }

    const user =  await User.findOne({email}).select("+password");
    
    if (!user) {
        return next(new ErrorHandler('You enter invalid email or password', 401))
    }

    const ispasswordMatch = await user.comparePassword(password);

    if (!ispasswordMatch) {
        return next( new ErrorHandler('Your passowrd or email is incorrect', 401))
    }
    sendToken(user, 200, res)

})

//LogOut 

exports.logout = asyncfun(async(req, res, next)=>{

    res.cookie('token', null,{
        expire:new Date(Date.now()),
        httponly:true
    });

    res.status(200).json({
        success:true,
        message:"Log Out sucessfully"
    })

})


// Forget password

exports.forgetPassword = asyncfun(async (req, res, next)=>{
    const user = await User.findOne({email:req.body.email});

    if(!user){
            return next( new ErrorHandler('Enter Wrong Email Id ', 404));

    }
    // Get resetpassword token 
    const resetToken = user.getResetPasswordToken();

    await user.save({validateBeforeSave: false}) 
    
    // const resetPasswordUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`
    const resetPasswordUrl = `${req.protocol}://${req.get(
        "host"
      )}/password/reset/${resetToken}`

    const message = `Your password reset token is: \n\n  ${resetPasswordUrl} \n\n if you no request to reset password pls igonore this`

    try {
        await sendEmail({
            email:user.email,
            subject:` Ecommerce Password Recovery`,
            message,
        })

        res.status(200).json({
            success:true,
            message: `message sent successfully to ${user.email}`
        })
        
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire =  undefined;
        
        await user.save({validateBeforeSave: false})

        return next(new ErrorHandler(error.message, 500))
    }
})


// Reset Password

exports.resetpassword = asyncfun(async (req, res, next)=>{
    
    const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex")
  
    const user =await User.findOne(
        {
            resetPasswordToken: resetPasswordToken,
            resetPasswordExpire: {$gt: Date.now()}
        })

        console.log(user)
        if (!user) {
            return next( new ErrorHandler('Reset password token is invalid or has been expired', 400))
        }

        if (req.body.password !== req.body.confirmPassword) {
            return next(new ErrorHandler("Password is not matched", 400))
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire =undefined;

        await user.save()

        res.status(200).json({
            success:true
        })
})

// Get user details

exports.getUserdetails = asyncfun(async (req, res, next)=>{
    const user = await User.findById(req.user.id)

    res.status(200).json({
        success:true,
        user
    })
})

//update password

exports.updatePassword = asyncfun(async (req, res, next)=>{
    const user = await User.findById(req.user.id).select("+password")

    const isPasswordMatch = await user.comparePassword(req.body.oldPassword)

    if (!isPasswordMatch) {
        return next(new ErrorHandler('Old password is incorrect entered', 400))

    }

    if(req.body.newPassword !==  req.body.confirmPassword){
        return next(new ErrorHandler('Enter New Password And Confirm Password is not matched', 400))
    }

    user.password = req.body.newPassword

    await user.save()
    
    res.status(200).json({
        success:true
    })
 


})

// Update profile 

exports.updateProfile = asyncfun(async (req, res, next)=>{
    let newUser={
        name: req.body.name,
        email: req.body.email,
    }
    if (req.body.avatar !== "") {
        const users = await User.findById(req.user.id)
        
        const imageId = users.avatar.Public_id
       

        await cloudinary.v2.uploader.destroy(imageId)

        const myCloud =  await cloudinary.v2.uploader.upload(req.body.avatar,{
            folder: "avatars",
            width:150,
            crop: "scale"
        })

        newUser={
            name: req.body.name,
            email: req.body.email,
            avatar:{
              
                Public_id:myCloud.public_id,
                Url:myCloud.secure_url 
            }
        }

    }


    const user = await User.findByIdAndUpdate(req.user.id, newUser, {new:true, runValidators:true, useFindAndModify: true})
    
   res.status(200).json({
       success:true
   })


})

//Get all user details (admin)

exports.getAllUsers = asyncfun(async (req, res, next)=>{
    const users =await User.find()

    res.status(200).json({
        success:true,
        users
    })

})

//Get single user details (admin)

exports.singleUser = asyncfun(async (req, res, next)=>{
    const user =await User.findById(req.params.id)

    if (!user) {
        return next( new ErrorHandler(`user does not exits with id: ${req.params.id}`, 400))
    }

    res.status(200).json({
        success:true,
        user
    })

})


// Admin have  to change a role of user (Admin)

exports.updateUserRole = asyncfun(async (req, res, next)=>{
    
    const newUser={
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }

    const user = await User.findByIdAndUpdate(req.params.id, newUser, {new:true, runValidators:true, useFindAndModify: false})
    if (!user) {
        return next( new ErrorHandler(`user id:${req.params.id}  is not exist` , 400))
    }
    
    res.status(200).json({
        success:true,
        user
    })


})

// delete user (admin)

exports.deletUser = asyncfun(async (req, res, next)=>{
    
    const user = await User.findById(req.params.id)

    if (user.email === 'vikasverma84527@gmail.com') {
        return next( new ErrorHandler(`Super Admin is not Delete by Anyone` , 400))
    }

    if (!user) {
        return next( new ErrorHandler(`user id:${req.params.id}  is not exist` , 400))
    }

   await user.remove()
    
    res.status(200).json({
        success:true,
        message:"User delete Successfully"
    })
})



