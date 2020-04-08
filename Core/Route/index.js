class Route {
    constructor({ route, handler, method }) {
        this._middlewares = []
        this.route = null;
        this.handler = {
            handler: null,
            method: null
        };
        this.method = null;
        this.init(route, handler, method)
    }

    init(route, handler, method) {
        // TODO: These should all be validated first

        this._sanitizeUrl(route)
        this.route = route;
        this.handler = handler;
        this.method = method;
    }

    _sanitizeUrl(url) {
        if (url[0] == "/") {
            url = url.substr(1)
        }
        return url;
    }
}

module.exports = Route