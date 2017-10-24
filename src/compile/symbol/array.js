'use strict';


import Base from "./collection.js";


export default
    class Array extends Base {

        getCodeValue() {
            return '[' + super.getCodeValue() + ']';
        }
        
    }