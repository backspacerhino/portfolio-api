class Route {
    constructor(route, handler, methods) {
        this._middlewares = []
        this.route = null;
        this.handler = null;
        this.methods = null;
        this.init(route, handler, methods)
    }

    init(route, handler, methods){
        // TODO: These should all be validated first
        
        this._sanitizeUrl(route)
        this.route = route;
        this.handler = handler;
        this.methods = methods;
    }

    _sanitizeUrl(url) {
        if (url[0] == "/") {
            url = url.substr(1)
        }
        return url;
    }
}

module.exports = Route