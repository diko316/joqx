'use strict';

module.exports = [

// Expressions
    "Joqx",         [
                        [/\?[a-zA-Z\$][a-zA-Z0-9\$]*(\-[a-zA-Z0-9\$]+)*/, "Expression", /\?/]
                    ],

    "Expression",   [
                        "SimpleExpr",
                        "Object"
                    ],

    "SimpleExpr",   [
                        "Null",
                        "Undefined",
                        "Boolean",
                        "String",
                        "Number",
                        "Identifier",
                        "JsonPath",
                        "Array",
                        [/\(/, "Expression", /\)/]
                    ],

    "CallExpr",     [
                        "Expression",
                        "NewExpr",
                        ["CallExpr", "Access"],
                        ["CallExpr", "Arguments"]
                    ],

    "AssignExpr",   [
                        ["CallExpr", /\=/, "AssignExpr"],
                    ],

    "NewExpr",      [
                        [/new/, "CallExpr"]
                    ],

    
// Collection Expression
    "Access",       [
                        [/\./, "Identifier"],
                        [/\[/, "Expression", /\]/]
                    ],

    "Arguments",    [
                        [/\(/, /\)/],
                        [/\(/, "ArgumentList", /\)/]
                    ],

    "ArgumentList", [
                        ["ArgumentList", "AssignExpr"],
                        "AssignExpr"
                    ],

    "Array",        [
                        [/\[/, /\]/],
                        [/\[/, "ArrayItemList", /\]/]
                    ],
    "ItemList",     [
                        ["ItemList", /\,/, "AssignExpr"],
                        "AssignExpr"
                    ],

    "Object",       [
                        [/\{/, /\}/],
                        [/\{/, "FieldList", /\}/]
                    ],

    "FieldList",    [
                        ["Identifier", /\:/, "AssignExpr"],
                        ["String", /\:/, "AssignExpr"]
                    ],

// Unary Expressions
    "UnaryExpr",    [
                        "PostUnary",
                        [/\+\+/, "PostUnary"],
                        [/\-\-/, "PostUnary"],
                        [/!/, "PostUnary"],
                        [/typeof/, "PostUnary"]
                    ],

    "PostUnary",    [
                        ["CallExpr", /\+\+/],
                        ["CallExpr", /\-\-/],
                        "CallExpr"
                    ],

    "ArithMulti",   [
                        ["ArithMulti", /\*/, "UnaryExpr"],
                        ["ArithMulti", /\//, "UnaryExpr"],
                        ["ArithMulti", /\%/, "UnaryExpr"],
                        "UnaryExpr"
                    ],

    "ArithAddi",    [
                        ["ArithAddi", /\+/, "ArithMulti"],
                        ["ArithAddi", /\-/, "ArithMulti"],
                        "ArithMulti"
                    ],

    

// literals
    "String",       [
                        /\"(\\\"|[^\"])*\"/,
                        /\'(\\\'|[^\'])*\'/
                    ],

    "Number",       [/[\+\-]?[0-9]*\.?[0-9]+/],

    "Null",         [/null/],

    "Undefined",    [/undefined/],

    "Boolean",      [/true|false/],

    "JsonPath",     [/\@[^ \r\n\t\.\[]+(\.[^ \r\n\t\.\[]+|\[\'(\\\'|[^\'])+\'\]|\[\"(\\\"|[^\"])+\"\]|\[[^\]]+\])*/],

    "Identifier",   [/[a-zA-Z\_\$][a-zA-Z0-9\_\$]*/]


    

];