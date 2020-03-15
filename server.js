
const Ignitor = require("./Core/Ignitor/index")
// This is a special package that allows reading from .env file 
// https://www.twilio.com/blog/2017/08/working-with-environment-variables-in-node-js.html
require('dotenv').config();


// These two lines
const ignitor = Ignitor.getInstance();
ignitor.fire()
ignitor.startHttpServer();

// would be the same as
// (Ignitor.getInstance()).startHttpServer();

// () are needed around Ignitor.getInstance() because otherwise JS interpreter would think we are calling .startHttpServer() on .getInstance() and not on whatever 
