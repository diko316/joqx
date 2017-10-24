'use strict';

import {
            jsonParsePath
        } from "libcore";
import {
            string,
            number
        } from "libcore";

var UTF_PAD = '0000',
    NUMERIC_RE = /^([1-9][0-9]*|0)$/g,
    ESCAPE_CHARS = {
        0: '0',
        8: 'b',
        9: 't',
        10: 'n',
        11: 'v',
        12: 'f',
        13: 'r',
        34: '"',
        39: "'",
        91: "[",
        92: '\\',
        93: "]"
    };

export
    function escapeString(subject) {
        var escapeIndex = ESCAPE_CHARS,
            backslash = '\\',
            utf = backslash + "u",
            pad = UTF_PAD,
            pl = pad.length,
            l = subject.length,
            out = Array.prototype.slice.call(subject, 0);
        var code;

        out.length = l;

        for (; l--;) {
            code = subject.charCodeAt(l);
            if (code in escapeIndex) {
                out[l] = backslash + escapeIndex[code];

            }
            else if (code < 32 || code > 126) {
                code = code.toString(16);
                out[l] = utf +
                            pad.substring(0, pl - code.length) +
                            code.toLowerCase();
            }
        }

        return out.join('');
    }

export
    function numeric(subject) {
        return string(subject) ?
                    NUMERIC_RE.test(subject) :
                    number(subject);
    }

export
    function jsonRecodeArrayPath(jsonString) {
        var path = jsonParsePath(jsonString),
            cescape = escapeString,
            l = path && path.length;

        if (l) {
            for (; l--;) {
                path[l] = '"' + cescape(path[l]) + '"';
            }
            return '[' + path.join(',') + ']';
        }
        return '[]';
    }