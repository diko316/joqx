'use strict';



describe(`Should be able to compile "typeof" keyword followed by any reference
        that returns the string representation of reference's data type.`,
    () => {
        var compile = main.compile;
        var context;

        function TestClass(value) {
            if (value) {
                this.value = value;
            }
        }

        TestClass.prototype = {
            constructor: TestClass,
            name: 'defaultName',
            value: 'defaultValue'
        };
            

        beforeEach(() => {
            context = {
                buang: 3,
                instance: new TestClass(5),
                Test: TestClass,
                inner: {
                    deepInner: 'diko',
                    InnerTest: TestClass
                }
            };
        });

        it(`1. Should be able to compile "typeof" operator followed by any 
            object reference and returns the data type in string.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile('type = typeof instance')).
                    not.toThrow();

                expect(() => compiled(context).
                                then((value) => {
                                    expect(context.type).
                                        toBe("object");
                                    expect(context.type).
                                        toBe(value);
                                    done();
                                })).not.toThrow();
            });


        it(`2. Should be able to compile "typeof" operator followed by any 
            object reference and returns the data type in string.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile('typeof Test === "function"')).
                    not.toThrow();

                expect(() => compiled(context).
                                then((value) => {
                                    expect(value).toBe(true);
                                    done();
                                })).not.toThrow();
            });

        
    });