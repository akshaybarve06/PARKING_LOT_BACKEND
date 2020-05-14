const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name:{
        type: String
    },
    phone:{
        type:String
    },
    email:{
        type:String
    },
    password : {
        type: String
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

module.exports=User;