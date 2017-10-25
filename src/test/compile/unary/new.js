'use strict';



describe(`Should be able to compile "new" keyword that instantiates a Function
        Object into Object.`,
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
                Test: TestClass,
                inner: {
                    deepInner: 'diko',
                    InnerTest: TestClass
                }
            };
        });

        it(`1. Should be able to compile "new" operator followed by identifier
            that internally instantiates an Object from constructor identifier
            without parenthesis.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile('buang = new Test')).
                    not.toThrow();

                expect(() => compiled(context).
                                then((value) => {
                                    expect(value instanceof TestClass).
                                        toBe(true);
                                    done();
                                })).not.toThrow();
            });

        it(`2. Should be able to compile "new" operator followed by identifier
            that internally instantiates an Object from constructor identifier
            with parenthesis and arguments.`,
            (done) => {
                var compiled;

                expect(() => compiled = compile('new Test(2)')).
                    not.toThrow();

                expect(() => compiled(context).
                                then((value) => {
                                    expect(value instanceof TestClass).
                                        toBe(true);
                                    expect(value.value).
                                        toBe(2);
                                    done();
                                })).not.toThrow();
            });
    });