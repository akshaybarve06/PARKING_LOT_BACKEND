module.exports = (app) => {
    const user = require('../controller/user.controller');

    // Create a new Note
    app.post('/register', user.register);

    // Show All Users Registered
    app.get('/allusers',user.showAll);

    // Find Specific login details
    app.post('/login', user.login);
}