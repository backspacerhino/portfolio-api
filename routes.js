// In real application, here would be Ioc bind but for now we're using this
let Route = (require("./Core/Route/index")).getInstance()


// Express is using this type of route handling (Instead of second parameter being string for actual controller file)
Route.get("test", ({ req, res }) => {
    return res.end(JSON.stringify({
        success: true,
        message: "Works."
    }))
})


// This route will override the above one
Route.delete("/test", ({ req, res }) => {
    return res.end(JSON.stringify({
        success: true,
        message: "Works 2."
    }))
})



Route.get("/tests/testing", ({ req, res }) => {
    return res.end(JSON.stringify({
        success: true,
        message: "Works 3."
    }))
})
