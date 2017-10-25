'use strict';

import { thenable } from "libcore";

export
    function promiseGuard(method) {

        function executor(helper, s1, s2, s3, s4, s5, s6, s7, s8) {
            if (thenable(s1)) {
                return s1.then(function (s1) {
                    return method.call(helper, s1, s2, s3, s4, s5, s6, s7, s8);
                });
            }

            return method.call(helper, s1, s2, s3, s4, s5, s6, s7, s8);
        }

        return executor;
    }