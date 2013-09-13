describe('Тестирование опции: tag', function() {

    var html =
            '<div class="a">' +
                '<ul class="b">' +
                    '<li class="b-item"></li>' +
                    '<li class="b-item"></li>' +
                '</ul>' +
                '<span class="c"></span>' +
            '</div>',

        data = [
            [
                false,

                '.a {\n' +
                '    \n' +
                '}\n' +
                '    .b {\n' +
                '        \n' +
                '    }\n' +
                '        .b-item {\n' +
                '            \n' +
                '        }\n' +
                '    .c {\n' +
                '        \n' +
                '    }'
            ],
            [
                true,

                'div.a {\n' +
                '    \n' +
                '}\n' +
                '    ul.b {\n' +
                '        \n' +
                '    }\n' +
                '        li.b-item {\n' +
                '            \n' +
                '        }\n' +
                '    span.c {\n' +
                '        \n' +
                '    }'
            ],
            [
                'div',

                'div.a {\n' +
                '    \n' +
                '}\n' +
                '    .b {\n' +
                '        \n' +
                '    }\n' +
                '        .b-item {\n' +
                '            \n' +
                '        }\n' +
                '    .c {\n' +
                '        \n' +
                '    }'
            ],
            [
                ['ul', 'li'],

                '.a {\n' +
                '    \n' +
                '}\n' +
                '    ul.b {\n' +
                '        \n' +
                '    }\n' +
                '        li.b-item {\n' +
                '            \n' +
                '        }\n' +
                '    .c {\n' +
                '        \n' +
                '    }'
            ]
        ];

    it('Без опции', function() {
        expect(new Autoclasscss(html).get()).toBe(data[0][1]);
    });

    it('Перебор возможных вариантов опции', function() {
        data.forEach(function(test) {
            expect(
                new Autoclasscss(html)
                    .tag(test[0])
                    .get()
            ).toBe(test[1]);
        });
    });
});