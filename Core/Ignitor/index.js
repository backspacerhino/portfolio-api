const http = require('http');
const Server = require("../Server/index")
const fs = require('fs');

class Ignitor {
    constructor() {

        if (!Ignitor.instance) {
            Ignitor.instance = this
            this._route;
            this._rootDir = "../../app/"
            this._dirs = [
                "Controllers"
            ]
            this._preloaded = new Map()
        }
        // Initialize object
        return Ignitor.instance
    }

    get preloaded() {
        return this._preloaded
    }

    resolve(controllerName) {
        return this._preloaded.get(controllerName)
    }

    fire() {
        // Server.setIgnitor(Ignitor.instance)
        this.Server = Server
        this.preload()
    }

    preload() {
        this._dirs.filter(dir => {
            fs.readdirSync("app/" + dir).map(file => {
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
            return this.Server.handle(req, res)
        }).listen(process.env.PORT);
    }
}

const instance = new Ignitor()

console.log("IGNITOR CLASS", Ignitor);
console.log("IGNITOR INS", instance);

module.exports = instance