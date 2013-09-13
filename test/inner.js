describe('Тестирование опции: inner', function() {

    var html =
            '<div class="a">' +
                '<div class="b">' +
                    '<div class="d"></div>' +
                '</div>' +
                '<div class="c"></div>' +
            '</div>',

        data = [
            [
                true,

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
                false,

                '.a {}\n' +
                '    .b {}\n' +
                '        .d {}\n' +
                '    .c {}'
            ]
        ];

    it('Без опции', function() {
        expect(new Autoclasscss(html).get()).toBe(data[0][1]);
    });

    it('Перебор возможных вариантов опции', function() {
        data.forEach(function(test) {
            expect(
                new Autoclasscss(html)
                    .inner(test[0])
                    .get()
            ).toBe(test[1]);
        });
    });
});