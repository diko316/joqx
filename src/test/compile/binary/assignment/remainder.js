'use strict';


describe(`Should be able to compile modulo division assignment operator "%="
        and internally evaluate the modulo division of left identifier and
        result of the right expression after "/=" operator and
        reassign the remainder result to the left identifier.`,
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

        it(`1. Should be able to evaluate and reassign the modulo division of the
            the left identifier and the right expression after "%="
            operator and reassign the remainder result to the left identifier.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile("buang %= 2")).
                    not.toThrow();

                expect(() => compiled(context).
                                then((value) => {
                                    expect(value).
                                        toBe(context.buang);

                                    expect(context.buang).
                                        toBe(1);

                                    done();
                                })).not.toThrow();
            });
    });