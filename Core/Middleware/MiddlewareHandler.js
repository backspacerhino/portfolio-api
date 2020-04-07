"use strict"

const Runner = require("./Runner")

class MiddlewareHandler {

    constructor() {
        this._handler = {
            global: [],// User defined middlewares (will be applied to all valid requests)
            server: [], // Frameworks' internal middlewares (will be applied to all requests)
            named: {}, // User defined middlewares (can be used per request)
            handle: null
        }
        this.runner = new Runner();
        this._middlewares = []
    }

    /**
     * Compiles server and global middlewares
     */
    compile(){
       this._middlewares = this._handler.server.concat(this._handler.global)
    }

    runtimeCompile(middlewares){
        middlewares = middlewares.filter(middleware => {
            try {
                return this._handler.named[middleware]
            } catch (error) {
                throw new Error(`Named middleware '${middleware}' not found.`)
            }
        })
        this._middlewares = this._middlewares.concat(middlewares)
    }

    _executeMiddlewares(ctx, route){
        this._runtimeCompile(route._middlewares)
        console.log("ALL MIDDLEWARES TO EXEC", this.middleware);
        
        this.runner.middlewares = this._middlewares;
        this.runner.run(ctx)
    }


    _registerMiddleware(type, middlewares) {
        if (!Array.isArray(middlewares)) {
            throw new Error("Not an array.")
        }

        middlewares.filter(item => {
            // item should be a string so we should check for that
            if (typeof (middleware) !== 'string') {
                throw new Error("Not a string.")
            }
        })
        this._handler[type] = middlewares;
    }

    // These
    registerGlobal(middlewares) {
        this._registerMiddleware("global", middlewares)
    }

    registerServer(middlewares) {
        this._registerMiddleware("server", middlewares)
    }

    registerNamed(middlewares) {
        // middlewares should be object that has
        // (middleware name)key : (middleware absolute path)value
        // Below way is NOT a complete solution since null and functions are also type of object
        if (typeof middlewares !== 'object') {
            throw new Error("Not an object")
        }

        for (let [key, value] of Object.entries(middlewares)) {
            if (typeof (value) !== 'string') {
                throw new Error("Not a string.")
            }
            this._handler.named[key] = value;
        }
    }
}

module.exports = MiddlewareHandler