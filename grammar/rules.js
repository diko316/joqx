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

    "Primary",          [
                            /this/,
                            "Null",
                            "Undefined",
                            "Boolean",
                            "Number",
                            "String",
                            "Identifier",
                            "Array",
                            "Object",
                            [/\(/, "Expression", /\)/]
                        ],

// Array
    "Array",            [
                            [/\[/, /\]/],
                            [/\[/, "Elements", /\]/]
                        ],

    "Elements",         [
                            ["Elements", /\,/, "Assignment"],
                            "Assignment"
                        ],
// Object
    "Object",       [
                            [/\{/, /\}/],
                            [/\{/, "Properties", /\}/]
                        ],

    "Properties",       [
                            ["Properies", /\,/, "Property"],
                            "Property"
                        ],

    "Property",         [
                            ["Identifier", /\:/, "Assignment"],
                            ["String", /\:/, "Assignment"],
                            ["Number", /\:/, "Assignment"]

                        ],

    "Member",           [
                            ["Member", "MemberAccess"],
                            "Primary"
                        ],

    "MemberAccess",     [
                            [/\./, "Identifier"],
                            [/\[/, "Expression", /\]/]
                        ],

    
    "Arguments",        [
                            [/\(/, /\)/],
                            [/\(/, "ArgumentList", /\)/]
                        ],

    "ArgumentList",     [
                            ["ArgumentList", /\,/, "Expression"],
                            "Expression"
                        ],

    "Assignment",       [
                            "Member"
                        ]
];