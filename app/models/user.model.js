const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name:{
        type: String
    },
    phone:{
        type:String,
        validate: function(phone) {
            return /^[0-9]*$/.test(phone)
        },
        unique: true     
    },
    email:{
        type:String,
        validate: function(email) {
            return /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
        },
        required: true,
        unique: true
    },
    password : {
        type: String,
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
                if (password==user.password){
                    callback('Login Successful')
                }
                else {
                    callback('Login Info Incorrect')
                }
            }
    })
}
module.exports=User;