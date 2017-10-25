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

        // it(`1. Should return property of context Object by accessing property
        //     identifier with "."`,
        //     (done) => {
        //         var compiled;

        //         expect(() => compiled = compile('this.buang')).
        //             not.toThrow();
                
        //         expect(() => compiled(context).
        //                     then((value) => {
        //                         expect(value).toBe(3);
        //                         done();
        //                     })).not.toThrow();
        //     });

        it(`1. Should return property of context Object by accessing property
            identifier with "."`,
            (done) => {
                var compiled;

                expect(() => compiled = compile('this.buang')).
                    not.toThrow();

                compiled(context).
                    then((value) => {
                        expect(value).toBe(3);
                    });

                setTimeout(() => {
                        done();
                    }, 10);
            });

        it(`2. Should return deeply nested property of context Object by
            accessing property identifier with "."`,
            (done) => {
                var compiled;

                expect(() => compiled = compile('this.inner.deepInner')).
                    not.toThrow();
                
                expect(() => compiled(context).
                            then((value) => {
                                expect(value).toBe("diko");
                            })).not.toThrow();

                setTimeout(() => {
                        done();
                    }, 10);
            });

    });