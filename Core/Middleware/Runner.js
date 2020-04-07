"use strict"

class Runner {
    constructor(middlewares = []){
        this._middlewares = middlewares
        this.index = 0;
        this.params = []
    }


    set middlewares(middlewares){
        this.middlewares = middlewares;
    }


    async resolveFn(middlewareClass, params){
        const instance = middlewareClass()
        this.params.push(params)
        await instance.handle(...this.params) // Spread operator will send ctx and next as separate arguments (this is not needed but we're trying to recreate Adonis way of work)
    }

    async invoke(){
        const funcToExec = this._middlewares[this.index++] // Take the current and after that increase the number
        if(!funcToExec){
            return 
        }

        const params = this.invoke.bind(this)
        if(this.resolveFn){
            return this.resolveFn(funcToExec, params)
        }
    }

    async run(ctx){
        this.params.push(ctx)
        await this.invoke()
    }

}

module.exports = Runner