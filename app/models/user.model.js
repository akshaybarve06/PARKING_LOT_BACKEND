const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt= require('jsonwebtoken')
const Joi=require('joi')

const UserSchema = mongoose.Schema({
    // User Schema To Add Details of User and Validate Details
    name:{
        type: String 
    },
    phone:{
        type:String
    },
    email:{
        type:String,
        required: true
    },
    password : {
        type: String,
        required : true
    }
}, {
    timestamps: true
});
var User=mongoose.model('User', UserSchema);

// Method To Validate User Details
User.validate=function(user)
{
    const validations = {
        name: Joi.string().alphanum().min(1).max(50),
        phone: Joi.string().min(10).max(10),
        email: Joi.string().min(2).max(40).email().regex(/^[a-zA-Z0-9_.+-]+@[a-zA-Z]+\.[a-zA-Z]+$/),
        password: Joi.string().min(8).max(100).regex(/^[a-zA-Z0-9]{3,30}$/)
    }
    return Joi.validate(user, validations);
}

// Register New User
User.register=function(user,callback)
{
    user.save()
    .then(data => {
        callback(data)
    }).catch(err =>{
        callback(err)
    })
}

// Method To Show All users registered 
User.showAll=(req,res) => {
    User.find()
        .then(users =>{
            res.send(users)
        }).catch(err =>{
            res.status(500).send({
            message: err.message || "Sorry..Couldn't Finding All Users.."
        })
    })
}
// Login method to Check cresetials of input user
User.login=function(email,password,callback){
    User.findOne({email: email},(err, user)=>{
        if(err){
            console.log(err)
            callback('Server Error');
        }else if(user==undefined){
                callback('Sorry..User Not Found');
            }
            else {
                bcrypt.compare(password,user.password,(err,result)=>{
                if(result){
                    var token = jwt.sign({password: user.password}, 'app-super-secret', {expiresIn: '2h'});
                    callback({meaasge:'Login Successfull',token:token})
                }
                else {
                    callback('Login Info Incorrect')
                }
            })
        }
    });
}
module.exports=User;