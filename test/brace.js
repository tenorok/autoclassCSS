describe('Тестирование опции: brace', function() {

    var html =
            '<div class="a">' +
                '<div class="b">' +
                    '<div class="d"></div>' +
                '</div>' +
                '<div class="c"></div>' +
            '</div>',

        data = [
            [
                'default',

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
                'newline',

                '.a\n' +
                '{\n' +
                '    \n' +
                '}\n' +
                '    .b\n' +
                '    {\n' +
                '        \n' +
                '    }\n' +
                '        .d\n' +
                '        {\n' +
                '            \n' +
                '        }\n' +
                '    .c\n' +
                '    {\n' +
                '        \n' +
                '    }'
            ]
        ];

    it('Без опции', function() {
        expect(new Autoclasscss(html).get()).toBe(data[0][1]);
        expect(new Autoclasscss().set(html).get()).toBe(data[0][1]);
    });

    it('Перебор возможных вариантов опции', function() {
        data.forEach(function(test) {
            expect(
                new Autoclasscss(html)
                    .brace(test[0])
                    .get()
            ).toBe(test[1]);

            expect(new Autoclasscss(html, { brace: test[0] }).get()).toBe(test[1]);
        });
    });
});
