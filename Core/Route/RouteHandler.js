const Route = require("./index")
const MiddlewareHandler = require("../Middleware/MiddlewareHandler")

class RouteHandler {
    constructor() {
        this._routes = new Map()
        this._route = null;
        this.MiddlewareHandler = MiddlewareHandler.getInstance()
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new this()
        }
        // this.Ignitor = Ignitor.getInstance() //For some reason this doesn't work, I guess it is because of chained circular calling Ignitor->Server->RouteHandler->Ignitor???
        return this.instance
    }

    getRoute(ctx) {
        let routeSlug = this.sanitizeUrl(ctx.req.url)
        let routeHandlerMap = this._routes.get(routeSlug)
        if (!routeHandlerMap) {
            throw new Error(`Handler for route '${routeSlug}' not found`)
        }
        let route = routeHandlerMap.get(ctx.req.method)
        if (!route) {
            throw new Error(`Handler for method '${ctx.req.method}' for route '${routeSlug}' not found`)
        }
        return route;
    }

    add(route, handler, method) {

        if (!method) {
            throw new Error("Method not specified.")
        }

        // We want to save "/posts" and "posts" as "posts" so we remove the first "/"" 
        let routeSlug = this.sanitizeUrl(route)


        let exploded = handler.split(".")
        let resolved = this.Ignitor.resolve(exploded[0])
        if (!resolved) {
            throw new Error(`Controller ${handler} not found.`)
        }

        const handlerObj = {
            handler: resolved,
            method: exploded[1]
        }

        route = new Route({ route: routeSlug, handler: handlerObj, method })
        this._route = route

        /**
         * What our _routes actually looks like
         * 
         * "posts" => "GET"  => postsGETHandler
         *         => "POST" => postsPOSTHandler
         * 
         * "users" => "GET" => usersGETHandler
         *         => "DELETE" => usersDELETEHandler
         * 
         */

        // Check if route handler already exists
        let routeHandlerMap = this._routes.get(routeSlug)

        if (routeHandlerMap) {
            //It exists, so set(or overwrite handler for that method)
            routeHandlerMap.set(method, route)
        } else {
            // It doesnt exist, so create new Map for route value
            routeHandlerMap = new Map();
            // Set method as key and handler as value
            routeHandlerMap.set(method, route);
            // Set route as key and routeHandler map as value
            this._routes.set(routeSlug, routeHandlerMap)
        }

        return this
    }

    sanitizeUrl(url) {
        if (url[0] == "/") {
            url = url.substr(1)
        }
        return url;
    }

    middleware(middlewares = []) {
        if (middlewares.length === 0) {
            throw new Error("Middlewares not defined.")
        }
        if (!Array.isArray(middlewares)) {
            middlewares = [middlewares]
        }

        middlewares = middlewares.map(middleware => {
            let resolved = this.MiddlewareHandler.findNamed(middleware)            
            if (!resolved) {
                throw new Error(`Middleware ${middleware} not found.`)
            }
            return resolved;
        })

        this._route._middlewares = this._route._middlewares.concat(middlewares)        
    }


    // These functions below are just helpers functions with prettier names
    get(route, handler) {
        return this.add(route, handler, "GET")
    }

    post(route, handler) {
        return this.add(route, handler, "POST")
    }

    patch(route, handler) {
        return this.add(route, handler, "PATCH")
    }

    put(route, handler) {
        returnthis.add(route, handler, "PUT")
    }

    delete(route, handler) {
        return this.add(route, handler, "DELETE")
    }
}

// We can't return instance here even though it is a singleton beacuse in Ignitor we are requiring Server and in server we are requireing this file
// and it will automatically create an instance but we can't access Ignitor because it is all happening in require() that are in the top of file so Ignitor still isn't instantiated
module.exports = RouteHandler