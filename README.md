# AutoclassCSS

Инструмент для формирования каркаса из CSS-селекторов на основании полученного HTML по [БЭМ-методологии](http://ru.bem.info/).

Можно использовать [AutoclassCSS онлайн](http://tenorok.github.io/autoclassCSS/).

[Документация](http://tenorok.github.io/autoclassCSS/jsdoc/index.html) на основе JSDoc.

## Использование

### Подключение

Достаточно подключить [один файл](https://github.com/tenorok/autoclassCSS/blob/master/autoclasscss.js).
```html
<script src="autoclasscss.js"></script>
```

### Создание экземпляра

Создание экземпляра без параметров.
```javascript
var autoclass = new Autoclasscss();
```

Можно сразу передать HTML, который следует обработать.
```javascript
var autoclass = new Autoclasscss('<div class"block">...</div>');
```

Дополнительно, конструктор принимает объект опций.
```javascript
var autoclass = new Autoclasscss('<div class"block">...</div>', {
    brace: 'newline',
    ...
    indent: ['tabs', 2]
});
```

Так же, конструктор способен принимать только опции, а обрабатываемый HTML можно указать позже.
```javascript
var autoclass = new Autoclasscss({
    brace: 'newline',
    ...
    indent: ['tabs', 2]
}).set('<div class"block">...</div>');
```

### Получение CSS-каркаса

Для получения результата, достаточно вызвать метод `get()`.
```javascript
var css = new Autoclasscss('<div class"block">...</div>').get();
```

### Опции

#### Стандартные значения

Опции можно указать в виде объекта при создании экземпляра.
```javascript
new Autoclasscss({
    brace: 'default',
    flat: false,
    ignore: false,
    indent: ['spaces', 4],
    inner: true,
    line: false,
    tag: false
});
```

Так же, опции можно изменять с помощью одноимённых методов.
```javascript
new Autoclasscss()
    .brace('default')
    .flat(false)
    .ignore(false)
    .indent('spaces', 4)
    .inner(true)
    .line(false)
    .tag(false);
```

#### Опция `brace`
Способ отображения открывающей скобки.

Значение по умолчанию: `'default'`.

Принимает одно из следующих значений:

* `'default'` — через пробел после селектора
* `'newline'` — на новой строке под селектором

#### Опция `flat`
Установление плоского или вложенного списка селекторов.

Значение по умолчанию: `true`.

Принимает `true` или `false`.

#### Опция `ignore`
Указание игнорируемых классов.

Значение по умолчанию: `false`.

Принимает параметр в разном виде:

* `'class'` — добавить игнорируемый класс
* `['class1', 'class2']` — добавить несколько игнорируемых классов
* `/i\-.+/` — игнорировать классы по регулярному выражению
* `false` — очистить список игнорируемых классов

#### Опция `indent`
Настройка отступов.

Значение по умолчанию: `['spaces', 4]`.

Принимает один или два аргумента:

1. Обязательный, `'tabs'` или `'spaces'` — символ отступа
2. `1` — количество символов в одном отступе

#### Опция `inner`
Добавлять или не добавлять отступы внутри фигурных скобок.

Значение по умолчанию: `true`.

Принимает `true` или `false`.

#### Опция `line`
Отбивка селекторов пустой строкой.

Значение по умолчанию: `false`.

Принимает один или два аргумента:

1. Обязательный, `true` или `false` — отбивать или не отбивать
2. `1` — количество строк для отбива

#### Опция `tag`
Указание тега в селекторе.

Значение по умолчанию: `false`.

Принимает параметр в разном виде:

* `true` или `false` — указывать или не указывать все теги
* `'div'` — указывать тег `div`
* `['ul', 'li']` — указывать теги ul и li

### Методы

#### Метод `set`
Устанавливает HTML-разметку к обработке.

В качестве параметра принимает строку с HTML-разметкой.

#### Метод `get`
Возвращает CSS-каркас на основе заданной HTML-разметки.

## CLI

Получить CSS-каркас из HTML-файла.

    ./bin/autoclasscss index.html

Сфоррмировать CSS-каркас с заданными опциями и сохранить результат в файл.
Файл [опций](#%D0%9E%D0%BF%D1%86%D0%B8%D0%B8) удобно хранить в JSON-формате.
Файл для сохранения результата создастся автоматически.

    ./bin/autoclasscss -o options.json -s save.css index.html

## Разработка

Для разработки требуется [node.js](http://nodejs.org/) и [npm](https://npmjs.org/). В проекте используется пакетный менеджер [bower](https://github.com/bower/bower).

Клиентские тесты написаны на [Jasmine](http://pivotal.github.io/jasmine/), для прогона всех тестов, надо открыть страницу [test/test.html](https://github.com/tenorok/autoclassCSS/blob/master/test/test.html).

### Цели

Установить зависимости.

    make install

Запустить тесты CLI. Написаны на [Mocha](http://visionmedia.github.io/mocha/)

    make test

Сгенерировать документация на основе JSDoc.

    make doc

Обновить gh-pages.

    make gh-pages
