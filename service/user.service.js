const User=require('../app/models/user.model')

class Service
{
    // Input Register method
    register= (user, req,res, callback) => {

        // Validate request
        if(!user.email) {
            return res.status(400).send({
                message: "email can not be empty"
            });
        }
        User.register(user, req, res, result=>{
            callback(result);
        });

    };
    // Service Method To Show All Users
    showAll=(req, res )=>{
        User.showAll(req, res)
    }
    // Login Method 
    login = (req, res, callback)=>{
        User.login(req.body.email, req.body.password, result=>{
            callback(result)
        });
    };
}
module.exports=new Service();