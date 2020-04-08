"use strict"

/**
 * Basically a wrapper around our req and res
 */
class Context{
    constructor(req,res){
        this.req = req;
        this.res = res;
    }
}

module.exports = Context