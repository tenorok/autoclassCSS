const fs = require('fs'),
    vow = require('vow'),
    Autoclasscss = require('./autoclasscss').Autoclasscss,
    argv = require('optimist')
        .alias('o', 'options')
        .describe('o', 'JSON file with options')
        .alias('s', 'save')
        .describe('s', 'File to save result')
        .argv;

/**
 * Конструктор
 * @param {string} html Путь до HTML-файл
 * @param {string} [options] Путь до файла опций
 * @param {string} [save] Путь до файла для сохранения результата
 * @constructor
 */
function Cli(html, options, save) {
    this.html = html;
    this.options = options;
    this.save = save;
}

Cli.prototype = {

    /**
     * Запустить выполнение
     */
    run: function() {
        var that = this;
        vow.all([this.getHtml(), this.getOptions()]).then(function(result) {

            var html = result[0],
                options = result[1],
                css = new Autoclasscss(html, options).get();

            that._result(css);
        });
    },

    /**
     * Вывести результат
     * @param {string} css Результирующий CSS
     * @private
     */
    _result: function(css) {
        this.save ? this.saveCss(css) : console.log(css);
    },

    /**
     * Сохранить CSS
     * @param {string} css Результирующий CSS
     */
    saveCss: function(css) {
        var that = this;
        fs.writeFile(this.save, css, function(err) {
            if(err) throw err;
            console.log('Saved to ' + that.save);
        });
    },

    /**
     * Получить содержимое целевого HTML-файла
     * @returns {Promise}
     */
    getHtml: function() {
        return this._readFilePromise(this.html);
    },

    /**
     * Получить объект опций
     * @returns {Promise}
     */
    getOptions: function() {
        if(!this.options) return;

        return this._readFilePromise(this.options, function(options) {
            return JSON.parse(options);
        });
    },

    /**
     * Прочитать содержимое файла
     * @param {string} file Путь до файла
     * @param {Function} [modify] Преобразователь полученных данных
     * @returns {Promise}
     * @private
     */
    _readFilePromise: function(file, modify) {

        var promise = vow.promise(),
            that = this;

        fs.readFile(file, { 'encoding': 'utf-8' }, function(err, data) {
            if(err) return promise.reject(err);

            var modifiedData = modify ? modify.call(that, data) : data;
            promise.fulfill(modifiedData);
        });

        return promise;
    }
};

module.exports.run = function() {
    return new Cli(argv._[0], argv.options, argv.save).run();
};
