const _ = require('underscore');
const utils = require('./utils');

class TypeModel {

    constructor(type){
        this.type = type;
    }

    render() {

        let code = `import { Entity } from "../../common/model/entity";
import { UrlResource } from "../../common/model/url-resource";
import { ServiceLocator } from "../../service-locator.service";
import { ${this.type.typeName}Service } from "../service/${utils.dashedName(this.type.typeName)}.service";
${this.createCollectionFieldsTypeImports()}

export class Entity${this.type.typeName} extends Entity {

${this.createFields()}
${this.createConstructor()}
${this.createGetServiceMethod()}
${this.createCollectionsPseudoGetters()}

}`;
        return code;
    }

    createFields() {
        let fields = '';
        _.each(this.type.fields, field => {
          if (field.fieldKind !== 'COLLECTION') {
              fields += `    ${this.declareField(field)}\n`;
            }
        });
        return fields;
    }

    createConstructor() {
        let constr = '    constructor(options: any){\n'
        constr += '        super(options);\n';
        _.each(this.type.fields, field => {
          if (field.fieldKind !== 'COLLECTION') {
            constr += `        ${this.assignField(field)}\n`;
          }
        });
        constr += '    }';
        return constr;
    }

    assignField(field) {
        if (field.fieldType.typeKind == 'ENTITY') {
            return `this.${field.fieldName} = new Entity(options.${field.fieldName});`;
        } if (field.fieldType.typeKind == 'ENTITY') {
            return `this.${field.fieldName} = new UrlResource(options.${field.fieldName});`;
        } else {
            return `this.${field.fieldName} = options.${field.fieldName};`;
        }
    }

    declareField(field) {
        if (field.fieldType.typeKind == 'ENTITY'){
            return `${field.fieldName}: Entity;`;
        } else {
            let primitiveType = 'number';
            if (field.fieldType.primitiveEntityType == 'STRING'){
                primitiveType = 'string';
            } else if (field.fieldType.primitiveEntityType == 'URL_RESOURCE'){
                primitiveType = 'UrlResource';
            }
            return `${field.fieldName}: ${primitiveType};`;
        }
    }

    filePath(){
        return '/api/model';
    }

    fileName() {
        return `/${utils.dashedName('Entity' + this.type.typeName)}.ts`;
    }

  createCollectionFieldsTypeImports() {
    let getters = '';
    _.each(this.type.fields, field => {
      if (field.fieldKind === 'COLLECTION'){
        getters += this.createCollectionFieldsTypeImport(field);
      }
    });
    return getters;
  }

  createCollectionFieldsTypeImport(field) {
    return `import { Entity${field.fieldType.typeName} } from "../model/${utils.dashedName('Entity' + field.fieldType.typeName)}";`;
  }

  createCollectionsPseudoGetters() {
    let getters = '';
    _.each(this.type.fields, field => {
      if (field.fieldKind === 'COLLECTION'){
        getters += this.createCollectionsPseudoGetter(field);
      }
    });
    return getters;
  }

  createCollectionsPseudoGetter(field) {
    return `
    get${utils.makeFirstLetterUpperCase(field.fieldName)}(): Promise<Entity${field.fieldType.typeName}[]> {
        return this.getService().find${utils.makeFirstLetterUpperCase(field.fieldName)}Of(this);
    }`
  }

  createGetServiceMethod(){
      return `
    getService(){
        return ServiceLocator.injector.get(${this.type.typeName}Service);
    }`;
  }

}

module.exports = TypeModel;
