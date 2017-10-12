'use strict';


import Base from "./base.js";

var INVALID_ACCESS = "Invalid object access in [reference] parameter. ",
    INVALID_ACCESS_NOT_ALLOWED = "Unable to access property. ",
    INVALID_UPDATE_ACCESS_OBJECT = "Invalid Object to update access. ",
    INVALID_ACCESS_UPDATE = "Unable to update access of object. ";

export default
    class Native extends Base {

        constructor(compiler) {
            super(compiler);

            this.autoDeclare = 
                this.allowAccess = true;

            this.finalizeOnAccess = true;

        }

        onAccess() {
            if (this.finalizeOnAccess) {
                this.finalize();
            }
        }

        createUpdateAccessSymbol(from, directAccess) {
            var identifier;

            // pray that runtime can generate string
            this.finalize();

            // create identifier
            identifier = this.compiler.createSymbol(this.id,
                                                    "identifier");
            identifier.symbolAccess = true;
            identifier.directAccess = directAccess;
            identifier.accessParent = from;

            
            return identifier;
            
        }

        access(reference, directAccess) {

            if (!(reference instanceof Base)) {
                throw new Error(INVALID_ACCESS);
            }

            if (!this.allowAccess) {
                throw new Error(INVALID_ACCESS_NOT_ALLOWED);
            }
            
            directAccess = directAccess === true;

            this.onAccess(reference, directAccess);

            // update access
            return reference.updateAccess(this, directAccess);

        }

        updateAccess(from, directAccess) {

            if (!(from instanceof Base)) {
                throw new Error(INVALID_UPDATE_ACCESS_OBJECT);
            }

            if (!this.allowAccessUpdate) {
                throw new Error(INVALID_ACCESS_UPDATE + from.type);
            }

            return this.createUpdateAccessSymbol(from, directAccess);

        }

        assign() {
            throw new Error("Invalid Assignment");
        }
        
    }