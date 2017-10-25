'use strict';



describe(`Should be able to compile "null" keyword literal as
    Null constant Object.`,
    () => {
        var compile = main.compile;
        var context;
            

        beforeEach(() => {
            context = {
                buang: 3,
                NullNi: null,
                inner: {
                    deepInner: 'diko'
                }
            };
        });

        it(`1. Should return be able to set "null" constant to
            context Object property.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile('(buang = null) === null')).
                    not.toThrow();

                expect(() => compiled(context).
                                then((value) => {
                                    expect(value).toBe(true);
                                    done();
                                })).not.toThrow();
            });

        it(`2. Should be able to evaluate "null" constant by
            comparing the property of context Object.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile('NullNi === null')).
                    not.toThrow();
                
                expect(() => compiled(context).
                                then((value) => {
                                    expect(value).toBe(true);
                                    done();
                                })).not.toThrow();
            });

        it(`3. Should be able to compare "null" constants to other objects.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile('true === null ? "yes" : null')).
                    not.toThrow();
                
                expect(() => compiled(context).
                then((value) => {
                    expect(value).toBe(null);
                    done();
                })).not.toThrow();
            });

        

    });