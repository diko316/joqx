'use strict';


import Base from "./base.js";


export default
    class UndefinedSymbol extends Base {
        
        constructor(compiler) {
            super(compiler);

            this.autoDeclare = false;
        }
        
    }