'use strict';



describe(`Should be able to compile "undefined" keyword literal as
    undefined constant.`,
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

        it(`1. Should return be able to set "undefined" constant to
            context Object property.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile('(buang = undefined) === undefined')).
                    not.toThrow();

                expect(() => compiled(context).
                                then((value) => {
                                    expect(value).toBe(true);
                                    done();
                                })).not.toThrow();
            });

        it(`2. Should be able to evaluate "undefined" constant by
            comparing the property of context Object.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile('undefinedNi === undefined')).
                    not.toThrow();
                
                expect(() => compiled(context).
                                then((value) => {
                                    expect(value).toBe(true);
                                    done();
                                })).not.toThrow();
            });

        it(`3. Should be able to compare "undefined" constants to other objects.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile('void(0) === undefined ? "yes" : null')).
                    not.toThrow();
                
                expect(() => compiled(context).
                then((value) => {
                    expect(value).toBe("yes");
                    done();
                })).not.toThrow();
            });

        

    });