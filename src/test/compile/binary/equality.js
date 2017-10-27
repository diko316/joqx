'use strict';



describe(`Should be able to compile binary equality operations of
        two operands that are compared with "==" equal, "!=" not equal,
        "===" strict equal, and "!==" strict not equal operators which
        results to boolean true or false.`,
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

        it(`1. Should store boolean "true" value if first operand is
            not strict equal to second operand using "==" operator.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile("result = 1 == true")).
                    not.toThrow();

                expect(() => compiled(context).
                                then((value) => {
                                    expect(value).
                                        toBe(context.result);

                                    expect(value).
                                        toBe(true);
                                    done();

                                })).not.toThrow();
            });

        it(`2. Should store boolean "false" value if first operand is
            not strict not equal to second operand using "==" operator.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile("result = 2 == 3")).
                    not.toThrow();

                expect(() => compiled(context).
                                then((value) => {
                                    expect(value).
                                        toBe(context.result);

                                    expect(value).
                                        toBe(false);
                                    done();

                                })).not.toThrow();
            });

        it(`3. Should store boolean "true" value if first operand is
            strict equal to second operand using "===" operator.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile("result = 3 === 3")).
                    not.toThrow();

                expect(() => compiled(context).
                                then((value) => {
                                    expect(value).
                                        toBe(context.result);

                                    expect(value).
                                        toBe(true);
                                    done();

                                })).not.toThrow();
            });

        it(`4. Should store boolean "false" value if first operand is
            strict not equal to second operand using "===" operator.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile("result = 2 === true")).
                    not.toThrow();

                expect(() => compiled(context).
                                then((value) => {
                                    expect(value).
                                        toBe(context.result);

                                    expect(value).
                                        toBe(false);
                                    done();

                                })).not.toThrow();
            });


        it(`5. Should store boolean "true" value if first operand is
            not strict not equal to second operand using "!=" operator.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile("result = 2 != 8")).
                    not.toThrow();

                expect(() => compiled(context).
                                then((value) => {
                                    expect(value).
                                        toBe(context.result);

                                    expect(value).
                                        toBe(true);
                                    done();

                                })).not.toThrow();
            });

        it(`6. Should store boolean "false" value if first operand is
            not strict equal to second operand using "!=" operator.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile("result = 1 != true")).
                    not.toThrow();

                expect(() => compiled(context).
                                then((value) => {
                                    expect(value).
                                        toBe(context.result);

                                    expect(value).
                                        toBe(false);
                                    done();

                                })).not.toThrow();
            });

        it(`7. Should store boolean "true" value if first operand is
            strict not equal to second operand using "!==" operator.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile("result = 2 !== true")).
                    not.toThrow();

                expect(() => compiled(context).
                                then((value) => {
                                    expect(value).
                                        toBe(context.result);

                                    expect(value).
                                        toBe(true);
                                    done();

                                })).not.toThrow();
            });

        it(`8. Should store boolean "false" value if first operand is
            strict equal to second operand using "!==" operator.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile("result = 2 !== 2")).
                    not.toThrow();

                expect(() => compiled(context).
                                then((value) => {
                                    expect(value).
                                        toBe(context.result);

                                    expect(value).
                                        toBe(false);
                                    done();

                                })).not.toThrow();
            });

        
    });