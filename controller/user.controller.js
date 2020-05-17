const service = require('../service/user.service');
const User = require('../app/models/user.model');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

// Create and Save a new User
exports.register = (req,res) => {

    // Validate Email
    if(!req.body.email) {
        return res.status(400).send({
            message: "Email can not be empty"
        });
    }
    // Encryption of password
    let encryptedPassword=bcrypt.hashSync(req.body.password,saltRounds);

    let user=new User({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        password: encryptedPassword
    })
    // Redirect to service layer
    service.register(user,(result,err)=>{
        if(result){
            res.status(200).json(result)
        }else{
            res.status(500).json(err)
        }
    })
}
// Show All Registered Users
exports.showAll=(req, res)=>
{
    service.showAll(req, res)
}
// Check Login credentials
exports.login = (req, res)=>
{
    service.login(req,res,result=>
        {
        if(result){
            return res.json(result)
        }
    });
};