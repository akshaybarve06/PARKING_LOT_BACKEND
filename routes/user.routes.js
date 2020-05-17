module.exports = (app) => {

    const user = require('../controller/user.controller');

    // Register a new User
    app.post('/register', function(req, res){
        user.register(req,res);
    });

    // Show All Users Registered
    app.get('/allusers',function(req, res){
        user.showAll(req,res);
    });

    // Find Specific login details
    app.post('/login', function(req, res){
        user.login(req,res);
    });
}