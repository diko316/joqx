'use strict';


describe(`Should be able to compile division assignment operator "/="
        and internally evaluate the quotient of left identifier and
        result of the right expression after "/=" operator and
        reassign it to the left identifier.`,
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

        it(`1. Should be able to evaluate and reassign the quotient of the
            the left identifier and the right expression after "/="
            operator and reassign the result to the left identifier.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile("buang /= 4")).
                    not.toThrow();

                expect(() => compiled(context).
                                then((value) => {
                                    expect(value).
                                        toBe(context.buang);

                                    expect(context.buang).
                                        toBe(0.75);

                                    done();
                                })).not.toThrow();
            });
    });