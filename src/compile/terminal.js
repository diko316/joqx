'use strict';

var TYPE_NUMBER = 'number';

function compileTerminal(context, lexeme) {
    var cache = lexeme.value,
        name = lexeme.name,
        value = cache;

    switch (lexeme.name) {
    case "decimal":
        value = context.createSymbol(value, TYPE_NUMBER);
        break;

    case "hex":
        value = context.createSymbol('' +
                        parseInt(value.substring(2, value.length), 16),
                        TYPE_NUMBER);
        break;

    case "octal":
        value = context.createSymbol('' +
                        parseInt(value.substring(2, value.length), 8),
                        TYPE_NUMBER);
        break;

    case "binary":
        value = context.createSymbol('' +
                        parseInt(value.substring(2, value.length), 2),
                        TYPE_NUMBER);
        break;
        
    case "string":
    case "boolean":
    case "null":
    case "undefined":
    case "identifier":
    case "jsonpath":
        value = context.createSymbol(value, name);
        break;
    }
    

    if (cache !== value) {
        context.updateIterator(value);
    }
}


// identifier
export default compileTerminal;
