'use strict';



describe(`Should be able to compile binary exponential "**" operator of
        two numeric operand references.`,
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

        it(`1. Should be able to compute the exponential of two operands
            where first operand is raised to the power of 2nd operand.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile("result = 6 ** 7")).
                    not.toThrow();

                expect(() => compiled(context).
                                then((value) => {
                                    expect(value).
                                        toBe(context.result);
                                    expect(value).
                                        toBe(Math.pow(6, 7));

                                    done();
                                })).not.toThrow();
            });

    });