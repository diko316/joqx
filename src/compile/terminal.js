'use strict';

var TYPE_NUMBER = 'number';

function compileTerminal(context, lexeme) {
    var cache = lexeme.value,
        name = lexeme.name,
        value = cache;

    switch (lexeme.name) {
    case "decimal":
        value = context.createConstant(value, TYPE_NUMBER);
        break;

    case "hex":
        value = context.createConstant('' +
                        parseInt(value.substring(2, value.length), 16),
                        TYPE_NUMBER);
        break;

    case "binary":
        value = context.createConstant('' +
                        parseInt(value.substring(2, value.length), 2),
                        TYPE_NUMBER);
        break;
        
    case "string":
        value = context.createConstant(value, name);
        break;

    case "boolean":
        value = context.createConstant(value, name);
        break;

    case "null":
        value = context.createConstant(value, name);
        break;

    case "undefined":
        value = context.createConstant(value, name);
        break;
    }

    if (cache !== value) {
        context.updateIterator(value);
    }
}


// identifier
export default compileTerminal;
