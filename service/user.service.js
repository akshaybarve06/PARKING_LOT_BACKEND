const User=require('../app/models/user.model')

exports.register=(data,callback)=>{
    User.register(data,result=>{
        if(data){
            callback(result)
        }
    })
}

// Service Method To Show All Users
exports.showAll=(req, res )=>{
    User.showAll(req, res)
}

    // Login Method 
exports.login = (req, res, callback)=>{
    User.login(req.body.email, req.body.password, result=>{
        callback(result)
    });
};

