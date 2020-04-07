'use strict'

const MiddlewareHandler = require("../Middleware/MiddlewareHandler")
const Context = require("../Context/index")
const RouteHandler = require("../Route/RouteHandler")
class Server {
    constructor(){
        if (!Server.instance) {
            Server.instance = this
            this.MiddlewareHandler = new MiddlewareHandler()            
            this.RouteHandler = RouteHandler
        }
        // Initialize object
        return Server.instance
    }

     /**
     * This is the main incoming requests 
     * @param {Object} req 
     * @param {Object} res 
     */
    handle(req,res){        
        const ctx = new Context(req,res)
        const route = this.RouteHandler._getRoute(ctx)
        this.executeMiddlewares(ctx, route)
    }

    executeMiddlewares(ctx){
        this.MiddlewareHandler._executeMiddlewares(ctx)
    }

    registerGlobal(middlewares){
        this.MiddlewareHandler.registerGlobal(middlewares)
        return this;
    }

    registerNamed (middlewares) {
        this.MiddlewareHandler.registerNamed(middlewares)
        return this
      }
}

const instance = new Server()

module.exports = instance