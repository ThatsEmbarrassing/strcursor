# strcursor

Библиотека, позволяющая вам работать со строками в функциональном стиле.

## Установка

```
npm install strcursor
```

## Тестирование

```
npm run test
```

## Сборка

```
npm run build
```

## Использование

```ts
import { initStringCursor } from "strcursor";

const { createOperator } = initStringCursor({
  text: "какая-то случайная строка",
});

const findByRegex = createOperator(({ text }, regex: RegExp) => {
  return text.match(regex);
});

console.log(findByRegex(/как[а-я\-]+/gim)); // [ 'какая-то' ]
```

С помощью strcursor вы можете создавать операторы и применять их вне зависимости от текущего контекста:

```ts
import { createEmptyOperator, initStringCursor } from "strcursor";

const findByRegex = createEmptyOperator(({ text }, regex: RegExp) => {
  return text.match(regex);
});

const strcursor1 = initStringCursor({ text: "строка1" });
const strcursor2 = initStringCursor({ text: "строка2" });
const strcursor3 = initStringCursor({ text: "Здесь мог быть любой текст" });

// С помощью bind
const boundFindByRegex = strcursor1.bind(findByRegex);
boundFindByRegex(/строка\.*/gim); // [ 'строка1' ]

// С помощью apply
strcursor2.apply(findByRegex, /строка\.*/gim); // [ 'строка2' ]
strcursor3.apply(findByRegex, /строка\.*/gim); // null
```

То же самое можно провернуть и в функциях _createEmptyOperator_ и _createOperator_:

```js
import { initStringCursor } from "strcursor";

const calculateRelative = createEmptyOperator(
  ({ getPosition, clamp }, step: number) => {
    return clamp(getPosition() + step);
  }
);

// createEmptyOperator
// bind
const moveRelative = createEmptyOperator(({ move, bind }, to: number) => {
  const boundCalculateRelative = bind(calculateRelative);
  const position = calculateRelative(to);

  return move(position);
});

// apply
const moveRelative = createEmptyOperator(({ move, apply }, to: number) => {
  const position = apply(calculateRelative, to);

  return move(position);
});

// createOperator
// bind
const { createOperator } = initStringCursor({
  text: "какая-то случайная строка",
});

const moveRelative = createOperator(({ move, bind }, to: number) => {
  const boundCalculateRelative = bind(calculateRelative);
  const position = calculateRelative(to);

  return move(position);
});

// apply
const moveRelative = createOperator(({ move, apply }, to: number) => {
  const position = apply(calculateRelative, to);

  return move(position);
});
```

Кстати, у strcursor уже есть набор готовых операторов, которые вы можете использовать:

```ts
import { initStringCursor } from "strcursor";
import { moveRelative, peekRelative } from "strcursor/operators";

const { apply } = initStringCursor({ text: "какая-то случайная строка" });

apply(moveRelative, 2);
console.log(apply(peekRelative, 2)); // { char: 'я', position: 4, isLastChar: false }
```

## API

### strcursor

<table>
  <caption>Функции</caption>
  <thead>
    <th>Название</th>
    <th>Описание</th>
    <th>Параметры</th>
    <th>Тип параметров</th>
    <th>Описание параметров</th>
    <th>Тип возвращаемого значения</th>
  </thead>
  <tbody>
    <tr>
      <td id="initStringCursor">initStringCursor</td>
      <td>
        Создаёт новый контекст для работы со строкой.
        Возвращает объект с методами для создания операторов и привязывания контекста к ним.
      </td>
      <td><em>options</em></td>
      <td><em><a href="#InitStringCursorProps">InitStringCursorProps</a></em></td>
      <td>Настройки, необходимые для контекста</td>
      <td><em><a href="#IStringCursor">IStringCursor</a></em></td>
    </tr>
    <tr>
      <td id="createEmptyOperator">createEmptyOperator&lt;Args extends [...unknown[]], Result&gt;</td>
      <td>
        Создаёт и возвращает оператор без контекста по умолчанию.
        Для привязывания контекста необходимы методы <a href="#IStringCursor_bind">bind</a> или <a href="#IStringCursor_apply">apply</a>.
      </td>
      <td><em>operator</em></td>
      <td><em>Operator&lt;<a href="#IOperatorContext">IOperatorContext</a>, Args, Result&gt;</em></td>
      <td>
        Колбэк, принимающим первым параметром контекст, а затем произвольные аргументы.
        Возвращает произвольный результат.
      </td>
      <td><em>EmptyOperator&lt;<a href="#IOperatorContext">IOperatorContext</a>, Args, Result&gt;</em</td>
    </tr>
  </tbody>
</table>

