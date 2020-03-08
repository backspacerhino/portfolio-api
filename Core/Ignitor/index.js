const http = require('http');
const Route = require("../Route/index")

// This just makes sure that once this ignitor is loaded inside server.js it will also load routes and hence save our routes
// In real application this would be loaded dynamically but for now we're using this
require("../../routes")
class Ignitor {

    static _instance;
    _route;
    constructor() {

    }

    static getInstance() {
        if (this._instance) {
            return this._instance;
        }
        this._instance = new Ignitor();
        return this._instance;
    }

    setup() {
        this._route = Route.getInstance()
    }

    startHttpServer() {
        this.setup();
        console.log("Starting HTTP server...");
        http.createServer((req, res) => {
            res.setHeader('Content-Type', 'application/json');
            // Our route handler is now in separate file
            return this._route.handle({ req, res })
        }).listen(process.env.PORT);
    }
}

module.exports = Ignitor