describe('Тестирование опции: indent', function() {

    var html =
            '<div class="a">' +
                '<div class="b">' +
                    '<div class="d"></div>' +
                '</div>' +
                '<div class="c"></div>' +
            '</div>',

        data = [
            [
                ['spaces', 4],

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
                ['spaces'],

                '.a {\n' +
                ' \n' +
                '}\n' +
                ' .b {\n' +
                '  \n' +
                ' }\n' +
                '  .d {\n' +
                '   \n' +
                '  }\n' +
                ' .c {\n' +
                '  \n' +
                ' }'
            ],
            [
                ['spaces', 2],

                '.a {\n' +
                '  \n' +
                '}\n' +
                '  .b {\n' +
                '    \n' +
                '  }\n' +
                '    .d {\n' +
                '      \n' +
                '    }\n' +
                '  .c {\n' +
                '    \n' +
                '  }'
            ],
            [
                ['tabs'],

                '.a {\n' +
                '	\n' +
                '}\n' +
                '	.b {\n' +
                '		\n' +
                '	}\n' +
                '		.d {\n' +
                '			\n' +
                '		}\n' +
                '	.c {\n' +
                '		\n' +
                '	}'
            ],
            [
                ['tabs', 2],

                '.a {\n' +
                '		\n' +
                '}\n' +
                '		.b {\n' +
                '				\n' +
                '		}\n' +
                '				.d {\n' +
                '						\n' +
                '				}\n' +
                '		.c {\n' +
                '				\n' +
                '		}'
            ]
        ];

    it('Без опции', function() {
        expect(new Autoclasscss(html).get()).toBe(data[0][1]);
    });

    it('Перебор возможных вариантов опции', function() {
        data.forEach(function(test) {
            expect(
                new Autoclasscss(html)
                    .indent(test[0][0], test[0][1])
                    .get()
            ).toBe(test[1]);
        });
    });
});