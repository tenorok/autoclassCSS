describe("A suite", function() {

    var data = [
        [
            '<div class="a">' +
                '<div class="b">' +
                    '<div class="d"></div>' +
                '</div>' +
                '<div class="c"></div>' +
            '</div>',

            '.a {' + '\n' +
            '	' + '\n' +
            '}' + '\n' +
            '	.b {' + '\n' +
            '		' + '\n' +
            '	}' + '\n' +
            '		.d {' + '\n' +
            '			' + '\n' +
            '		}' + '\n' +
            '	.c {' + '\n' +
            '		' + '\n' +
            '	}' + '\n'
        ]
    ];

    it("contains spec with an expectation", function() {
        expect(autoclasscss(data[0][0])).toBe(data[0][1]);
    });
});