'use strict';

module.exports = [

// Lexical Grammars

// keywords
    "this",             [/this/],
    "boolean",          [/true/, /false/],
    "null",             [/null/],
    "undefined",        [/undefined/],
    "then",             [/then/],

// arithmetic operators
    "+",                [/\+/],
    "-",                [/\-/],
    "%",                [/\%/],
    "*",                [/\*/],
    "/",                [/\//],

    "++",               [/\+\+/],
    "--",               [/\-\-/],
    "**",               [/\*\*/],

// object
    "new",              [/new/],
    "delete",           [/delete/],
    "typeof",           [/typeof/],

    ".",                [/\./],

// comparison
    "gt",               [/gt/],
    "gte",              [/gte/],

    "lt",               [/lt/],
    "lte",              [/lte/],

    ">=",               [/\>=/],
    ">",                [/\>/],

    "<=",               [/<=/],
    "<",                [/</],

// logical
    "instanceof",       [/instanceof/],
    "and",              [/and/],
    "or",               [/or/],
    "in",               [/in/],

    "&&",               [/\&\&/],
    "||",               [/\|\|/],
    "!",                [/!/],


    "?",                [/\?/],
    ":",                [/\:/],

// equality
    "==",               [/==/],
    "!=",               [/!=/],
    "===",              [/===/],
    "!==",              [/!==/],

//  assignment
    "=",                [/=/],
    "**=",              [/\*\*=/],
    "*=",               [/\*=/],
    "/=",               [/\/=/],
    "%=",               [/\%=/],
    "+=",               [/\+=/],
    "-=",               [/\-=/],

// literals
    "string",           [
                            /\"(\\\"|[^\"])*\"/,
                            /\'(\\\'|[^\'])*\'/
                        ],

    "decimal",          [
                            /[0-9]+/,
                            /\.[0-9]+/,
                            /[0-9]+\.[0-9]+/,

                            // with exponent
                            /[0-9]+[eE][\+\-]?[0-9]+/,
                            /\.[0-9]+[eE][\+\-]?[0-9]+/,
                            /[0-9]+\.[0-9]+[eE][\+\-]?[0-9]+/
                        ],

    "hex",              [/[\+\-]?0[xX][0-9a-fA-F]+/],
    "octal",            [/[\+\-]?0[oO][0-7]+/],
                        
    "binary",           [/[\+\-]?0[bB][01]+/],

    "json_path",        [/\@[^ \r\n\t\.\[]+(\.[^ \r\n\t\.\[]+|\[\'(\\\'|[^\'])+\'\]|\[\"(\\\"|[^\"])+\"\]|\[[^\]]+\])*/],

// enclosures
    "[",                [/\[/],
    "]",                [/\]/],
    "{",                [/\{/],
    "}",                [/\}/],
    "(",                [/\(/],
    ")",                [/\)/],
    ",",                [/\,/],

    "comment",          [
                            /\/\/[^ \n]*/,
                            /\#[^ \n]*/
                        ],

    "white_space",      [
                            /[ \r\n\t]+/
                        ],
    
        
    "void(",            [/void\(/],

    "intent",           [/\?[a-zA-Z\$][a-zA-Z0-9\$]*(\-[a-zA-Z0-9\$]+)*/],

    "identifier",       [/[a-zA-Z\_\$][a-zA-Z0-9\_\$]*/],

// Root Expression
    "Joqx",             [
                            ["intent", "Expression"],
                            "Expression"
                        ],

    "Expression",       [
                            "Assignment",
                            "Delete"
                        ],
// Number
    "Number",           [
                            "decimal",
                            "hex",
                            "octal"
                        ],

// Group
    "Group",            [
                            ["(", "Expression", ")"]
                        ],

// Array
    "Array",            [
                            ["[", "]"],
                            ["[", "Elements", "]"]
                        ],

    "Elements",         [
                            "Expression",
                            ["Elements", ",", "Expression"],
                        ],

// Object
    "Object",           [
                            ["{", "}"],
                            ["{", "Properties", "}"]
                        ],

    "Properties",       [
                            "Property",
                            ["Properies", ",", "Property"]
                        ],

    "Property",         [
                            ["identifier", ":", "Expression"],
                            ["string", ":", "Expression"],
                            ["Number", ":", "Expression"]
                        ],

// Function Call
    "Arguments",        [
                            ["(", ")"],
                            ["(", "ArgumentList", ")"]
                        ],

    "ArgumentList",     [
                            "Expression",
                            ["ArgumentList", ",", "Expression"]
                        ],

    "Delete",           [
                            ["delete", "Updatable"]
                        ],

    "Void",             [
                            ["void(", "Expression", ")"]
                        ],
// Literal
   
    "Literal",          [
                            "this",
                            "boolean",
                            "null",
                            "undefined",
                            "string",

                            "Number",
                            "Array",
                            "Object",
                            "Void",
                            "Group"
                        ],

// Object Member
    "Updatable",        [
                            "identifier",
                            ["Primary", "Member"],
                            ["Primary", "Access"]
                        ],

    "Access",           [
                            [".", "identifier"]
                        ],

    "Member",           [
                            ["[", "Expression", "]"]
                        ],

// Function Call
    "Call",             [
                            ["Updatable", "Arguments"]
                        ],

    "Instantiate",      [
                            ["new", "Updatable"],
                            ["new", "Updatable", "Arguments"]
                        ],

    "Primary",          [
                            "Updatable",
                            "Literal",
                            "Instantiate",
                            "Call"
                        ],

    "PostFix",          [
                            "Primary",
                            ["Updatable", "++"],
                            ["Updatable", "--"]
                            
                        ],

    "Unary",            [
                            "PostFix",
                            ["++", "Updatable"],
                            ["--", "Updatable"],
                            ["+",  "Number"],
                            ["-", "Number"],
                            ["typeof", "Primary"],
                            ["!", "Primary"]
                        ],

    "Exponential",      [
                            "Unary",
                            ["Exponential", "**", "Unary"]
                        ],

    "Multiplicative",   [
                            "Exponential",
                            ["Multiplicative", "*", "Exponential"],
                            ["Multiplicative", "/", "Exponential"],
                            ["Multiplicative", "%", "Exponential"]
                        ],

    "Additive",         [
                            "Multiplicative",
                            ["Additive", "-", "Multiplicative"],
                            ["Additive", "+", "Multiplicative"]
                        ],

    "Relational",       [
                            "Additive",

                            ["Relational", "<", "Additive"],
                            ["Relational", "lt", "Additive"],

                            ["Relational", ">", "Additive"],
                            ["Relational", "gt", "Additive"],

                            ["Relational", "<=", "Additive"],
                            ["Relational", "lte", "Additive"],

                            ["Relational", ">=", "Additive"],
                            ["Relational", "gte", "Additive"],

                            ["Relational", "instanceof", "Additive"],
                            ["Relational", "in", "Additive"]
                        ],

    "Equality",         [
                            "Relational",

                            ["Equality", "==", "Relational"],
                            ["Equality", "!=", "Relational"],
                            ["Equality", "===", "Relational"],
                            ["Equality", "!==", "Relational"]
                            
                        ],

    "LogicalAnd",       [
                            "Equality",
                            ["LogicalAnd", "&&", "Equality"],
                            ["LogicalAnd", "and", "Equality"]
                        ],

    "LogicalOr",        [
                            "LogicalAnd",
                            ["LogicalOr", "||", "LogicalAnd"],
                            ["LogicalOr", "or", "LogicalAnd"]
                        ],
// Ternary
    "Conditional",      [
                            "LogicalOr",
                            ["LogicalOr", "?", "Expression", ":", "Expression"]
                        ],

    "Assignment",       [
                            "Conditional",
                            ["Updatable", "=", "Assignment"],
                            ["Updatable", "**=", "Assignment"],
                            ["Updatable", "*=", "Assignment"],
                            ["Updatable", "/=", "Assignment"],
                            ["Updatable", "%=", "Assignment"],
                            ["Updatable", "+=", "Assignment"],
                            ["Updatable", "-=", "Assignment"]
                        ]

];