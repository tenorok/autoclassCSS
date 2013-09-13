describe('Тестирование опции: set', function() {

    var data = [
            [
                '<div class="a">' +
                    '<div class="b">' +
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
                '<div class="a">' +
                    '<div class="b"></div>' +
                '</div>',

                '.a {\n' +
                '    \n' +
                '}\n' +
                '    .b {\n' +
                '        \n' +
                '    }'
            ],
            [
                '<div class="a"></div>',

                '.a {\n' +
                '    \n' +
                '}'
            ]
        ];

    it('Перебор возможных вариантов опции', function() {
        data.forEach(function(test) {
            expect(
                new Autoclasscss()
                    .set(test[0])
                    .get()
            ).toBe(test[1]);
        });
    });
});