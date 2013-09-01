describe('Тестирование опции: ignore', function() {

    var html =
            '<div class="a i i2">' +
                '<div class="b i2">' +
                    '<div class="i4">' +
                        '<div class="d"></div>' +
                    '</div>' +
                '</div>' +
                '<div class="c i3"></div>' +
            '</div>',

        defaultResult =
            '.a {\n' +
            '    \n' +
            '}\n' +
            '.i {\n' +
            '    \n' +
            '}\n' +
            '.i2 {\n' +
            '    \n' +
            '}\n' +
            '    .b {\n' +
            '        \n' +
            '    }\n' +
            '        .i4 {\n' +
            '            \n' +
            '        }\n' +
            '            .d {\n' +
            '                \n' +
            '            }\n' +
            '    .c {\n' +
            '        \n' +
            '    }\n' +
            '    .i3 {\n' +
            '        \n' +
            '    }',

        data = [
            [
                ['a', 'i'],

                '.a {\n' +
                '    \n' +
                '}\n' +
                '.i2 {\n' +
                '    \n' +
                '}\n' +
                '    .b {\n' +
                '        \n' +
                '    }\n' +
                '        .i4 {\n' +
                '            \n' +
                '        }\n' +
                '            .d {\n' +
                '                \n' +
                '            }\n' +
                '    .c {\n' +
                '        \n' +
                '    }\n' +
                '    .i3 {\n' +
                '        \n' +
                '    }'
            ],
            [
                [
                    ['i', 'i2'],
                    ['i', 'i2', 'i3', 'i4']
                ],

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
            ]
        ];

    it('Без опции', function() {
        expect(new Autoclasscss(html).get()).toBe(defaultResult);
    });

    it('Перебор возможных вариантов опции', function() {
        data.forEach(function(test) {
            expect(
                new Autoclasscss(html)
                    .ignore(test[0][0])
                    .ignore(false)
                    .ignore(test[0][1])
                    .get()
            ).toBe(test[1]);
        });
    });
});