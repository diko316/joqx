'use strict';



describe(`Should be able to compile binary multiplication "*", division "/",
        and "%" modulo division operator of two numeric operand references.`,
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

        it(`1. Should be able to compute the product of two operands
            with "*" multiplication operator.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile("result = 3 * 7")).
                    not.toThrow();

                expect(() => compiled(context).
                                then((value) => {
                                    expect(value).
                                        toBe(context.result);

                                    expect(value).
                                        toBe(21);

                                    done();
                                })).not.toThrow();
            });

        it(`2. Should be able to compute the quotient of two operands
            with "/" division operator.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile("result = 32 / 8")).
                    not.toThrow();

                expect(() => compiled(context).
                                then((value) => {
                                    expect(value).
                                        toBe(context.result);
                                        
                                    expect(value).
                                        toBe(4);

                                    done();
                                })).not.toThrow();
            });

        it(`3. Should be able to compute the remainder of the division of
            two operands with "%" modulo division operator.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile("result = 8 % 10 - 5")).
                    not.toThrow();

                expect(() => compiled(context).
                                then((value) => {
                                    expect(value).
                                        toBe(context.result);
                                        
                                    expect(value).
                                        toBe(3);

                                    done();
                                })).not.toThrow();
            });
        
        it(`4. Should be able to compute the consecutive multiplication "*",
            division "/", and modulo division "%" operations of first,
            betweens, and last operands.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile("2 * 3 / 4 * -64 % - 7")).
                    not.toThrow();

                expect(() => compiled(context).
                                then((value) => {
                                    expect(value).
                                        toBe(-5);

                                    done();
                                })).not.toThrow();
            });
    });