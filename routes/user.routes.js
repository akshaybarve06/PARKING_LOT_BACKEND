module.exports = (app) => {
    const user = require('../controller/user.controller');

    // Create a new Note
    app.post('/register', user.register);

}