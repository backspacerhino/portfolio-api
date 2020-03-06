const http = require('http');
const RouteUtil = require("./Core/Utils/RouteUtil")
// This is a special package that allows reading from .env file 
// https://www.twilio.com/blog/2017/08/working-with-environment-variables-in-node-js.html
require('dotenv').config();

http.createServer(function (req, res) {
    
    
    let routeUtil = new RouteUtil();

    let urlObj = new URL(req.url, `http://${req.headers.host}`)
    urlObj.method = req.method
    let url = routeUtil.parseUrl(urlObj.pathname) // Using Core util (This type of thing will usually be in core of framework you're using)

    let controllerName = ""
    let methodName = ""
    // Really bad way of doing this and is not advised
    // However, we will use it (for now) to fake what autoloader and route hander are doing
    switch (url) {
        case "test":
            controllerName = "Home";
            methodName = "test";
            break;
        case "posts":
            controllerName = "Home";
            methodName = "test";
            break;
        default:
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify({success:false, message:"Not found."}))
            break;
    }

    methodName = urlObj.method.toLowerCase() + methodName;
    controllerName += "Controller";
    return routeUtil.handleRoute({ req, res, controllerName, methodName })
}).listen(process.env.PORT);