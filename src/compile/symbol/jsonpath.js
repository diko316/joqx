'use strict';


import IdentifierSymbol from "./identifier.js";

import {
            jsonRecodeArrayPath
            
        } from "../../helper/string.js";


export default
    class JsonPath extends IdentifierSymbol {
        constructor(compiler) {
            super(compiler);

            this.symbolAccess = true;
        }

        getCodeValue() {
            return this.getAccessCodeValue();
        }

        getPathParts() {
            var path = this.value;
            path = path.substring(1, path.length);
            return jsonRecodeArrayPath(path, true);
        }

        generateJSONPathArray() {
            var path = this.value;
            path = path.substring(1, path.length);
            return jsonRecodeArrayPath(path);
            
        }

        assign(source, operator) {
            return super.assign(source, operator);
        }
    }