<table>
  <caption>Интерфейсы</caption>
  <thead>
    <th>Название</th>
    <th>Описание</th>
    <th>Свойства</th>
    <th>Тип свойства</th>
    <th>Описание свойства</th>
  </thead>
  <tbody>
    <tr>
      <td id="InitStringCursorProps" rowspan="2">InitStringCursorProps</td>
      <td rowspan="2">Настройки для <em><a href="#initStringCursor">initStringCursor</a></em>.</td>
      <td id="InitStringCursorProps_text"><em>text</em></td>
      <td><em>string</em></td>
      <td>Строка, с которой и проводится дальнейшее взаимодейтсвие.</td>
    </tr>
    <tr>
      <td id="InitStringCursorProps_startWith"><em>startWith</em></td>
      <td><em>number</em></td>
      <td>Необязательный параметр. Задаёт начальную позицию в строке. По умолчанию равен 0.</td>
    </tr>
    <tr>
      <td id="IStringCursor" rowspan="3">IStringCursor</td>
      <td rowspan="3">Объект, содержащий в себе методы для работы с контекстом указателя.</td>
      <td><em>createOperator&lt;Args extends [...unknown[]], Result&gt;</em></td>
      <td><em>(operator: Operator&lt;<a href="#IOperatorContext">IOperatorContext</a>, Args, Result&gt;) => BoundOperator&lt;Args, Result&gt;</em></td>
      <td>
        Создаёт и возвращает оператор с привязанным контекстом.
        Работает аналогично функции <em><a href="#createEmptyOperator">createEmptyOperator</a></em>, за исключением того, что контекст уже установлен и методы <em><a href="#IStringCursor_bind">bind</a></em> или <em><a href="#IStringCursor_apply">apply</a></em> не требуются.
      </td>
    </tr>
    <tr>
      <td id="IStringCursor_bind"><em>bind&lt;Args extends [...unknown[]], Result&gt;</em></td>
      <td><em>(emptyOperator: EmptyOperator&lt;<a href="#IOperatorContext">IOperatorContext</a>, Args, Result&gt;) => BoundOperator&lt;Args, Result&gt;</em></td>
      <td>Привязывает к оператору, созданному с помощью <em><a href="#createEmptyOperator">createEmptyOperator</a></em>, текущий контекст указателя и возвращает оператор с контекстом.</td>
    </tr>
    <tr>
      <td id="IStringCursor_apply"><em>apply&lt;Args extends [...unknown[]], Result&gt;</em></td>
      <td><em>(emptyOperator: EmptyOperator&lt;<a href="#IOperatorContext">IOperatorContext</a>, Args, Result&gt;, ...args: Args) => Result</em></td>
      <td>
        Работает аналогично <em><a href="#IStringCursor_bind">bind</a></em>,
        за исключением того, что после привязывания контекста к оператору немедленно его вызывает
        и передаёт произвольные аргументы args. Возвращает результат вызова оператора.
      </td>
    </tr>
    <tr>
      <td id="IOperatorContext" rowspan="9">IOperatorContext</td>
      <td rowspan="9">Объект, содержащий в себе свойства и методы для работы со строкой</td>
      <td><em>text</em></td>
      <td><em>string</em></td>
      <td>Исходная строка, переданная в <em><a href="#InitStringCursorProps">InitStringCursorProps</a></em> в качестве параметра <em><a href="#InitStringCursorProps_text">text</a></em>.</td>
    </tr>
    <tr>
      <td id="initialPosition"><em>initialPosition</em></td>
      <td><em>number</em></td>
      <td>Начальная позиция, переданная в <em><a href="#InitStringCursorProps">InitStringCursorProps</a></em> в качестве параметра <em><a href="#InitStringCursorProps_startWith">startWith</a></em>.</td>
    </tr>
    <tr>
       <td id="lastCharIndex"><em>lastCharIndex</em></td>
       <td><em>number</em></td>
       <td>Индекс последнего символа в строке. Если длина строка меньше либо равна 1, значение будет равно 0.</td>
    </tr>
    <tr>
      <td><em>getPosition</em></td>
      <td><em>() => number</em></td>
      <td>Возвращает текущую позицию указателя в строке. Изначально текущая позиция равна <em><a href="#initialPosition">initialPosition</a></em>.</td>
    </tr>
    <tr>
      <td><em>getChar</em></td>
      <td><em>(by: number) => string</em></td>
      <td>
        Возвращает символ, соответствующий позиции <em>by</em>.
        Если число <em>by</em> выходит за границы промежутка [0; <em><a href="#lastCharIndex">lastCharIndex</a></em>], будет возвращён первый либо последний символ.
      </td>
    </tr>
    <tr>
      <td><em>move</em></td>
      <td><em>(to: number) => number</em></td>
      <td>
        Перемещает указатель на позицию <em>to</em>. Если число <em>to</em> выходит за границы промежутка [0; <em><a href="#lastCharIndex">lastCharIndex</a></em>], указатель будет перемещён на позицию первого либо последнего символа. Возвращает позицию, на которую указатель переместился.
      </td>
    </tr>
    <tr>
      <td><em>clamp</em></td>
      <td><em>(value: number) => number</em></td>
      <td>
        Проверяет, входит ли число <em>value</em> в промежуток [0; <em><a href="#lastCharIndex">lastCharIndex</a></em>].
        Если входит, возвращает исходное число <em>value</em>. Иначе индекс первого либо последнего символа.
      </td>
    </tr>
    <tr>
      <td><em>bind&lt;Args extends [...unknown[]], Result&gt;</em></td>
      <td><em>(emptyOperator: EmptyOperator&lt;<a href="#IOperatorContext">IOperatorContext</a>, Args, Result&gt;): BoundOperator&lt;Args, Result&gt;</em></td>
      <td>Работает аналогично <em><a href="#IStringCursor_bind">bind</a></em>.</td>
    </tr>
    <tr>
      <td><em>apply&lt;Args extends [...unknown[]], Result&gt;</em></td>
      <td><em>(emptyOperator: EmptyOperator&lt;<a href="#IOperatorContext">IOperatorContext</a>, Args, Result&gt;, ...args: Args) => Result</em></td>
      <td>Работает аналогично <em><a href="#IStringCursor_apply">apply</a></em>.</td>
    </tr>
  </tbody>
