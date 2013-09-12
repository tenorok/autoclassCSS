$(function() {

    var demo = new Demo($('.area_type_html'), $('.area_type_css'), {
        indentType: $('.opt-indent-type'),
        indentSize: $('.opt-indent-size'),
        ignore: $('.opt-ignore'),
        flat: $('.opt-flat'),
        inner: $('.opt-inner'),
        tag: $('.opt-tag'),
        brace: $('.opt-brace'),
        lineState: $('.opt-line-state'),
        lineSize: $('.opt-line-size')
    }).live();

    demo.htmlVal(
        '<header class="head">\n' +
        '    <a href="/" class="head__logo">\n' +
        '        <img src="img.png" alt="logo" class="head__logo-image">\n' +
        '    </a>\n' +
        '</header>\n' +
        '<nav>\n' +
        '    <ul class="menu">\n' +
        '        <li class="menu__item menu__item_state_active">Index</li>\n' +
        '        <li class="menu__item">\n' +
        '            <a href="/news" class="menu__link">News</a>\n' +
        '        </li>\n' +
        '        <li class="menu__item">\n' +
        '            <a href="/contacts" class="menu__link">Contacts</a>\n' +
        '        </li>\n' +
        '    </ul>\n' +
        '</nav>'
    ).cssVal();

});

/**
 * Объект ссылок на DOM-элементы опций для демонстрационного примера
 * @typedef {Object} Demo~DemoOptions
 * @property {jQuery} indentType - Тип отступов
 * @property {jQuery} indentSize - Размер отступов
 * @property {jQuery} ignore - Игнорируемые классы
 * @property {jQuery} flat - Плоский или вложенный список селекторов
 * @property {jQuery} inner - Отступы внутри фигурных скобок
 * @property {jQuery} tag - Тег в селекторе
 * @property {jQuery} brace - Способ отображения фигурной скобки
 * @property {jQuery} lineState - Отбивать селекторы пустой строкой
 * @property {jQuery} lineSize - Количество строк для отбива
 */

/**
 * Конструктор демонстрационного примера
 * @param {jQuery} htmlArea Область для ввода HTML
 * @param {jQuery} cssArea Область для ввода CSS
 * @param {Demo~DemoOptions} [options] Объект ссылок на опции
 * @constructor
 */
function Demo(htmlArea, cssArea, options) {

    this.autoclasscss = new Autoclasscss();

    this.area = {
        html: htmlArea,
        css: cssArea
    };

    options && (this.opt = {
        indentType: options.indentType,
        indentSize: options.indentSize,
        ignore: options.ignore,
        flat: options.flat,
        inner: options.inner,
        tag: options.tag,
        brace: options.brace,
        lineState: options.lineState,
        lineSize: options.lineSize
    });

    this.editor = ace.edit('html-editable');
    this.editor.setTheme('ace/theme/tomorrow_night_eighties');
    this.editor.getSession().setMode('ace/mode/html');

    this.bindOptionsEvents();
}

Demo.prototype = {

    /**
     * Установить обработку ввода HTML и вывода результата в CSS
     * @returns {this}
     */
    live: function() {
        this.area.html.keyup(this.liveCssVal.bind(this));
        return this;
    },

    /**
     * Установить содержимое области для ввода HTML
     * @param {string} html Содержимое
     * @returns {this}
     */
    setHtmlArea: function(html) {
        this.editor.setValue(html, -1);
        this.editor.focus();
        return this;
    },

    /**
     * Установить содержимое области для ввода CSS
     * @param {string} css Содержимое
     * @returns {this}
     */
    setCssArea: function(css) {
        this.area.css.html(css);
        return this;
    },

    /**
     * Установить/получить значение HTML
     * @param {string} [html] Значение к установке
     * @returns {this|string}
     */
    htmlVal: function(html) {
        if(!html) return this.editor.getValue();

        this.autoclasscss.set(html);
        this.setHtmlArea(html);
        return this;
    },

    /**
     * Получить значение CSS
     * @returns {this}
     */
    cssVal: function() {
        this.setCssArea(this.autoclasscss.get());
        return this;
    },

    /**
     * Получить значение CSS по мере ввода HTML
     * @returns {this}
     */
    liveCssVal: function() {
        this.setCssArea(this.autoclasscss.set(this.htmlVal()).get());
        return this;
    },

    /**
     * Установить события на изменение опций
     * @returns {this}
     */
    bindOptionsEvents: function() {
        this.bindOptions([
            [this.opt.indentType, this.bindIndentType],
            [this.opt.indentSize, this.bindIndentSize],
            [this.opt.ignore, this.bindIgnore, 'keyup'],
            [this.opt.flat, this.bindFlat],
            [this.opt.inner, this.bindInner],
            [this.opt.tag, this.bindTag],
            [this.opt.brace, this.bindBrace],
            [this.opt.lineState, this.bindLineState],
            [this.opt.lineSize, this.bindLineSize]
        ]);
        return this;
    },

    /**
     * Массив опций и их колбеков
     * @typedef {Array} Demo~DemoOptionsEvents
     * @property {jQuery} 0 - DOM-элемент опции
     * @property {Function} 1 - Колбек на событие
     * @property {string} [2=change] - Событие на DOM-элементе для выполнения колбека
     */

    /**
     * Установить колбек для каждой опции
     * @param {Demo~DemoOptionsEvents} options Массив опций и их колбеков
     */
    bindOptions: function(options) {
        var that = this;
        options.forEach(function(opt) {
            opt[0].on(opt[2] || 'change', function(event) {
                opt[1].call(that, event);
                that.cssVal();
            });
        });
    },

    bindIndentType: function(event) {
        this.autoclasscss.indent(event.target.value, +this.opt.indentSize.val());
    },

    bindIndentSize: function(event) {
        this.autoclasscss.indent(this.opt.indentType.val(), +event.target.value);
    },

    bindIgnore: function(event) {
        this.autoclasscss.ignore(false).ignore(event.target.value.split(',').map(function(e) { return $.trim(e); }));
    },

    bindFlat: function(event) {
        this.autoclasscss.flat(event.target.checked);
    },

    bindInner: function(event) {
        this.autoclasscss.inner(event.target.checked);
    },

    bindTag: function(event) {
        this.autoclasscss.tag(event.target.checked);
    },

    bindBrace: function(event) {
        this.autoclasscss.brace(event.target.value);
    },

    bindLineState: function(event) {
        var state = event.target.checked;
        this.opt.lineSize.css('visibility', state ? 'visible' : 'hidden');
        this.autoclasscss.line(state, +this.opt.lineSize.val());
    },

    bindLineSize: function(event) {
        this.autoclasscss.line(this.opt.lineState.is(':checked'), +event.target.value);
    }
};