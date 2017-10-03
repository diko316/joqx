'use strict';

module.exports = [



// Root
    "Joqx",             [
                            [/\?[a-zA-Z\$][a-zA-Z0-9\$]*(\-[a-zA-Z0-9\$]+)*/, "Expression", /\?/]
                        ],


// Lexical Grammar
    "Identifier",       [/[a-zA-Z\_\$][a-zA-Z0-9\_\$]*/],
    
    "String",           [
                            /\"(\\\"|[^\"])*\"/,
                            /\'(\\\'|[^\'])*\'/
                        ],

    "Number",           [/[\+\-]?[0-9]*\.?[0-9]+/],

    "Null",             [/null/],

    "Undefined",        [/undefined/],

    "Boolean",          [/true|false/],

    "JsonPath",         [/\@[^ \r\n\t\.\[]+(\.[^ \r\n\t\.\[]+|\[\'(\\\'|[^\'])+\'\]|\[\"(\\\"|[^\"])+\"\]|\[[^\]]+\])*/],


// Expression
    "Expression",       [
                            "Assignment"
                        ],

    "PrimaryExpr",      [
                            /this/,
                            "Identifier",
                            "Literal",
                            "ArrayLiteral",
                            "ObjectLiteral",
                            [/\(/, "Expression", /\)/]
                        ],

    "Literal",          [
                            "Null",
                            "Undefined",
                            "Boolean",
                            "Number",
                            "String",
                            "Array"
                        ],
// Array
    "ArrayLiteral",     [
                            [/\[/, /\]/],
                            [/\[/, "Elements", /\]/]
                        ],

    "Elements",         [
                            ["Elements", /\,/, "Assignment"],
                            "Assignment"
                        ],

// Object
    "ObjLiteral",       [
                            [/\{/, /\}/],
                            [/\{/, "Properties", /\}/]
                        ],

    "Properties",       [
                            ["Properies", /\,/, "Property"],
                            "Property"
                        ],

    "Property",         [
                            ["PropertyName", /\:/, "Assignment"]
                        ],

    "PropertyName",     [
                            "Identifier",
                            "String",
                            "Number"
                        ],

    "Member",           [
                            "PrimaryExpr",
                            ["Member", /\[/, "Expression", /\]/],
                            ["Member", /\./, "Identifier"],
                            [/new/, "Member", "Arguments"]
                        ],

    "NewExpr",          [
                            "Member",
                            [/new/, "NewExpr"]
                        ],
// Callee
    "CallExpr",         [
                            ["CallExpr", "Arguments"],
                            ["CallExpr", /\[/, "Expression", /\]/],
                            ["CallExpr", /\./, "Identifier"]
                        ],

    "CallMemberExpr",   [
                            ["Member", "Arguments"]
                        ],
    
    "Arguments",        [
                            [/\(/, /\)/],
                            [/\(/, "ArgumentList", /\)/]
                        ],

    "ArgumentList",     [
                            ["ArgumentList", /\,/, "Assignment"],
                            "Assignment"
                        ],

    "LeftHandExpr",     [
                            "NewExpr",
                            "CallExpr"
                        ],

    "UpdateExpr",       [
                            ["LeftHandExpr", /\+\+/],
                            ["LeftHandExpr", /\-\-/],
                            [/\+\+/, "UnaryExpr"],
                            [/\-\-/, "UnaryExpr"],
                            "LeftHandExpr"
                        ],

    "UnaryExpr",        [
                            "UpdateExpr",
                            [/delete/, "UnaryExpr"],
                            [/void/, "UnaryExpr"],
                            [/typeof/, "UnaryExpr"],
                            [/!/, "UnaryExpr"]
                        ],

    "Exponent",         [
                            "UnaryExpr",
                            ["UpdateExpr", /\*\*/, "Exponent"]
                        ],

    "Multiplicative",   [
                            "Exponent",
                            ["Multiplicative", /\*/, "Exponent"],
                            ["Multiplicative", /\//, "Exponent"],
                            ["Multiplicative", /\%/, "Exponent"]
                        ],

    "Additive",         [
                            "Multiplicative",
                            ["Additive", /\+/, "Multiplicative"],
                            ["Additive", /\-/, "Multiplicative"],
                        ],

    "Condition",        [
                            "Additive",
                            ["Condition", /\</, "Additive"],
                            ["Condition", /lt/, "Additive"],
                            
                            ["Condition", /\>/, "Additive"],
                            ["Condition", /gt/, "Additive"],

                            ["Condition", /\<\=/, "Additive"],
                            ["Condition", /lte/, "Additive"],

                            ["Condition", /\>\=/, "Additive"],
                            ["Condition", /gte/, "Additive"],
                            ["Condition", /instanceof/, "Additive"],
                            ["Condition", /in/, "Additive"],
                        ],

    "Equality",   [
                            "Condition",
                            ["Equality", /\=\=/, "Condition"],
                            ["Equality", /equal/, "Condition"],

                            ["Equality", /\=\=\=/, "Condition"],
                            ["Equality", /equequ/, "Condition"],

                            ["Equality", /!\=/, "Condition"],
                            ["Equality", /notequal/, "Condition"],

                            ["Equality", /!\=\=/, "Condition"],
                            ["Equality", /notequeque/, "Condition"]
                        ],

    "Logical",          [
                            "Equality",
                            ["Logical", /\&\&/, "Equality"],
                            ["Logical", /and/, "Equality"],

                            ["Logical", /\|\|/, "Equality"],
                            ["Logical", /or/, "Equality"]
                        ],
    
    "ConditionalExpr",  [
                            "Logical",
                            ["Logical", /\?/, "Assignment", /\:/, "Assignment"]
                        ],

    "Assignment",       [
                            "ConditionalExpr",
                            //["LeftHandExpr", /\=/, "Assignment"]
                            // ["LeftHandExpr", /\*\=/, "Assignment"],
                            // ["LeftHandExpr", /\/\=/, "Assignment"],
                            // ["LeftHandExpr", /\%\=/, "Assignment"],
                            // ["LeftHandExpr", /\+\=/, "Assignment"],
                            // ["LeftHandExpr", /\-\=/, "Assignment"],
                            // ["LeftHandExpr", /\*\*\=/, "Assignment"]
                        ]

];