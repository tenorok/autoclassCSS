describe('Общие тесты', function() {

    var data = [
        [
            '<div class="a">' +
                '<div class=\'b\'>' +
                    '<div class="d"></div>' +
                '</div>' +
                '<div class="c"></div>' +
            '</div>',

            '.a {\n' +
            '    \n' +
            '}\n' +
            '    .b {\n' +
            '        \n' +
            '    }\n' +
            '        .d {\n' +
            '            \n' +
            '        }\n' +
            '    .c {\n' +
            '        \n' +
            '    }'
        ],
        [
            '<header class="header" data-class="fake">' +
                '<img id="logo" class=" logo">' +
                '<ul class="menu">' +
                    '<li class="  menu__item ">home</li>' +
                    '<li class="">news</li>' +
                    '<li class="menu__item    menu__item_current_yes">projects</li>' +
                    '<li class="menu__item ">contacts</li>' +
                '</ul>' +
            '</header>',

            '.header {\n' +
            '    \n' +
            '}\n' +
            '    .logo {\n' +
            '        \n' +
            '    }\n' +
            '    .menu {\n' +
            '        \n' +
            '    }\n' +
            '        .menu__item {\n' +
            '            \n' +
            '        }\n' +
            '        .menu__item_current_yes {\n' +
            '            \n' +
            '        }'
        ],
        [
            '<!DOCTYPE html>' +
            '<html class="i-ua_js_no">' +
                '<head class="i-ua__head">' +
                    '<meta http-equiv="content-type" content="text/html; charset=utf-8"/>' +
                    '<title class="i-ua__title">Артём Курбатов — tenorok@yandex-team.ru</title>' +
                    '<link rel="shortcut icon" href="favicon.ico"/>' +
                    '<link rel="stylesheet" href="/pages/tenorok/tenorok.css"/>' +
                    '<!--[if lte IE 7]><link rel="stylesheet" href="/pages/tenorok/tenorok.ie.css"/><![endif]-->' +
                    '<script src="/pages/tenorok/tenorok.js"></script>' +
                '</head>' +
                '<body class="b-page__body b-page">' +
                    '<div class="b-card b-card_lang_ru" onclick="return {&quot;b-card&quot;:{}}">' +
                        '<div class="b-info__title">' +
                            '<h1 class="b-info__name">Артём Курбатов</h1>' +
                            '<strong class="b-info__position">Разработчик интерфейсов</strong>' +
                        '</div>' +
                    '</div>' +
                '</body>' +
            '</html>',

            '.i-ua_js_no {\n' +
            '    \n' +
            '}\n' +
            '    .i-ua__head {\n' +
            '        \n' +
            '    }\n' +
            '        .i-ua__title {\n' +
            '            \n' +
            '        }\n' +
            '    .b-page__body {\n' +
            '        \n' +
            '    }\n' +
            '    .b-page {\n' +
            '        \n' +
            '    }\n' +
            '        .b-card {\n' +
            '            \n' +
            '        }\n' +
            '        .b-card_lang_ru {\n' +
            '            \n' +
            '        }\n' +
            '            .b-info__title {\n' +
            '                \n' +
            '            }\n' +
            '                .b-info__name {\n' +
            '                    \n' +
            '                }\n' +
            '                .b-info__position {\n' +
            '                    \n' +
            '                }'
        ]
    ];

    it('Перебор вариантов', function() {
        data.forEach(function(test) {
            expect(new Autoclasscss(test[0]).get()).toBe(test[1]);
        });
    });
});