const _ = require('underscore');
const TypeModel = require('./type.model');
const ServiceModel = require('./service.model');
const ServiceFactoryModel = require('./service-factory.model');

const codeWriter = require('./code-writer');

class JsCodeModel {

    constructor(metaData) {
        this.models = [];
        let types = this.preProcess(metaData);
        _.each(types, type => {
            if (type.typeKind == 'ENTITY') {
                let model = new TypeModel(type);
                let service = new ServiceModel(type);

                this.models.push(model);
                this.models.push(service);
            }
        });
        this.models.push(new ServiceFactoryModel(types));
    }

    preProcess(data) {
        let map = {};
        _.each(data, type => {
            map[type.id] = type;
        });
        _.each(data, type => {
            _.each(type.fields, field => {
                field.fieldType = _.omit(map[field.fieldType.id], ['fields']);
            })
        });
        return data;
    }

    build() {
        _.each(this.models, model => {
            codeWriter.write(model);
        });
    }

}

module.exports = JsCodeModel;