</table>

### strcursor/operators

<table>
  <caption>Операторы</caption>
  <thead>
    <th>Название</th>
    <th>Описание</th>
    <th>Параметры</th>
    <th>Тип параметра</th>
    <th>Описание параметра</th>
    <th>Тип возвращаемого значения</th>
  </thead>
  <tbody>
    <tr>
      <td>reset</td>
      <td>
        Перемещает указатель на изначальную позицию, указанную в параметре <em><a href="#InitStringCursorProps_startWith">startWith</a></em>.
        Возвращает позицию, на которую был перенесён указатель.
      </td>
      <td colspan="3">-</td>
      <td><em>number</em></td>
    </tr>
    <tr>
      <td>calculateRleative</td>
      <td>
        Принимает относительную позицию(относительно текущей позиции указателя) и высчитывает абсолютную позицию. Может принимать отрицательные значения. Возвращает высчитанную абсолютнную позицию.
        Если высчитанная абсолютная позиция выходит за границы промежутка [0; <em><a href="#lastCharIndex">lastCharIndex</a></em>], будет возвращена позиция первого или последнего символа.
      </td>
      <td><em>step</em></td>
      <td><em>number</em></td>
      <td>Относительная позиция</td>
      <td><em>number</em></td>
    </tr>
    <tr>
      <td>moveRelative</td>
      <td>
        Принимает относительную позицию(относительно текущей позиции указателя) и высчитывает абсолютную позицию. Может принимать отрицательные значения. Перемещает указатель на высчитанную абсолютную позицию.
        Если высчитанная абсолютная позиция выходит за границы промежутка [0; <em><a href="#lastCharIndex">lastCharIndex</a></em>], указатель будет перемещён на позицию первого либо последнего символа. Возвращает позицию, на которую был перемещён указатель.
      </td>
      <td><em>to</em></td>
      <td><em>number</em></td>
      <td>Относительная позиция, на которую необходимо перенести указатель.</td>
      <td><em>number</em></td>
    </tr>
    <tr>
      <td>peekRelative</td>
      <td>
        Принимает относительную позицию(относительно текущей позиции указателя) и высчитывает абсолютную позицию. Может принимать отрицательные значения.
        Возвращает объект с информацией о символе, чья позиция соответствует высчитанной абсолютной позиции.
        Если высчитанная абсолютная позиция выходит за границы промежутка [0; <em><a href="#lastCharIndex">lastCharIndex</a></em>], будет возвращён объект с информацией о первом либо последнем символе.
      </td>
      <td><em>from</em></td>
      <td><em>number</em></td>
      <td>Относительная позиция символа</td>
      <td><em><a href="#CharObject">CharObject</a></em></td>
    </tr>
  </tbody>
</table>

<table>
  <caption>Интерфейсы</caption>
  <thead>
    <th>Название</th>
    <th>Описание</th>
    <th>Свойства</th>
    <th>Тип свойства</th>
    <th>Описание свйоства</th>
  </thead>
  <tbody>
    <tr>
      <td rowspan="3" id="CharObject">CharObject</td>
      <td rowspan="3">
        Объект, являющимся результатом функции <a href="#peekRelative">peekRelative</a>, с информацией о найденном символе.
      </td>
      <td><em>char</em></td>
      <td><em>string</em></td>
      <td>Найденный символ</td>
    </tr>
    <tr>
      <td><em>positiion</em></td>
      <td><em>number</em></td>
      <td>Абсолютная позицияи символа.</td>
    </tr>
    <tr>
      <td><em>isLastChar</em></td>
      <td><em>boolean</em></td>
      <td>Является ли найденный символ последним в строке?</td>
    </tr>
  </tbody>
</table>
