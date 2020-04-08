const http = require('http');
const Server = require("../Server/index")
const fs = require('fs');
// This is a special package that allows reading from .env file 
// https://www.twilio.com/blog/2017/08/working-with-environment-variables-in-node-js.html
require('dotenv').config();

class Ignitor {
    constructor() {
        this._rootDir = "../../app"
        this._dirs = [
            "Controllers"
        ]
        this._preloaded = new Map()
    }

    static getInstance(){
        if(!this.instance){
            this.instance = new this()
        }
        
        return this.instance
    }

    get preloaded() {
        return this._preloaded
    }

    resolve(controllerName) {
        return this._preloaded.get(controllerName)
    }

    fire() {       
        this.Server = Server.getInstance()  
        this.Server.setIgnitor(Ignitor.getInstance())              
        this.preload()
        this.startKernel()
        this.loadRoutes()        
    }

    preload() {
        this._dirs.filter(dir => {
            fs.readdirSync("app/" + dir).map(file => {
                const controllerName = file.split(".")[0]
                const module = require(`${this._rootDir}/${dir}/${file}`)
                this._preloaded.set(controllerName, module);
            });
        })        
    }

    startKernel(){
        require(`${this._rootDir}/../kernel`)

    }

    loadRoutes(){
        require(`${this._rootDir}/../routes`)
    }

    startHttpServer() {        
        console.log("Starting HTTP server...");
        http.createServer((req, res) => {
            res.setHeader('Content-Type', 'application/json');
            return this.Server.handle(req, res)
        }).listen(process.env.PORT);
    }
}

module.exports = Ignitor