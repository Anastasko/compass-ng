const _ = require('underscore');
const utils = require('./utils');

class TypeModel {

    constructor(type){
        this.type = type;
    }

    render() {

        let code = `import { Entity } from "../../common/model/entity";
import { UrlResource } from "../../common/model/url-resource";

export class ${this.type.typeName} extends Entity {

${this.createFields()}
${this.createConstructor()}
}`;
        return code;
    }

    createFields() {
        let fields = '';
        _.each(this.type.fields, field => {
            fields += `    ${this.declareField(field)}\n`
        });
        return fields;
    }

    createConstructor() {
        let constr = '    constructor(options: any){\n'
        constr += '        super(options);\n';
        _.each(this.type.fields, field => {
           constr += `        ${this.assignField(field)}\n`;
        });
        constr += '    }\n';
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
        return `/${utils.dashedName(this.type.typeName)}.ts`;
    }

}

module.exports = TypeModel;