'use strict';


function compileTerminal(context, lexeme) {
    var cache = lexeme.value,
        value = cache;

    switch (lexeme.name) {
    case "hex":
            value = '' + parseInt(value.substring(2, value.length),
                                    16);
        break;

    case "binary":
            value = '' + parseInt(value.substring(2, value.length),
                                2);
        break;
        
    case "string":
            value = context.createSymbol(value);
        break;
    }

    if (cache !== value) {
        context.updateIterator(value);
    }
}


// identifier
export default compileTerminal;
