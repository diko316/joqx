'use strict';

export 
    function rule_ArgumentList(context, lexeme, rule) {
        var value = lexeme.value;
        var args;

        switch (rule) {
        case "1:ArgumentList": // relay
            context.updateIterator([value[0]]);
            break;

        case "2:ArgumentList": // relay
            args = value[0].slice(0);
            args[args.length] = value[2];

            context.updateIterator(args);
            break;
        }
    }