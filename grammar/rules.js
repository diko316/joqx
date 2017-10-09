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

    
// Literals
    "Group",            [
                            [/\(/, "Expression", /\)/]
                        ],

// Array
    "Array",            [
                            [/\[/, /\]/],
                            [/\[/, "Elements", /\]/]
                        ],

    "Elements",         [
                            "Assignment",
                            ["Elements", /\,/, "Assignment"],
                        ],

// Object
    "Object",           [
                            [/\{/, /\}/],
                            [/\{/, "Properties", /\}/]
                        ],

    "Properties",       [
                            "Property",
                            ["Properies", /\,/, "Property"]
                        ],

    "Property",         [
                            ["Identifier", /\:/, "Assignment"],
                            ["String", /\:/, "Assignment"],
                            ["Number", /\:/, "Assignment"]
                        ],

// Function Call
    "Call",             [
                            ["Updatable", /\(/, /\)/],
                            ["Updatable", /\(/, "ArgumentList", /\)/]
                        ],

    "Arguments",     [
                            "Assignment",
                            ["Arguments", /\,/, "Assignment"]
                        ],

// Expression
    "Expression",       [
                            "Assignment"
                        ],

    "Primary",          [
                            /this/,
                            "Null",
                            "Undefined",
                            "Boolean",
                            "Number",
                            "String",
                            "Array",
                            "Object",
                            "Call",
                            "Group"
                        ],

    "Updatable",        [
                            "Identifier",
                            "Member",
                            "Property"
                        ],

    "Property",         [
                            ["Primary", /\./, "Identifier"],
                            ["Updatable", /\./, "Identifier"]
                            
                        ],

    "Member",           [
                            ["Primary", /\[/, "Expression", /\]/],
                            ["Updatable", /\[/, "Expression", /\]/]
                        ],
                        
// Operand
    // "Operand",          [
    //                         "Updatable",
    //                         "Primary"
    //                     ],
// Unary
    "Typeof",           [
                            [/typeof/, "Operand"]
                        ],

    "Delete",           [
                            [/delete/, "Updatable"],
                        ],

    "Not",              [
                            [/!/, "Operand"]
                        ],

    "Void",             [
                            [/void\(/, "Expression", /\)/]
                        ],
    
    "PreIncrement",     [
                            [/\+\+/, "Updatable"]
                        ],

    "PreDecrement",     [
                            [/\-\-/, "Updatable"]
                        ],

    "PostIncrement",    [
                            ["Updatable", /\+\+/]
                        ],

    "PostDecrement",    [
                            ["Updatable", /\-\-/]
                        ],

    "Operand",          [
                            "Updatable",
                            "Primary",
                        ],

    "Unary",            [
                            "Operand",
                            "Typeof",
                            "Delete",
                            "Not",
                            "Void",
                            "PreIncrement",
                            "PreDecrement",
                            "PostIncrement",
                            "PostDecrement"
                        ],

//  Binaries

//  Exponential
    "Exponential",      [
                            "Unary",
                            ["Exponential", /\*\*/, "Unary"]
                        ],

    "Multiplicative",   [
                            "Exponential",
                            ["Multiplicative", /\*/, "Exponential"],
                            ["Multiplicative", /\//, "Exponential"],
                            ["Multiplicative", /\%/, "Exponential"]
                        ],

    "Additive",         [
                            "Multiplicative",
                            ["Additive", /\-/, "Multiplicative"],
                            ["Additive", /\+/, "Multiplicative"]
                        ],

    "Relational",       [
                            "Additive",

                            ["Relational", /</, "Additive"],
                            ["Relational", /lt/, "Additive"],

                            ["Relational", /\>/, "Additive"],
                            ["Relational", /gt/, "Additive"],

                            ["Relational", /<\=/, "Additive"],
                            ["Relational", /lte/, "Additive"],

                            ["Relational", /\>\=/, "Additive"],
                            ["Relational", /gte/, "Additive"],

                            ["Relational", /instanceof/, "Additive"],
                            ["Relational", /in/, "Additive"]
                        ],

    "Equality",         [
                            "Relational",

                            ["Equality", /\=\=/, "Relational"],
                            ["Equality", /!\=/, "Relational"],
                            ["Equality", /\=\=\=/, "Relational"],
                            ["Equality", /!\=\=/, "Relational"]
                            
                        ],

    "LogicalAnd",       [
                            "Equality",
                            ["LogicalAnd", /\&\&/, "Equality"],
                            ["LogicalAnd", /and/, "Equality"]
                        ],

    "LogicalOr",        [
                            "LogicalAnd",
                            ["LogicalOr", /\|\|/, "LogicalAnd"],
                            ["LogicalOr", /or/, "LogicalAnd"]

                        ],
// Ternary
    "Conditional",      [
                            ["LogicalOr", /\?/, "Assignment", /\:/, "Assignment"]
                        ],

    "Assignment",       [
                            "Conditional",
                            ["Updatable", /\=/, "Assignment"]
                        ],

// Assignment


    // "Assignment",       [
    //                         ["Unary", /\=/, "Assignment"],
    //                         "Unary"
    //                     ]
];