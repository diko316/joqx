'use strict';



describe(`Should be able to compile object access "." operator followed by
    property "identifier" accessing object property reference.`,
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

        it(`1. Should be able to retrieve object property even without using
            jsonpath by tracing JSON path with "." operator.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile("inner.deepInner")).
                    not.toThrow();

                expect(() => compiled(context).
                                then((value) => {
                                    expect(value).
                                        toBe(context.inner.deepInner);

                                    done();
                                })).not.toThrow();
            });

        it(`2. Should be able to retrieve object property even without using
            jsonpath by tracing JSON path with "." operator nested
            in any depth.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile("inner.sulodPajud.naaPa.last")).
                    not.toThrow();

                expect(() => compiled(context).
                                then((value) => {
                                    expect(value).
                                        toBe(context.inner.sulodPajud.naaPa.last);

                                    expect(value).
                                        toBe("yes!");

                                    done();
                                })).not.toThrow();
            });

    });