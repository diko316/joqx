'use strict';



describe(`Should be able to compile quoted "string" literal as string constant.`,
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

        it(`1. Should be able to compile single quoted "string" and store it as
            "string" constant.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile("myString = 'test string'")).
                    not.toThrow();

                expect(() => compiled(context).
                                then((value) => {
                                    expect(value).toBe(context.myString);
                                    expect(context.myString).
                                        toBe('test string');
                                    done();
                                })).not.toThrow();
            });

        it(`2. Should be able to compile double quoted "string" and store it as
            "string" constant.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile('myString = "test string"')).
                    not.toThrow();

                expect(() => compiled(context).
                                then((value) => {
                                    expect(value).toBe(context.myString);
                                    expect(context.myString).
                                        toBe('test string');
                                    done();
                                })).not.toThrow();
            });

        it(`3. Should be able to compile utf escaped quoted "string" and
            store it as "string" constant.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile('myString = "test \\u00f1"')).
                    not.toThrow();

                expect(() => compiled(context).
                                then((value) => {
                                    expect(value).toBe(context.myString);
                                    expect(context.myString).
                                        toBe('test ñ');
                                    done();
                                })).not.toThrow();
            });


    });