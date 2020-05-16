const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const jwt= require('jsonwebtoken')

const UserSchema = mongoose.Schema({
    name:{
        type: String,
        is: ["^[a-z]+$",'i'],
        allowNull: false,
        required: true
    },
    phone:{
        type:String,
        validate: function(phone) {
            return /^[0-9]*$/.test(phone)
        },
        isUnique : true
    },
    email:{
        type:String,
        validate: function(email) {
            return /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
        },
        required: true,
        isUnique: true
    },
    password : {
        type: String,
        allowNull: false,
        len: [2, 10],
        required : true
    }
}, {
    timestamps: true
});
var User=mongoose.model('User', UserSchema);

// Register New User
User.register=function(user, req, res, callback)
{
    user.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Sorry..Couldn't register user."
        });
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