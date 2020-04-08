'use strict'

const MiddlewareHandler = require("../Middleware/MiddlewareHandler")
const Context = require("../Context/index")
const RouteHandler = require("../Route/RouteHandler")

class Server {
    constructor() {
        this.MiddlewareHandler = MiddlewareHandler.getInstance()
        this.RouteHandler = RouteHandler.getInstance()
    }

    setIgnitor(instance) {
        this.RouteHandler.Ignitor = instance
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new this()
        }

        return this.instance
    }

    /**
    * This is the main incoming requests 
    * @param {Object} req 
    * @param {Object} res 
    */
    handle(req, res) {
        if (req.url == "/favicon.ico") {
            return res.end("")
        }
        const ctx = new Context(req, res)
        const route = this.RouteHandler.getRoute(ctx)        
        this.executeMiddlewares(ctx, route)
        let { handler, method } = route.handler
        try {
            return res.end(JSON.stringify((new handler())[method](ctx)))
        } catch (error) {
            throw new Error(`Method ${method} not found in ${handler}.`)
        }
    }


    // Since all of below methods are basically wrappers for MiddlewareHandler, you could use Proxy pattern (but it is not advised since it makes debugging really hard)

    executeMiddlewares(ctx, route) {
        this.MiddlewareHandler._executeMiddlewares(ctx, route)
    }

    registerGlobal(middlewares) {
        this.MiddlewareHandler._registerGlobal(middlewares)
        return this;
    }

    registerServer(middlewares) {
        this.MiddlewareHandler._registerServer(middlewares)
        return this;
    }

    registerNamed(middlewares) {
        this.MiddlewareHandler._registerNamed(middlewares)
        return this
    }

    compile(){
        this.MiddlewareHandler._compile()

    }
}

module.exports = Server