const axios = require('axios');
const _ = require('underscore');
const JsCodeModel = require('./jsCodeModel');

axios.get('http://maps.lnu.edu.ua/api/resources/types.json')
    .then(types => {
        let jsCodeModel = new JsCodeModel(types.data);
        jsCodeModel.build();
    })
    .catch(e => {
        console.log(e);
    });
