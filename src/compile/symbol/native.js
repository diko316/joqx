'use strict';


import Base from "./base.js";


export default
    class Native extends Base {

        constructor(compiler) {
            super(compiler);

            this.autoDeclare = true;
        }
        
    }