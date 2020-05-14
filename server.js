const express = require('express');
const bodyParser = require('body-parser');
const port= 3000

// create express app
const app = express();

// parse requests of content-type 
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to Parking Lot API."});
});

// Require User routes
require('./routes/user.routes')(app);

// listen for requests
app.listen(port, () => {
    console.log("Server is listening on port "+port);
});