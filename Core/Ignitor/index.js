const http = require('http');
const Route = require("../Route/index")
const fs = require('fs');


// This just makes sure that once this ignitor is loaded inside server.js it will also load routes and hence save our routes
// In real application this would be loaded dynamically but for now we're using this
require("../../routes")
class Ignitor {

    static _instance;
    _route;

    _rootDir = "../../app/"

    _dirs = [
        "Controllers"
    ]

    _preloaded = new Map()

    constructor() {

    }

    get preloaded(){
        return this._preloaded
    }

    static getInstance() {
        if (this._instance) {
            return this._instance;
        }
        this._instance = new Ignitor();
        return this._instance;
    }


    fire() {
        this._route = Route.getInstance()
        this.preload()
        this._route.preloaded = this._preloaded
    }

    preload() {
        this._dirs.filter(dir => {
            fs.readdirSync("app/"+dir).map(file => {
                const controllerName = file.split(".")[0]
                const module = require(`${this._rootDir}${dir}/${file}`)                
                this._preloaded.set(controllerName, module);
            });
        })
    }

    startHttpServer() {

        console.log("Starting HTTP server...");
        http.createServer((req, res) => {
            res.setHeader('Content-Type', 'application/json');
            // Our route handler is now in separate file
            return this._route.handle({ req, res })
        }).listen(process.env.PORT);
    }
}

module.exports = Ignitor