"use strict"

const Server = require("./Core/Server/index")

const serverMiddleware = []

const globalMiddleware = []

const namedMiddleware = {
    test: "app/Middlewares/Test",
    second: "app/Middlewares/Second",
}


let server = Server.getInstance()
server.registerServer(serverMiddleware)
    .registerGlobal(globalMiddleware)
    .registerNamed(namedMiddleware)
    .compile()