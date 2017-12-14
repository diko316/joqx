'use strict';

import {
            method,
            thenable
        } from 'libcore';

function FakePromise(value) {

    function then(onFulfill, onReject) {
        var subject = value,
            isFunction = method,
            canFulfill = isFunction(onFulfill);

        if (thenable(subject)) {
            return subject.then(onFulfill, onReject);
        }

        if (canFulfill) {
            subject = onFulfill(subject);
        }

        return new FakePromise(subject);
        
    }

    this.then = then;
}


export { FakePromise };