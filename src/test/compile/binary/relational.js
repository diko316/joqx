'use strict';



describe(`Should be able to compile binary relational operations of
        two operands that are compared with "<" or "lt", ">" or "gt",
        "<=" or "lte", ">=" or "gte" operators which
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
            lesser than second operand using "<" operator.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile("result = 2 < 7")).
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

        it(`2. Should store boolean "true" value if first operand is
            lesser than second operand using "lt" operator.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile("result = 2 lt 7")).
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

        it(`3. Should store boolean "false" value if first operand is not
            lesser than second operand using "<" operator.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile("result = 12 < 7")).
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

        it(`4. Should store boolean "false" value if first operand is not
            lesser than second operand using "lt" operator.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile("result = 12 lt 7")).
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
            greater than second operand using ">" operator.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile("result = 7 > 2")).
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

        it(`6. Should store boolean "true" value if first operand is
            greater than second operand using "gt" operator.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile("result = 7 gt 2")).
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

        it(`7. Should store boolean "false" value if first operand is not
            greater than second operand using ">" operator.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile("result = 2 > 7")).
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

        it(`8. Should store boolean "false" value if first operand is not
            greater than second operand using "gt" operator.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile("result = 2 gt 7")).
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
        
        it(`9. Should store boolean "true" value if first operand is
            lesser than or equal to second operand using "<=" operator.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile("result = 7 <= 7")).
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

        it(`10. Should store boolean "true" value if first operand is
            lesser than or equal to second operand using "lte" operator.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile("result = 2 lte 7")).
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

        it(`11. Should store boolean "false" value if first operand is not
            lesser than or equal to second operand using "<=" operator.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile("result = 7 <= 6")).
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

        it(`12. Should store boolean "false" value if first operand is not
            lesser than or equal to second operand using "lte" operator.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile("result = 9 lte 1")).
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

        it(`13. Should store boolean "true" value if first operand is
            greater than or equal to second operand using ">=" operator.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile("result = 7 >= 7")).
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

        it(`14. Should store boolean "true" value if first operand is
            greater than or equal to second operand using "gte" operator.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile("result = 7 gte 4")).
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

        it(`15. Should store boolean "false" value if first operand is not
            greater than or equal to second operand using ">=" operator.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile("result = 5 >= 6")).
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

        it(`16. Should store boolean "false" value if first operand is not
            greater than or equal to second operand using "gte" operator.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile("result = 9 gte 14")).
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