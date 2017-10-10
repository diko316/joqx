'use strict';


function relayAll(context, lexeme) {
    context.updateIterator(lexeme.value[0]);
}

export {
    relayAll as rule_Literal,
    relayAll as rule_Primary,
    relayAll as rule_Javascript
};

