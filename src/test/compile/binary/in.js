'use strict';



describe(`Should be able to inspect if property from first operand exists
        in Object defined in second operand using "in" keyword
        binary operator.`,
    () => {
        var compile = main.compile;
        var context;

        function TestClass() {

        }
        TestClass.prototype = {
            constructor: TestClass
        };

        function TestClass2() {
            
        }
        TestClass2.prototype = {
            constructor: TestClass2
        };
            

        beforeEach(() => {
            context = {
                buang: 3,
                TestClass1: TestClass,
                TestClass2: TestClass2,
                inner: {
                    deepInner: new TestClass(),
                    sulodPajud: {
                        naaPa: {
                            last: "yes!"
                        }
                    }
                }
            };
        });

        it(`1. Should be able to store "true" boolean value if property defined
            in first operand exists in Object defined in second operand
            using "in" operator.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile("result = 'deepInner' in inner")).
                    not.toThrow();

                expect(() => compiled(context).
                                then((value) => {
                                    expect(value).
                                        toBe(context.result);

                                    expect('deepInner' in context.inner).
                                        toBe(value);

                                    done();
                                })).not.toThrow();
            });

        it(`2. Should be able to store "false" boolean value if property defined
            in first operand do not exist in Object defined in second operand
            using "in" operator.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile("result = 'buang' in inner")).
                    not.toThrow();

                expect(() => compiled(context).
                                then((value) => {
                                    expect(value).
                                        toBe(context.result);

                                    expect("buang" in context.inner).
                                        toBe(value);

                                    done();
                                })).not.toThrow();
            });
        
    });