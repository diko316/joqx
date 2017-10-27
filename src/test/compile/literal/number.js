'use strict';



describe(`Should be able to compile "number" literal as number constant.`,
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

        it(`1. Should be able to compile whole "number" and store it as
            "number" constant.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile('oneHundred = 100')).
                    not.toThrow();

                expect(() => compiled(context).
                                then((value) => {
                                    expect(value).toBe(context.oneHundred);
                                    expect(context.oneHundred).toBe(100);
                                    done();
                                })).not.toThrow();
            });

        it(`2. Should be able to compile floating point "number" and
            store it as "number" constant.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile('oneHundredAndHalf = 100.5')).
                    not.toThrow();

                expect(() => compiled(context).
                                then((value) => {
                                    expect(value).
                                        toBe(context.oneHundredAndHalf);
                                    expect(context.oneHundredAndHalf).
                                        toBe(100.5);
                                    done();
                                })).not.toThrow();
            });

        it(`3. Should be able to compile floating point "number" and
            store it as "number" constant that starts with "." (dot).`,
            (done) => {
                var compiled;

                expect(() => compiled = compile('oneHalf = .5')).
                    not.toThrow();

                expect(() => compiled(context).
                                then((value) => {
                                    expect(value).
                                        toBe(context.oneHalf);
                                    expect(context.oneHalf).
                                        toBe(0.5);
                                    done();
                                })).not.toThrow();
            });

        it(`4. Should be able to compile hex escaped "number" and
            store it as "number" constant where pattern is /0x[0-9a-f]+/i.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile('ninetyNine = 0x63')).
                    not.toThrow();

                expect(() => compiled(context).
                                then((value) => {
                                    expect(value).
                                        toBe(context.ninetyNine);
                                    expect(context.ninetyNine).
                                        toBe(99);
                                    done();
                                })).not.toThrow();
            });

        it(`5. Should be able to compile octal escaped "number" and
            store it as "number" constant where pattern is /0\\[oO][0-7]+/.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile('ninetyNine = 0o143')).
                    not.toThrow();

                expect(() => compiled(context).
                                then((value) => {
                                    expect(value).
                                        toBe(context.ninetyNine);
                                    expect(context.ninetyNine).
                                        toBe(99);
                                    done();
                                })).not.toThrow();
            });

        it(`6. Should be able to compile octal escaped "number" and
            store it as "number" constant where pattern is /0\\[bB][0-1]+/.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile('ninetyNine = 0b1100011')).
                    not.toThrow();

                expect(() => compiled(context).
                                then((value) => {
                                    expect(value).
                                        toBe(context.ninetyNine);
                                    expect(context.ninetyNine).
                                        toBe(99);
                                    done();
                                })).not.toThrow();
            });

        

    });