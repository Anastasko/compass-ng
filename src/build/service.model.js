const _ = require('underscore');
const utils = require('./utils');

class ServiceModel {

    constructor(type){
        this.type = type;
    }

    render() {
        let code = `
import { Injectable } from '@angular/core';
import { ${this.type.typeName} } from '../model/${utils.dashedName(this.type.typeName)}';
import { Service } from "../../common/service.service";

@Injectable()
export class ${this.type.typeName}Service extends Service<${this.type.typeName}> {
    
    getInstance(o: any): ${this.type.typeName} {
        return new ${this.type.typeName}(o);
    }

    prefix() {
        return '/${utils.makeFirstLetterLowerCase(this.type.typeName)}';
    }
    
    getFields(): any[] {
        return ${JSON.stringify(this.type.fields, null, 2)};
    }
    
}`;
        return code;
    }

    filePath(){
        return '/api/service';
    }

    fileName() {
        return `/${utils.dashedName(this.type.typeName)}.service.ts`;
    }

}

module.exports = ServiceModel;