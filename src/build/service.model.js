const _ = require('underscore');
const utils = require('./utils');

class ServiceModel {

  constructor(type) {
    this.type = type;
  }

  render() {
    let code = `
import { config } from '../../config';
import { Injectable } from '@angular/core';
import { Entity${this.type.typeName} } from '../model/${utils.dashedName('Entity' + this.type.typeName)}';
import { Service } from "../../common/service/service.service";

@Injectable()
export class ${this.type.typeName}Service extends Service<Entity${this.type.typeName}> {
    
    getInstance(o: any): Entity${this.type.typeName} {
        return new Entity${this.type.typeName}(o);
    }

    prefix() {
        return '/${utils.makeFirstLetterLowerCase(this.type.typeName)}';
    }
${this.fetchCollections()}
    getFields(): any[] {
        return ${JSON.stringify(this.type.fields, null, 2)};
    }
    
}`;
    return code;
  }

  fetchCollections() {
    let methods = '';
    _.each(this.type.fields, field => {
      if (field.fieldKind === 'COLLECTION') {
        methods += this.fetchCollection(field);
      }
    });
    return methods;
  }

  fetchCollection(field) {
    return `
    find${utils.makeFirstLetterUpperCase(field.fieldName)}Of(owner: Entity${this.type.typeName}){
        return this.getRequest('/' + owner.id + '/${field.fieldName}');
    }
`;
  }

  filePath() {
    return '/api/service';
  }

  fileName() {
    return `/${utils.dashedName(this.type.typeName)}.service.ts`;
  }


}

module.exports = ServiceModel;
