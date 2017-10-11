'use strict';


import { finalizeReference } from "./accessor.js";

var TYPE_ARGUMENTS = "arguments";

export
    function createArgumentSymbol(context, list, item) {
        var symbol, data;

        // new item
        if (!list) {
            symbol = context.createSymbol(null,
                        TYPE_ARGUMENTS);
            symbol = context.getSymbol(symbol);

            symbol.data = data = [];

        }
        else {
            symbol = context.getSymbol(list);
            data = symbol.data;
        }

        if (item) {
            data[data.length] = item;
        }

        return symbol.id;
    }

export
    function createFunctionReference(context, item, args) {
        var callSymbol = context.getSymbol(item);

        // finalize reference
        if (callSymbol.type === "reference") {
            finalizeReference(context, item);
        }

        
        
    }