'use strict';

var TYPE_REFERENCE = "reference",
    TYPE_NUMBER = "number";

export
    function createReference(context, current, identifier, symbolIdentifier) {
        var typeReference = TYPE_REFERENCE,
            index = 0,
            path = symbolIdentifier ? '[]' : '.';
        var symbol, id, data, varname, validateId, errorMessage, helper;

        if (!current) {
            id = context.createSymbol(null, typeReference);
            symbol = context.getSymbol(id);
            symbol.finalized = false;
            symbol.reference = context.contextSymbol;
            symbol.data = [identifier];
            symbol.path = [path];
            symbol.generated = null;

        }
        else if (current.type !== typeReference) {
            id = current.id;
            symbol = context.getSymbol(context.createSymbol(null,
                                                typeReference));
            symbol.finalized = false;
            symbol.reference = id;
            symbol.data = [identifier];
            symbol.path = [path];
            symbol.generated = null;
            id = symbol.id;

        }
        else {
            id = current.id;
            data = current.data;
            index = data.length;

            data[index] = identifier;
            current.path[index] = path;

        }

        // validate symbol
        if (symbolIdentifier) {
            symbol = context.getSymbol(identifier);

            switch (symbol.type) {
            // allow string or number
            case "string":
            case "number": break;
            
            // this requires runtime validation
            default:
                validateId = symbol.id;
                helper = context.helperSymbol;

                if (symbol.type === typeReference) {
                    finalizeReference(context, validateId);
                }

                errorMessage = '"Invalid property name " + ' + validateId;

                context.appendCode([
                            '// validate access name ', validateId
                        ],
                        [
                            'if (!', helper, '.validProperty(', validateId,
                                ')) {',
                                'throw new Error(', errorMessage, ');',
                            '}'
                        ]);
            }
        }

        return id;
    }


export
    function finalizeReference(context, symbolId) {
        var symbol = context.getSymbol(symbolId);

        if (symbol && symbol.type === TYPE_REFERENCE && !symbol.finalized) {
            symbol.finalized = true;

            context.appendCode([
                symbolId, ' = ', context.helperSymbol, '.get(',
                    symbol.reference, ',',
                    generateCodePathArray(context, symbolId), ')'
                    
            ]);
        }

    }

export
    function generateCodePathArray(context, symbolId) {
        var symbol = context.getSymbol(symbolId);
        var generated, gl, data, path, item;

        if (symbol && symbol.type === TYPE_REFERENCE) {

            generated = symbol.generatedPathArray;
            if (generated) {
                return generated;
            }


            data = symbol.data;
            path = symbol.path;

            generated = [];
            generated.length = gl = data.length;

            for (; gl--;) {
                item = data[gl];
                generated[gl] = path[gl] === '.' ?
                                    '"' + item + '"' : item;
            }

            symbol.generatedPathArray =
                generated = '[' + generated.join(',') + ']';

            return generated;

        }

        return null;
    }

export
    function assign(context, operator, member, value) {
        var pathArray = generateCodePathArray(context, member),
            reference = context.getSymbol(member).reference,
            type = context.getSymbol(value).type,
            helper = context.helperSymbol;
        var targetValue;

        // math operations requires validation of current value
        switch (operator) {
        case "**=":
        case "*=":
        case "/=":
        case "%=":
        case "+=":
        case "-=":
            type = TYPE_NUMBER;

            targetValue = context.createSymbol([
                            helper, '.get(', reference, ',',
                                            pathArray,')'
                        ], type);
            
            // validate
            context.appendCode([
                'if (!', helper, '.number(',targetValue, ')) {',
                    'throw new Error("Invalid Assignment ', operator,
                    ' to " + ', targetValue,');',
                '} else {',
                    value, ' = ', targetValue, ' ',
                                operator.substring(0, operator.length - 1), ' ',
                                value,
                '}'
            ]);
        }

        return context.createSymbol([
                        context.helperSymbol, '.assign(',
                            reference, ',',
                            pathArray, ',',
                            value, ')'
                    ],
                    type);

    }
