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

module.exports=User;