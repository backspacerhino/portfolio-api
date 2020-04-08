// In real application, here would be Ioc bind but for now we're using this
let Route = require("./Core/Route/RouteHandler")
Route = Route.getInstance()
Route.get("test", "HomeController.test").middleware(["test", "second"])

