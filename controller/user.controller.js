const User = require('../app/models/user.model');

// Create and Save a new User
exports.register = (req, res) => {
    // Validate request
    if(!req.body.email) {
        return res.status(400).send({
            message: "email can not be empty"
        });
    }
   // Create a New User
    const user = new User({
        name:req.body.name || "Unnamed User",
        phone:req.body.phone, email:req.body.email, password:req.body.password
    });
    // Method To Save / Register User
    User.register(user, req, res, result=>{
        if(result){
            return res.json({ message: result})
        }
    })
};

// Show All Registered Users
exports.showAll=(req, res)=>{
    User.showAll(req, res)
}