'use strict';



describe(`Should be able to compile infix and postfix "++" increment, and
        "--" decrement operator followed by "identifier" or "jsonpath"
        updatable object reference.`,
    () => {
        var compile = main.compile;
        var context;
            

        beforeEach(() => {
            context = {
                buang: 3,
                undefinedNi: undefined,
                inner: {
                    deepInner: 'diko'
                }
            };
        });

        it(`1. Should be able to evaluate infix "++" increment operator and
            increments the referenced object.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile("++buang")).
                    not.toThrow();

                expect(() => compiled(context).
                                then((value) => {
                                    expect(value).
                                        toBe(4);
                                    done();
                                })).not.toThrow();
            });

        it(`2. Should be able to evaluate postfix "++" increment operator that
            stores the current value for the next operation before
            incrementing the referenced object.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile("test = buang++")).
                    not.toThrow();

                expect(() => compiled(context).
                                then((value) => {
                                    expect(value).
                                        toBe(context.test);

                                    expect(value).
                                        toBe(3);

                                    done();
                                })).not.toThrow();
            });


        it(`3. Should return the last value stored before incrementing it when
            using postfix "++" operator.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile("buang++")).
                    not.toThrow();

                expect(() => compiled(context).
                                then((value) => {
                                    expect(value).
                                        toBe(3);
                                    done();
                                })).not.toThrow();
            });

        it(`4. Should be able to evaluate infix "--" decrement operator and
            decrements the referenced object.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile("--buang")).
                    not.toThrow();

                expect(() => compiled(context).
                                then((value) => {
                                    expect(value).
                                        toBe(2);
                                    done();
                                })).not.toThrow();
            });

        it(`5. Should be able to evaluate postfix "--" decrement operator that
            stores the current value for the next operation before
            decrementing the referenced object.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile("test = buang--")).
                    not.toThrow();

                expect(() => compiled(context).
                                then((value) => {
                                    expect(value).
                                        toBe(context.test);

                                    expect(value).
                                        toBe(3);

                                    done();
                                })).not.toThrow();
            });


        it(`6. Should return the last value stored before decrementing it when
            using postfix "--" operator.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile("buang--")).
                    not.toThrow();

                expect(() => compiled(context).
                                then((value) => {
                                    expect(value).
                                        toBe(3);
                                    done();
                                })).not.toThrow();
            });
    });