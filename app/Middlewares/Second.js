class Second {
    async handle({ req }, next) {
        console.log("this is SECOND middleware");
        
        await next() // This next() will actually return undefined and after that we are back in MiddlewareHandler line 41
    }
}

module.exports = Second