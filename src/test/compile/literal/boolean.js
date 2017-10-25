'use strict';



describe(`Should be able to compile "true" or "false" literal as
    boolean constant.`,
    () => {
        var compile = main.compile;
        var context;
            

        beforeEach(() => {
            context = {
                buang: 3,
                falseNi: false,
                inner: {
                    deepInner: 'diko'
                }
            };
        });

        it(`1. Should return be able to set boolean "true" or "false" to
            context Object property.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile('(buang = true) === true')).
                    not.toThrow();

                expect(() => compiled(context).
                                then((value) => {
                                    expect(value).toBe(true);
                                    done();
                                })).not.toThrow();
            });

        it(`2. Should be able to evaluate boolean "true" or "false" by
            comparing the property of context Object.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile('falseNi === false')).
                    not.toThrow();
                
                expect(() => compiled(context).
                                then((value) => {
                                    expect(value).toBe(true);
                                    done();
                                })).not.toThrow();
            });

        it(`3. Should be able to compare "true" or "false" constants.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile('true === false ? "yes" : "no"')).
                    not.toThrow();
                
                expect(() => compiled(context).
                then((value) => {
                    expect(value).toBe("no");
                    done();
                })).not.toThrow();
            });

        

    });