'use strict';



describe(`Should be able to compile "this" keyword that contains existing
    context Object`,
    () => {
        var compile = main.compile;
        var context;
            

        beforeEach(() => {
            context = {
                buang: 3,
                inner: {
                    deepInner: 'diko'
                }
            };
        });

        it(`1. Should return property of context Object by accessing property
            identifier with "." access operator`,
            (done) => {
                var compiled;

                expect(() => compiled = compile('this.buang')).
                    not.toThrow();

                expect(() => compiled(context).
                                then((value) => {
                                    expect(value).toBe(3);
                                    done();
                                })).not.toThrow();
            });

        it(`2. Should return deeply nested property of context Object by
            accessing property identifier with "." access operator`,
            (done) => {
                var compiled;

                expect(() => compiled = compile('this.inner.deepInner')).
                    not.toThrow();
                
                expect(() => compiled(context).
                                then((value) => {
                                    expect(value).toBe("diko");
                                    done();
                                })).not.toThrow();
            });

        it(`3. Should not be able to assign any value to "this" keyword`,
            (done) => {
                var failed = false;
                var compiled;

                expect(() => compiled = compile('this = 5')).
                    not.toThrow();
                
                compiled(context).
                    then(null,
                        () => {
                            failed = true;
                        });

                setTimeout(() => {
                    expect(failed).toBe(true);
                    done();
                }, 10);
            });

        it(`4. Should be able to access property of context Object by
            accessing property expression enclosed with "[" and "]"`,
            (done) => {
                var compiled;

                context.accessKeyword = "inner";

                expect(() => compiled = compile('this[accessKeyword].deepInner')).
                    not.toThrow();
                
                expect(() => compiled(context).
                                then((value) => {
                                    expect(value).toBe("diko");
                                    done();
                                })).not.toThrow();
            });

    });