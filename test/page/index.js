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
        this.area.html.val(html);
        return this;
    },

    /**
     * Установить содержимое области для ввода CSS
     * @param {string} css Содержимое
     * @returns {this}
     */
    setCssArea: function(css) {
        this.area.css.val(css);
        return this;
    },

    /**
     * Установить/получить значение HTML
     * @param {string} [html] Значение к установке
     * @returns {this|string}
     */
    htmlVal: function(html) {
        if(!html) return this.area.html.val();

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
        this.opt.indentType.change(this.bindIndentType.bind(this));
        this.opt.indentSize.change(this.bindIndentSize.bind(this));
        this.opt.flat.change(this.bindFlat.bind(this));
        this.opt.inner.change(this.bindInner.bind(this));
        this.opt.tag.change(this.bindTag.bind(this));
        this.opt.brace.change(this.bindBrace.bind(this));
        this.opt.lineState.change(this.bindLineState.bind(this));
        this.opt.lineSize.change(this.bindLineSize.bind(this));
    },

    bindIndentType: function(event) {
        this.autoclasscss.indent(event.target.value, +this.opt.indentSize.val());
        this.cssVal();
    },

    bindIndentSize: function(event) {
        this.autoclasscss.indent(this.opt.indentType.val(), +event.target.value);
        this.cssVal();
    },

    bindFlat: function(event) {
        this.autoclasscss.flat(event.target.checked);
        this.cssVal();
    },

    bindInner: function(event) {
        this.autoclasscss.inner(event.target.checked);
        this.cssVal();
    },

    bindTag: function(event) {
        this.autoclasscss.tag(event.target.checked);
        this.cssVal();
    },

    bindBrace: function(event) {
        this.autoclasscss.brace(event.target.value);
        this.cssVal();
    },

    bindLineState: function(event) {
        var state = event.target.checked;
        this.opt.lineSize.css('visibility', state ? 'visible' : 'hidden');
        this.autoclasscss.line(state, +this.opt.lineSize.val());
        this.cssVal();
    },

    bindLineSize: function(event) {
        this.autoclasscss.line(this.opt.lineState.is(':checked'), +event.target.value);
        this.cssVal();
    }
};