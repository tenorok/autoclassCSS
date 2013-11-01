const assert = require('assert'),
    vow = require('vow'),
    promise = require('./promise');

describe('Выполнение с указанием опций.', function() {

    var defaultResult = promise.readFile(__dirname + '/result/options.css'),
        saveFile = __dirname + '/save.css',
        savePromise = vow.promise();

    it('Вывод в терминал', function(done) {
        vow
            .all([
                promise.exec('bin/autoclasscss -o test/cli/options.json test/cli/html.html'),
                defaultResult
            ])
            .spread(function(result, defaultResult) {
                assert.equal(result, defaultResult);
                done();
            })
            .done();
    });

    it('Сохранение в файл', function(done) {
        vow
            .when(promise.exec('bin/autoclasscss -o test/cli/options.json -s test/cli/save.css test/cli/html.html'))
            .then(function() {
                return promise.readFile(saveFile);
            })
            .then(function(result) {
                return defaultResult.then(function(defaultResult) {
                    assert.equal(result, defaultResult);
                    savePromise.fulfill();
                    done();
                });
            })
            .done();
    });

    after(function(done) {
        vow.all([savePromise, promise.unlink(saveFile)]).then(function() {
            done();
        });
    });

});
