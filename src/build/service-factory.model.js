const _ = require('underscore');
const utils = require('./utils');

class ServiceFactoryModel {

    constructor(types){
        this.types = types;
    }

    render() {
        let code = `import { Injectable } from '@angular/core';
import {Service} from "../common/service/service.service";
${this.createImports()}
@Injectable()
export class ServiceFactory {
    
    constructor(${this.createAutowiredList()}){}
    
    getService(id: number): Service<any> {
        switch (id) {${this.createSwitchCases()}
        }
    }
    
}`;
        return code;
    }

    filePath(){
        return '/api';
    }

    fileName() {
        return `/service-factory.service.ts`;
    }

    createImports() {
        let imports = '';
        _.each(this.types, type => {
            if (type.typeKind == 'ENTITY'){
                imports += `import {${type.typeName}Service} from './service/${utils.dashedName(type.typeName)}.service'\n`;
            }
        });
        return imports;
    }

    createAutowiredList() {
        let autowired = '';
        _.each(this.types, type => {
            if (type.typeKind == 'ENTITY'){
                autowired += `\n        private ${utils.makeFirstLetterLowerCase(type.typeName)}Service : ${type.typeName}Service,`;
            }
        });
        return autowired.substr(0, autowired.length - 1);
    }

    createSwitchCases() {
        let cases = '';
        _.each(this.types, type => {
            if (type.typeKind == 'ENTITY') {
                cases += `\n            case ${type.id}:
                return this.${utils.makeFirstLetterLowerCase(type.typeName)}Service;`;
            }
        });
        return cases;
    }
}

module.exports = ServiceFactoryModel;
