'use strict';

describe(`Should be able to register and compile "intent" identifier and 
        handler Function that is used to post process the result value
        of the JOQx expression.`,
    () => {
        var compiler = main;
        var context, finalResult;

        function numberToHex(value) {
            return value.toString(16);
        }

        compiler.intent('intent-registry-test', numberToHex);

        beforeEach(() => {
            finalResult = 'none';

            context = {
                buang: 3,
                inner: {
                    deepInner: 'diko'
                }
            };
        });

        it(`1. Should be able to register "intent" by calling intent()
            method with intent name String, and handler Function arguments.`,
            () => {
                function testIntent() {
                    return 'override!';
                }

                expect(() => {
                    compiler.intent('intent-registery-test1', testIntent);
                }).not.toThrow();
                
            });

        it(`2. Should not accept none String intent "name" argument when
            registering "intent" using intent() method.`,
            () => {
                function testIntent() {
                    return 'override!';
                }

                expect(() => compiler.intent(null, testIntent)).toThrow();
                expect(() => compiler.intent(NaN, testIntent)).toThrow();
                expect(() => compiler.intent(56, testIntent)).toThrow();
                expect(() => compiler.intent(undefined, testIntent)).toThrow();
                expect(() => compiler.intent({}, testIntent)).toThrow();
            });

        it(`3. Should not accept none Function intent "handler" argument when
            registering "intent" using intent() method.`,
            () => {
                expect(() => compiler.intent('test', null)).toThrow();
                expect(() => compiler.intent('test', NaN)).toThrow();
                expect(() => compiler.intent('test', 56)).toThrow();
                expect(() => compiler.intent('test', undefined)).toThrow();
                expect(() => compiler.intent('test', {})).toThrow();
            });

        it(`4. Should be able to compile and execute "intent" handler when
            "?" operator is found followed by intent identifier and using
            the last result as first argument of "intent" handler.`,
            (done) => {
                var compiled;

                expect(() => compiled = compiler.compile('?intent-registry-test 255')).
                    not.toThrow();

                expect(() => compiled(context).
                    then((value) => {
                        expect(value).
                            toBe('ff');
                        done();
                    })).not.toThrow();

            });

        it(`5. Should be able to support accepting Promise argument where
            "intent" handler only accepts the resolved Promise value to process.`,
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
        
                compiler.intent('intent-registry-promise-test', numberToHex);


                expect(() => compiled = compiler.compile('?intent-registry-promise-test promise')).
                    not.toThrow();

                expect(() => compiled(context).
                    then((value) => {
                        expect(value).
                            toBe('ff');
                        done();
                    })).not.toThrow();

            });

            
    });