class NotAHomeController {
    // Usually there are req and res objects passed to methods as a destructured object (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
    // However, we don't need them here (yet) for this simple example
    gettest({req,res}){
        return {message:"a small step for a small man, a big step for 5'5'' manlets"}
    }
}

module.exports = NotAHomeController //This needs to be included or requiring this file using  require() won't work