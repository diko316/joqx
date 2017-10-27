'use strict';



describe(`Should be able to compile not "!" unary operator followed by any
    object reference which evaluates to logical negation of it.`,
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

        it(`1. Should be able to evaluate logical negation of the
            reference object.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile("!buang")).
                    not.toThrow();

                expect(() => compiled(context).
                                then((value) => {
                                    expect(value).
                                        toBe(!context.buang);

                                    expect(value).
                                        toBe(false);

                                    done();
                                })).not.toThrow();
            });



    });