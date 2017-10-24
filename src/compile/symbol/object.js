'use strict';


import CollectionSymbol from "./collection.js";


export default
    class ObjectSymbol extends CollectionSymbol {

        constructor(compiler) {
            super(compiler);
            this.dataAccess = [];

        }

        append(item, name) {
            var list = this.dataAccess;
            list[list.length] = name;
            return super.append(item);
        }
        
        getCodeValue() {
            return '{' + super.getCodeValue() + '}';
        }

        generateItemCode(symbol, c) {
            var name = this.dataAccess[c];
            return name + ':' + symbol.id;
        }
        
    }