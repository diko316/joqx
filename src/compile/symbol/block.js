'use strict';

import {
            string,
            array
        } from "libcore";

import IdentifierSymbol from "./identifier.js";


class BlockSymbol extends IdentifierSymbol {

    constructor(compiler) {
        super(compiler);
        this.blockStatement = null;
        this.resultIdentifier = null;
    }


    onDeclare() {
        var statement = this.blockStatement;

        statement = statement ? statement.join('') : '';

        this.generateCodeLines([statement + '{ // start of block']);

        super.onDeclare();

        this.generateCodeLines([
            this.getBlockResultCode()
        ]);

        this.generateCodeLines(['} // end of block']);
    }

    getDeclarationValue() {
        return null;
    }

    getBlockResultCode() {
        var list = this.references,
            identifier = this.resultIdentifier,
            len = list.length;
        var symbol, code;

        if (len) {
            symbol = list[len - 1];
            code =  this.id + ' = ' + symbol.id;
        }
        else {
            code = this.id + ' = undefined';
        }
        
        return identifier ? identifier + ' = ' + code : code;
    }

    setStatement(statement) {
        if (string(statement)) {
            statement = [statement];
        }

        if (array(statement)) {
            this.blockStatement = statement;
        }
        return this;
    }

    setResultIdentifier(id) {
        if (string(id)) {
            this.resultIdentifier = id;
        }
        return this;
    }

    
}


export default BlockSymbol;