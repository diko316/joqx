'use strict';


import Base from "./collection.js";


export default
    class Arguments extends Base {

        constructor(compiler) {
            super(compiler);

            this.autoDeclare =
                this.autoFinalize = 
                this.finalizeOnAccess = false;

        }

        // arguments should not be declared
        getDeclarationValue() {
            return null;
        }
        
    }