'use strict';



describe(`Should be able to inspect if object in first operand is an instance of
        the Function object in second operand using "instanceof" keyword
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

        it(`1. Should be able to store "true" boolean value if object in
            first operand is an instance of Function Object in second operand
            using "instanceof" operator.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile("result = inner.deepInner instanceof TestClass1")).
                    not.toThrow();

                expect(() => compiled(context).
                                then((value) => {
                                    expect(value).
                                        toBe(context.result);

                                    expect(context.inner.deepInner instanceof TestClass).
                                        toBe(value);

                                    done();
                                })).not.toThrow();
            });

        it(`2. Should be able to store "false" boolean value if object in
            first operand is not an instance of Function Object in
            second operand using "instanceof" operator.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile("result = inner.deepInner instanceof TestClass2")).
                    not.toThrow();

                expect(() => compiled(context).
                                then((value) => {
                                    expect(value).
                                        toBe(context.result);

                                    expect(context.inner.deepInner instanceof TestClass2).
                                        toBe(value);

                                    done();
                                })).not.toThrow();
            });
        
    });