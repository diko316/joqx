'use strict';


describe(`Should be able to compile unary "+" or "-" operator followed by
        "number" and turns it into signed number.`,
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

        it(`1. Should be able to compile positive "+" sign followed by "number"
            and changes the stored number's sign.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile("+ 28")).
                    not.toThrow();

                expect(() => compiled(context).
                                then((value) => {
                                    expect(value).toBe(+28);
                                    done();
                                })).not.toThrow();
            });

        it(`2. Should be able to detect precedence of "+" sign than binary "+"
            operator.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile("-1 + +28")).
                    not.toThrow();

                expect(() => compiled(context).
                                then((value) => {
                                    expect(value).toBe(+27);
                                    done();
                                })).not.toThrow();
            });

        it(`3. Should be able to compile negative "-" sign followed by "number"
            and changes the stored number's sign.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile("-28")).
                    not.toThrow();

                expect(() => compiled(context).
                                then((value) => {
                                    expect(value).toBe(-28);
                                    done();
                                })).not.toThrow();
            });

        it(`4. Should be able to detect precedence of "-" sign than binary "+"
            or "-" operator.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile("-28 - -43")).
                    not.toThrow();

                expect(() => compiled(context).
                                then((value) => {
                                    expect(value).toBe(15);
                                    done();
                                })).not.toThrow();
            });
    });