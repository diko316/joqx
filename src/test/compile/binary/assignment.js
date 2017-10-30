'use strict';


describe(`Should be able to compile assignment operator "="
        and internally assign right expression to left identifier.`,
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

        it(`1. Should be able to evaluate right expression and assign
            resulting value to the identifier before "=" operator.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile("result = 1 - 0 ? 10 : 11")).
                    not.toThrow();

                expect(() => compiled(context).
                                then((value) => {
                                    expect(value).
                                        toBe(context.result);

                                    expect(value).
                                        toBe(10);

                                    done();
                                })).not.toThrow();
            });
    });