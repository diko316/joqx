'use strict';

module.exports = [

// Expressions
    "Joqx",         [
                        [/\?[a-zA-Z\$][a-zA-Z0-9\$]*(\-[a-zA-Z0-9\$]+)*/, "Expression", /\?/]
                        
                    ],

    "Expression",   [
                        "SimpleExpr"
                    ],

    "SimpleExpr",   [
                        "Identifier"
                    ],


// Assignment
    // "Assignment",   [
    //                     ["Accessed", /\=/, "Assignment"],
    //                     "Accessed"
                        
    //                 ],


    // "Access",       [
    //                     [/\./, "Identifier"],
    //                     [/\[/, "SimpleExpr", /\]/]
    //                 ],

    

// Accessed
    // "Accessed",     [
    //                     ["SimpleObject", /\./, "Identifier"],
    //                     "Identifier"
    //                 ],

    "SimpleObject", [
                        "String",
                        "Number",
                        "JsonPath",
                        "Array",
                        "Object",
                        [/\(/, "SimpleExpr", /\)/]
                    ],

    "Arguments",    [
                        [/\(/, /\)/],
                        [/\(/, "ArgumentsList", /\)/]
                    ],

// Array
    "Array",        [
                        [/\[/, /\]/],
                        [/\[/, "ArgumentList", /\]/]
                    ],
    

    "ArgumentList", [
                        ["ArgumentList", /\,/, "SimpleExpr"],
                        "SimpleExpr"
                    ],

// Object
    "Object",        [
                        [/\{/, /\}/],
                        [/\{/, "FieldList", /\}/]
                    ],

    "FieldList",    [
                        ["FieldList", "Field"],
                        "Field"
                    ],

    "Field",        [
                        ["Identifier", /\:/, "SimpleExpr"],
                        ["String", /\:/, "SimpleExpr"],
                        ["Number", /\:/, "SimpleExpr"]
                    ],

// Basic

    "Identifier",   [/[a-zA-Z\_\$][a-zA-Z0-9\_\$]*/],

    "String",       [
                        /\"(\\\"|[^\"])*\"/,
                        /\'(\\\'|[^\'])*\'/
                    ],

    "Number",       [/[\+\-]?[0-9]*\.?[0-9]+/],

    "Null",         [/null/],

    "Undefined",    [/undefined/],

    "Boolean",      [/true|false/],

    "JsonPath",     [/\@[^ \r\n\t\.\[]+(\.[^ \r\n\t\.\[]+|\[\'(\\\'|[^\'])+\'\]|\[\"(\\\"|[^\"])+\"\]|\[[^\]]+\])*/]

];