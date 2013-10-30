describe('Тестирование на корректное формирование опций', function() {

    it('Без передачи опций', function() {
        var autoclass = new Autoclasscss();
        expect(autoclass.params).toEqual({
            brace: 'default',
            flat: false,
            ignore: [],
            indent: '    ',
            inner: true,
            line: '',
            tag: false
        });
    });

    it('Передача опций в объекте', function() {
        var autoclass = new Autoclasscss({
            brace: 'newline',
            indent: ['tabs', 2],
            tag: true
        });
        expect(autoclass.params).toEqual({
            brace: 'newline',
            flat: false,
            ignore: [],
            indent: '		',
            inner: true,
            line: '',
            tag: true
        });
    });

    it('Передача опций методами', function() {
        var autoclass = new Autoclasscss().brace('newline').indent('tabs', 2).tag(true);
        expect(autoclass.params).toEqual({
            brace: 'newline',
            flat: false,
            ignore: [],
            indent: '		',
            inner: true,
            line: '',
            tag: true
        });
    });
});
