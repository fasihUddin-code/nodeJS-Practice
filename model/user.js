const mongoose = require('mongoose')
const {Schema,model} = mongoose

const addressSchema = new Schema({
    pincode:{
        type:Number,
        required: true
    },
    street:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
        min:[10,'wrong min length']
    }
},{_id:false})

const UserSchema = new Schema({
    firstName:{
        type:String,
        max:[16,"exceed max characters"],
        required:[true,'FirstName is required']
    },
    lastName:{
        type:String,
        max:[16,"exceed max characters"]
    },
    age:{
        type:Number,
        min:[12,"wrong min age"],
        max:[100,"wrong max age"]
    },
    email:{
        type:String,
        required:[true,'Email is required'],
        unique:true,
        validate:{
            validator: (email)=>{
                const emailRegex = /^\S+@\S+\.\S+$/;
                return emailRegex.test(email);
            },
            message: 'Please enter a valid email address'   
        }
    },
    address: addressSchema

})

exports.User = model('User',UserSchema)

