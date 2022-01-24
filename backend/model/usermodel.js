const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        require:[true , "Please enter your name"]
    },

    email:{
        type:String,
        require:[true, 'Please enter E mail address'],
        unique:true,
        validate:[validator.isEmail, 'Please enter valid Email ID ']
    },
    password:{
        type:String,
        require:[true, 'Please enter your password'],
        minLength:[8, 'password should be greater than 8 characters'],
        select:false, // this is not allow to retrive data in this case you not retrive password data from database

    },
    avatar:{ 
        Public_id:{
            type:String,
            required:true
        },
        Url:{
            type:String,
            required:true
        }
    },
    role: {
        type:String,
        default:'user'
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,

});

userSchema.pre("save", async function(next){
    if (!this.isModified("password")) {
        next()
    }

    this.password = await bcrypt.hash(this.password, 10)
})

// JWT token

userSchema.methods.getJWTToken = function () {
    return jwt.sign({id:this._id}, process.env.JWT_SECRET,{expiresIn: process.env.JWT_EXPIRE})
}

// Compare Password

userSchema.methods.comparePassword = async function (password){
    return await bcrypt.compare(password, this.password)
}

// genrate password resettoken

userSchema.methods  .getResetPasswordToken = function (){
    const resetToken = crypto.randomBytes(20).toString("hex")

    this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

    this.resetPasswordExpire = Date.now() + 24 * 60 * 1000;

    return resetToken;
}


 
module.exports = mongoose.model('User', userSchema)