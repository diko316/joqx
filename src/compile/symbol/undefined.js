'use strict';


import Base from "./native.js";


export default
    class UndefinedSymbol extends Base {
        
        constructor(compiler) {
            super(compiler);
            this.allowAccess = 
                this.autoDeclare = false;
            
        }
        
    }