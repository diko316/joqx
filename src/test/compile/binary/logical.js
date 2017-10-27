'use strict';



describe(`Should be able to compile binary logical operations of
        two expressions where "&&" and "and" operators returns the
        second expression if left and right expressions, false otherwise.
        Then "||" and "or" operators returns the first truthy expression
        if one or both of the two expressions is/are truthy,
        false otherwise.`,
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

        it(`1. Should store the value of the seconds expression
            if both left and right expression is truthy using
            "&&" operator.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile("result = 1 && inner.deepInner")).
                    not.toThrow();

                expect(() => compiled(context).
                                then((value) => {
                                    expect(value).
                                        toBe(context.result);

                                    expect(value).
                                        toBe(context.inner.deepInner);
                                    done();

                                })).not.toThrow();
            });

        it(`1. Should store the value of the seconds expression
            if both left and right expression is truthy using
            "and" operator.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile("result = 1 and inner.deepInner")).
                    not.toThrow();

                expect(() => compiled(context).
                                then((value) => {
                                    expect(value).
                                        toBe(context.result);

                                    expect(value).
                                        toBe(context.inner.deepInner);
                                    done();

                                })).not.toThrow();
            });

        it(`3. Should store boolean "false" value if left or
            right expression is falsy using "&&" operator.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile("result = true && 2 > 3")).
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

        it(`4. Should store boolean "false" value if left or
            right expression is falsy using "and" operator.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile("result = true and 2 > 3")).
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

        it(`5. Should store the first found truthy value from both expressions
            using "||" operator.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile("result = 1 || inner.deepInner")).
                    not.toThrow();

                expect(() => compiled(context).
                                then((value) => {
                                    expect(value).
                                        toBe(context.result);

                                    expect(value).
                                        toBe(1);
                                    done();

                                })).not.toThrow();
            });

        it(`5. Should store the first found truthy value from both expressions
            using "or" operator.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile("result = 1 or inner.deepInner")).
                    not.toThrow();

                expect(() => compiled(context).
                                then((value) => {
                                    expect(value).
                                        toBe(context.result);

                                    expect(value).
                                        toBe(1);
                                    done();

                                })).not.toThrow();
            });

        it(`7. Should store boolean "false" value if left and
            right expression is falsy using "||" operator.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile("result = !true || 2 > 3")).
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

        it(`8. Should store boolean "false" value if left and
            right expression is falsy using "or" operator.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile("result = !true or 2 > 3")).
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