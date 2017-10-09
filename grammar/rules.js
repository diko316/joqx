'use strict';

module.exports = [


// Root
    "Joqx",             [
                            [/<\?[a-zA-Z\$][a-zA-Z0-9\$]*(\-[a-zA-Z0-9\$]+)*/, "Expression", /\?\>/],
                            "Expression"
                        ],

    "Expression",       [
                            "Assignment",
                            "Delete"
                        ],

// Keywords
    "Keyword",          [
                            /this/,
                            /true/,
                            /false/,
                            /null/,
                            /undefined/,

                            // unary
                            /new/,
                            /delete/,

                            // binary
                            /typeof/,
                            /gt/,
                            /gte/,
                            /lt/,
                            /lte/,
                            /instanceof/,
                            /and/,
                            /or/,
                            /in/
                        ],

// Lexical Grammar
    "String",           [
                            /\"(\\\"|[^\"])*\"/,
                            /\'(\\\'|[^\'])*\'/
                        ],

    "Number",           [
                            "Decimal",
                            "Hex",
                            "Octal"
                        ],

    "Decimal",          [
                            /[\+\-]?[0-9]+/,
                            /[\+\-]?\.[0-9]+/,
                            /[\+\-]?[0-9]+\.[0-9]+/,
                            /[\+\-]?[0-9]+[eE][\+\-]?[0-9]+/,
                            /[\+\-]?\.[0-9]+[eE][\+\-]?[0-9]+/,
                            /[\+\-]?[0-9]+\.[0-9]+[eE][\+\-]?[0-9]+/
                        ],

    "Hex",              [/[\+\-]?0[xX][0-9a-fA-F]+/],

    "Octal",            [/[\+\-]?0[oO][0-7]+/],

    "Binary",           [/[\+\-]?0[bB][01]+/],

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
                            "Expression",
                            ["Elements", /\,/, "Expression"],
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
                            ["Identifier", /\:/, "Expression"],
                            ["String", /\:/, "Expression"],
                            ["Number", /\:/, "Expression"]
                        ],

// Function Call
    "Arguments",        [
                            [/\(/, /\)/],
                            [/\(/, "ArgumentList", /\)/]
                        ],

    "ArgumentList",     [
                            "Expression",
                            ["ArgumentList", /\,/, "Expression"]
                        ],

    "Delete",           [
                            [/delete/, "Updatable"]
                        ],

    "Void",             [
                            [/void\(/, "Expression", /\)/]
                        ],
// Literal
    "Identifier",       [/[a-zA-Z\_\$][a-zA-Z0-9\_\$]*/],

    "Literal",          [
                            /this/,
                            /true/,
                            /false/,
                            /null/,
                            /undefined/,
                            "Number",
                            "String",
                            "Array",
                            "Object",
                            "Void",
                            "Group"
                        ],

// Object Member
    "Updatable",        [
                            "Identifier",
                            ["Primary", "Member"],
                            ["Primary", "Access"]
                        ],

    "Access",           [
                            [/\./, "Identifier"]
                        ],

    "Member",           [
                            [/\[/, "Expression", /\]/]
                        ],

// Function Call
    "Call",             [
                            ["Updatable", "Arguments"]
                        ],

    "Instantiate",      [
                            [/new/, "Updatable"],
                            [/new/, "Updatable", "Arguments"]
                        ],

    "Primary",          [
                            "Updatable",
                            "Literal",
                            "Instantiate",
                            "Call"
                        ],

    "PreUnary",         [
                            "Primary",
                            [/\+\+/, "Updatable"],
                            [/\-\-/, "Updatable"],
                            [/typeof/, "Primary"],
                            [/!/, "Primary"]
                        ],

    "Unary",            [
                            "PreUnary",
                            ["Updatable", /\+\+/],
                            ["Updatable", /\-\-/]
                        ],

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
                            "LogicalOr",
                            ["LogicalOr", /\?/, "Expression", /\:/, "Expression"]
                        ],

    "Assignment",       [
                            "Conditional",
                            ["Updatable", /\=/, "Assignment"],
                            ["Updatable", /\*\*\=/, "Assignment"],
                            ["Updatable", /\*\=/, "Assignment"],
                            ["Updatable", /\/\=/, "Assignment"],
                            ["Updatable", /\%\=/, "Assignment"],
                            ["Updatable", /\+\=/, "Assignment"],
                            ["Updatable", /\-\=/, "Assignment"],
                        ]

    

];