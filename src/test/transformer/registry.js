'use strict';

describe(`Should be able to register and compile "transformer" identifier and 
        handler Function that is used to post process the result value before
        giving it to "intent" of the JOQx expression.`,
    () => {
        var compiler = main;
        var context, finalResult;

        function numberToHex(value) {
            return value.toString(16);
        }

        // register transformer
        compiler.transformer('transformer.registry.test', numberToHex);

        beforeEach(() => {
            finalResult = 'none';

            context = {
                buang: 3,
                inner: {
                    deepInner: 'diko'
                }
            };
        });

        it(`1. Should be able to register "transformer" by calling transformer()
            method with trasformer name String, and handler Function arguments.`,
            () => {
                function testtransformer() {
                    return 'override!';
                }

                expect(() => {
                    compiler.transformer('transformer.registery.test1',
                            testtransformer);
                }).not.toThrow();
                
            });

        it(`2. Should not accept none String transformer "name" argument when
            registering "transformer" using transformer() method.`,
            () => {
                function testtransformer() {
                    return 'override!';
                }

                expect(() => compiler.transformer(null, testtransformer)).toThrow();
                expect(() => compiler.transformer(NaN, testtransformer)).toThrow();
                expect(() => compiler.transformer(56, testtransformer)).toThrow();
                expect(() => compiler.transformer(undefined, testtransformer)).toThrow();
                expect(() => compiler.transformer({}, testtransformer)).toThrow();
            });

        it(`3. Should not accept none Function transformer "handler" argument when
            registering "transformer" using intent() method.`,
            () => {
                expect(() => compiler.transformer('test', null)).toThrow();
                expect(() => compiler.transformer('test', NaN)).toThrow();
                expect(() => compiler.transformer('test', 56)).toThrow();
                expect(() => compiler.transformer('test', undefined)).toThrow();
                expect(() => compiler.transformer('test', {})).toThrow();
            });

        it(`4. Should be able to compile and execute "transformer" handler when
            javascript expression followed by "|>" operator, and "transformer"
            identifier is found accepting javascript expression as
            first parameter.`,
            (done) => {
                var compiled;

                expect(() => compiled = compiler.compile('255 |> transformer.registry.test')).
                    not.toThrow();

                expect(() => compiled(context).
                    then((value) => {
                        expect(value).
                            toBe('ff');
                        done();
                    })).not.toThrow();

            });

        it(`5. Should be able to compile and execute "transformer" handler when
            javascript expression followed by "then" operator, and "transformer"
            identifier is found accepting javascript expression as
            first parameter.`,
            (done) => {
                var compiled;

                expect(() => compiled = compiler.compile('255 then transformer.registry.test')).
                    not.toThrow();

                expect(() => compiled(context).
                    then((value) => {
                        expect(value).
                            toBe('ff');
                        done();
                    })).not.toThrow();

            });

        it(`6. Should be able to compile and execute "transformer" handler when
            javascript expression followed by "->" operator, and "transformer"
            identifier is found accepting javascript expression as
            first parameter.`,
            (done) => {
                var compiled;

                expect(() => compiled = compiler.compile('255 -> transformer.registry.test')).
                    not.toThrow();

                expect(() => compiled(context).
                    then((value) => {
                        expect(value).
                            toBe('ff');
                        done();
                    })).not.toThrow();

            });


        it(`7. Should be able to support accepting Promise argument where
            "transformer" handler only accepts the resolved Promise value to process.`,
            (done) => {
                var compiled;

                context.promise = new Promise((resolve) => {
                                        setTimeout(() => {
                                                resolve(255);
                                            }, 500);
                                    });

                function numberToHex(value) {
                    
                    expect(value).toBe(255);

                    return value.toString(16);
                }
        
                compiler.transformer('transformer.registry.promise.test', numberToHex);


                expect(() => compiled = compiler.compile('promise then transformer.registry.promise.test')).
                    not.toThrow();

                expect(() => compiled(context).
                    then((value) => {
                        expect(value).
                            toBe('ff');
                        done();
                    })).not.toThrow();

            });

            
    });