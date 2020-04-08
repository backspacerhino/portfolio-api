class Test {
    async handle({ req }, next) {
        console.log("this is a test middleware");
        await next()
    }
}

module.exports = Test