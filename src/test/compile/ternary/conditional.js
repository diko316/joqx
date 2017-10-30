'use strict';


describe(`Should be able to compile ternary conditional expression
        "?" and ":" where expression followed by "?" will be evaluated
        if condition expression before it is truthy. expression after ":"
        will be evaulated if condition expression before "?" is falsy.`,
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

        it(`1. Should be able to evaluate and run expression after "?"
            when condition expression before "?" is truthy.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile("result = 1 - 0 ? 10 : 11")).
                    not.toThrow();

                expect(() => compiled(context).
                                then((value) => {
                                    expect(value).
                                        toBe(context.result);

                                    expect(value).
                                        toBe(10);

                                    done();
                                })).not.toThrow();
            });

        it(`2. Should be able to evaluate and run expression after ":"
            when condition expression before "?" is falsy.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile("result = 1 - 1 ? 10 : 11")).
                    not.toThrow();

                expect(() => compiled(context).
                                then((value) => {
                                    expect(value).
                                        toBe(context.result);

                                    expect(value).
                                        toBe(11);

                                    done();
                                })).not.toThrow();
            });
    });