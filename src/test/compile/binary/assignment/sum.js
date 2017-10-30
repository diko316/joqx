'use strict';


describe(`Should be able to compile addition assignment operator "+="
        and internally evaluate the sum of left identifier and
        result of the right expression after "+=" operator and
        reassign the result to the left identifier.`,
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

        it(`1. Should be able to evaluate and reassign sum of the
            the left identifier and right expression after "+="
            operator and reassign the result to the left identifier.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile("buang += 2")).
                    not.toThrow();

                expect(() => compiled(context).
                                then((value) => {
                                    expect(value).
                                        toBe(context.buang);

                                    expect(context.buang).
                                        toBe(5);

                                    done();
                                })).not.toThrow();
            });
    });