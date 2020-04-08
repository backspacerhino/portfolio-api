"use strict"

const Runner = require("./Runner")

class MiddlewareHandler {

    constructor() {
        this._handler = {
            global: [],// User defined middlewares (will be applied to all valid requests)
            server: [], // Frameworks' internal middlewares (will be applied to all requests)
            named: {}, // User defined middlewares (can be used per request)
        }
        this.runner = new Runner();
        this._middlewares = []
        return this;
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new this()
        }

        return this.instance
    }

    findNamed(middleware) {
        return this._handler.named[middleware]
    }

    /**
     * Compiles server and global middlewares
     */
    _compile() {
        this._middlewares = this._handler.server.concat(this._handler.global)
    }


    _executeMiddlewares(ctx, route) {
        this.runner._middlewares = this._middlewares.concat(route._middlewares)        
        this.runner.run(ctx)
        // (back to)THIS LINE
    }


    _registerMiddleware(type, middlewares) {
        if (!Array.isArray(middlewares)) {
            throw new Error("Not an array.")
        }

        middlewares.filter(item => {
            // item should be a string so we should check for that
            if (typeof (item) !== 'string') {
                throw new Error("Not a string.")
            }
        })
        this._handler[type] = middlewares;
    }

    _registerGlobal(middlewares) {
        this._registerMiddleware("global", middlewares)
    }

    _registerServer(middlewares) {
        this._registerMiddleware("server", middlewares)
    }

    _registerNamed(middlewares) {
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