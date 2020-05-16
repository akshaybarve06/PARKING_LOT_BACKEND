const service = require('../service/user.service');
const User = require('../app/models/user.model');
const bcrypt = require('bcrypt-nodejs');
const saltRounds = 10;

// Create and Save a new User
exports.register = (req, res) => {

    // Encrypting Password
    encryptedPassword = bcrypt.hash(req.body.password,saltRounds)
    // Create a New User
    const user = new User({
        name:req.body.name || "Unnamed User",
        phone:req.body.phone, email:req.body.email, password:encryptedPassword
    });

    // Method To Save / Register User
    service.register(user,req, res, result=>{
        if(result){
            return res.json({ message: result})
        }
    })
};
// Show All Registered Users
exports.showAll=(req, res)=>{
    service.showAll(req, res)
}
// Check Login credentials
exports.login = (req, res)=>{
    service.login(req,res,result=>{
        if(result){
            return res.json(result)
        }
    });
};