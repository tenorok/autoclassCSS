describe('Тестирование опции: line', function() {

    var html =
            '<div class="a">' +
                '<div class="b">' +
                    '<div class="d"></div>' +
                    '<div class="e"></div>' +
                '</div>' +
                '<div class="c"></div>' +
            '</div>',

        data = [
            [
                [false],

                '.a {\n' +
                '    \n' +
                '}\n' +
                '    .b {\n' +
                '        \n' +
                '    }\n' +
                '        .d {\n' +
                '            \n' +
                '        }\n' +
                '        .e {\n' +
                '            \n' +
                '        }\n' +
                '    .c {\n' +
                '        \n' +
                '    }'
            ],
            [
                [true],

                '.a {\n' +
                '    \n' +
                '}\n' +
                '\n' +
                '    .b {\n' +
                '        \n' +
                '    }\n' +
                '\n' +
                '        .d {\n' +
                '            \n' +
                '        }\n' +
                '\n' +
                '        .e {\n' +
                '            \n' +
                '        }\n' +
                '\n' +
                '    .c {\n' +
                '        \n' +
                '    }'
            ],
            [
                [true, 3],

                '.a {\n' +
                '    \n' +
                '}\n' +
                '\n' +
                '\n' +
                '\n' +
                '    .b {\n' +
                '        \n' +
                '    }\n' +
                '\n' +
                '\n' +
                '\n' +
                '        .d {\n' +
                '            \n' +
                '        }\n' +
                '\n' +
                '\n' +
                '\n' +
                '        .e {\n' +
                '            \n' +
                '        }\n' +
                '\n' +
                '\n' +
                '\n' +
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
                    .line(test[0][0], test[0][1])
                    .get()
            ).toBe(test[1]);
        });
    });
});