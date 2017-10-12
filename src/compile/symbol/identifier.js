'use strict';


import Base from "./native.js";


export default
    class Identifier extends Base {

        constructor(compiler) {
            super(compiler);

            this.references = [];
            this.operators = [];

        }

        // do not declare
        onDeclare () {
        }

        onFinalize() {

            var reference = this.reference,
                directAccess = !reference,
                code = [],
                line = 0;

            // direct access
            if (directAccess) {
                code[line++] = [
                    this.id, ' = ', this.value
                ];
            }
            // access from reference!
            else {






            }


            this.finalizeCode = code;
        }

        onAccess(reference, operator) {
            var refs = this.references,
                index = refs.length;

            // finalize reference if accessed as [reference]
            if (operator === "[]") {
                reference.finalize();
            }
            else {
                operator = '.';
            }

            // queue references
            refs[index] = 
                this.operators[index] = operator;

        }

        access(reference, operator) {

            this.onAccess(reference, operator);

            return this;
        }
        
    }