const http = require('http');

class Route {

    static _instance;

    _ignitor;
    _preloaded = new Map()

    // This will hold our routes as keys and map of route handlers as values
    // Route handler will have key as method and handler as value
    // Because we can have more route handlers for one route based on method
    _routeHandlers = new Map();

    constructor() {

    }

    set preloaded(preloaded){
        this._preloaded = preloaded
    }

    static getInstance() {
        if (this._instance) {
            return this._instance;
        }
        this._instance = new Route();
        return this._instance;
    }

    add(route, handler, method) {

        if (!method) {
            throw new Error("Method must be specified.")
        }

        // We want to save "/posts" and "posts" as "posts" so we remove the first "/"" 
        route = this.sanitizeUrl(route)

        /**
         * What our _routeHandlers actually looks like
         * 
         * "posts" => "GET"  => postsGETHandler
         *         => "POST" => postsPOSTHandler
         * 
         * "users" => "GET" => usersGETHandler
         *         => "DELETE" => usersDELETEHandler
         * 
         */

        // Check if route handler already exists
        let routeHandlerMap = this._routeHandlers.get(route)

        if (routeHandlerMap) {
            //It exists, so set(or overwrite handler for that method)
            routeHandlerMap.set(method, handler)
        } else {
            // It doesnt exist, so create new Map for route value
            routeHandlerMap = new Map();
            // Set method as key and handler as value
            routeHandlerMap.set(method, handler);
            // Set route as key and routeHandler map as value
            this._routeHandlers.set(route, routeHandlerMap)
        }

    }

    // Main handler for incoming routes
    handle({ req, res }) {
        const route = this.sanitizeUrl(req.url)
        const method = req.method;

        // Try to find route match in routeHandlers
        let routeHandlerMap = this._routeHandlers.get(route);

        if (routeHandlerMap) {
            // Try to find method match in routeHandlerMap
            let methodHandler = routeHandlerMap.get(method)
            if (!methodHandler) {
                return res.end(JSON.stringify({
                    success: false,
                    message: `Handler for method '${method}' for route '${route}' not found`
                }))                
            }

            // HomeController.test
            const explodedHandler = methodHandler.split(".")
            const controllerName = explodedHandler[0]
            const methodName =explodedHandler[1]
            let handler = this._preloaded.get(controllerName)
            if(!handler){
                return res.end(JSON.stringify({
                    success: false,
                    message: `Handler for route '${route}' not found`
                }))   
            }
            handler = new handler()

            try {
                return handler[methodName]({ req, res })

            } catch (error) {
                return res.end(JSON.stringify({
                            success: false,
                            message: `Method '${methodName}' in handler ${controllerName} not found.`
                        }))
            }
        }
        return res.end(JSON.stringify({
            success: false,
            message: `Handler not found for route '${route}'`
        }))        
    }

    sanitizeUrl(url) {
        if (url[0] == "/") {
            url = url.substr(1)
        }
        return url;
    }


    // These functions below are just helpers functions with prettier names
    get(route, handler) {
        this.add(route, handler, "GET")
    }

    post(route, handler) {
        this.add(route, handler, "POST")
    }

    patch(route, handler) {
        this.add(route, handler, "PATCH")
    }

    put(route, handler) {
        this.add(route, handler, "PUT")
    }

    delete(route, handler) {
        this.add(route, handler, "DELETE")
    }
}

module.exports = Route