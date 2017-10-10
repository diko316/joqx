'use strict';

export 
    function rule_Number(context, lexeme) {
        context.updateIterator(
            context.createSymbol(lexeme.value[0]));
    }