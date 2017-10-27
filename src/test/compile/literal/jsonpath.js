'use strict';



describe(`Should be able to compile quoted "jsonpath" literal as pointer to
            property of context Object in any depth.`,
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

        it(`1. Should be able to compile "jsonpath" expression and use it to
            access context Object property.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile("@inner.deepInner")).
                    not.toThrow();

                expect(() => compiled(context).
                                then((value) => {
                                    expect(value).toBe(context.inner.deepInner);
                                    expect(value).
                                        toBe("diko");
                                    done();
                                })).not.toThrow();
            });

        it(`2. Should be able to compile "jsonpath" expression and use it to
            assign context Object property in any depth.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile("inner.newInner.value = 5")).
                    not.toThrow();

                expect(() => compiled(context).
                                then((value) => {
                                    expect(value).
                                        toBe(context.inner.newInner.value);
                                    expect(value).
                                        toBe(5);
                                    done();
                                })).not.toThrow();
            });

    });