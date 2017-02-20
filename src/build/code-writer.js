const fs = require('fs');
const mkdirp = require('mkdirp');
const _ = require('underscore');

var codeWriter = {

    write: function(model) {

        let code = model.render();
        if (__dirname.substr(__dirname.length - 5) != 'build'){
            throw "bad dir " + __dirname;
        }
        let appDir = __dirname.substring(0, __dirname.length - 5) + 'app';
        let path = appDir + model.filePath();
        mkdirp(path, (e) => {
            if (e) {
                console.log(e);
                return;
            }
            fs.writeFileSync(path + model.fileName(), code);
            console.log(model.fileName() + ' written');
        });

    }

};

module.exports = codeWriter;