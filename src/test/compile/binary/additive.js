'use strict';



describe(`Should be able to compile binary addition "+" and
        subtraction "-" operator of two numeric operand references.`,
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

        it(`1. Should be able to compute the sum of two operands with
            binary "+" addition operator.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile("result = 2 + 7")).
                    not.toThrow();

                expect(() => compiled(context).
                                then((value) => {
                                    expect(value).
                                        toBe(context.result);

                                    expect(value).
                                        toBe(9);

                                    done();
                                })).not.toThrow();
            });

        it(`2. Should be able to compute the difference of two operands with
            binary "-" subtraction operator.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile("result = 2 - 7")).
                    not.toThrow();

                expect(() => compiled(context).
                                then((value) => {
                                    expect(value).
                                        toBe(context.result);
                                        
                                    expect(value).
                                        toBe(-5);

                                    done();
                                })).not.toThrow();
            });
        
        it(`3. Should be able to compute the consecutive addition "+" and
            subtraction "-" of first, betweens, and last operands.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile("2 - 3 + 89 + -64 + - 7")).
                    not.toThrow();

                expect(() => compiled(context).
                                then((value) => {
                                    expect(value).
                                        toBe(17);

                                    done();
                                })).not.toThrow();
            });
    });