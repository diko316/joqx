'use strict';


describe(`Should be able to compile exponent assignment operator "**="
        and internally apply exponentation of left identifier raised
        to the power of the result of expression after "**=" operator
        assign it to the left identifier.`,
    () => {
        var compile = main.compile;
        var context;
            

        beforeEach(() => {
            context = {
                buang: 3,
                undefinedNi: undefined,
                inner: {
                    deepInner: 'diko',
                    sulodPajud: {
                        naaPa: {
                            last: "yes!"
                        }
                    }
                }
            };
        });

        it(`1. Should be able to evaluate right expression then
            use it to raise the power of left identifier before "**=" operator
            and reassign the result value to the left identifier.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile("buang **= 4")).
                    not.toThrow();

                expect(() => compiled(context).
                                then((value) => {
                                    expect(value).
                                        toBe(context.buang);

                                    expect(value).
                                        toBe(Math.pow(3, 4));

                                    done();
                                })).not.toThrow();
            });
    });