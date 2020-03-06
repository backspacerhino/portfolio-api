const Url = require('url');

class RouteUtil {

    parseUrl(url) {
        url = this.sanitizeUrl(url)
        return url;
    }

    sanitizeUrl(url) {
        if (!url) {
            throw new Error("Url doesn't exist.")
        }

        if (url[0] == "/") {
            url = url.substr(1)
        }
        return url;
    }

    handleRoute({ req, res, controllerName, methodName }) {
        let controller;
        let response;
        try {
            controller = new (require(`../../app/Controllers/${controllerName}`))()
        } catch (error) {
            throw new Error(`Controller ${controllerName} not found.`)
        }

        if (typeof controller[methodName] == 'function'){
            response = controller[methodName]({ req, res });
            res.setHeader('Content-Type', 'application/json');

            try {
                response = JSON.stringify(response)
            } catch (error) {
                response = JSON.stringify({success:false, message: "Invalid response."})
            }
           
        }
        else{
            throw new Error(`Method ${methodName} not found.`)
        }
        return res.end(response);
    }
}

module.exports = RouteUtil