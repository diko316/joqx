'use strict';


describe(`Should be able to compile subtraction assignment operator "-="
        and internally evaluate the difference of left identifier and
        result of the right expression after "-=" operator and
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

        it(`1. Should be able to evaluate and reassign difference of the
            the left identifier and right expression after "-="
            operator and reassign the result to the left identifier.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile("buang -= 12")).
                    not.toThrow();

                expect(() => compiled(context).
                                then((value) => {
                                    expect(value).
                                        toBe(context.buang);

                                    expect(context.buang).
                                        toBe(-9);

                                    done();
                                })).not.toThrow();
            });
    });