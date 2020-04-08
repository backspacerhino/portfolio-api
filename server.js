
const Ignitor = require("./Core/Ignitor/index")
// This is a special package that allows reading from .env file 
// https://www.twilio.com/blog/2017/08/working-with-environment-variables-in-node-js.html
require('dotenv').config();

Ignitor.fire()


// This just makes sure that once this ignitor is loaded inside server.js it will also load routes and hence save our routes
// In real application this would be loaded dynamically but for now we're using this
require("./routes")

Ignitor.startHttpServer();
