# strcursor

The library allows to work with strings in functional style.

## Installation

```
npm install strcursor
```

## Testing

```
npm run test
```

## Building

```
npm run build
```

## Usage

```ts
import { initStringCursor } from "strcursor";

const { createOperator } = initStringCursor({
  text: "some-random string",
});

const findByRegex = createOperator(({ text }, regex: RegExp) => {
  return text.match(regex);
});

console.log(findByRegex(/so[a-z\-]/gim)); // [ 'some-random' ]
```

With strcursor you can create operators and use them independently of current context:

```ts
import { createEmptyOperator, initStringCursor } from "strcursor";

const findByRegex = createEmptyOperator(({ text }, regex: RegExp) => {
  return text.match(regex);
});

const strcursor1 = initStringCursor({ text: "string1" });
const strcursor2 = initStringCursor({ text: "string2" });
const strcursor3 = initStringCursor({ text: "There can be any text" });

// With bind
const boundFindByRegex = strcursor1.bind(findByRegex);
boundFindByRegex(/string\.*/gim); // [ 'string1' ]

// With apply
strcursor2.apply(findByRegex, /string\.*/gim); // [ 'string2' ]
strcursor3.apply(findByRegex, /string\.*/gim); // null
```

You can do the same thing in _createEmptyOperator_ and _createOperator_:

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
  text: "some random string",
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

[Кстати, у strcursor уже есть набор готовых операторов, которые вы можете использовать:]: #

By the way, strcursor already has the set of ready-to-use operators that you can use:

```ts
import { initStringCursor } from "strcursor";
import { moveRelative, peekRelative } from "strcursor/operators";

const { apply } = initStringCursor({ text: "somee random string" });

apply(moveRelative, 2);
console.log(apply(peekRelative, 2)); // { char: 'e', position: 4, isLastChar: false }
```

## API

### strcursor

<table>
  <caption>Functions</caption>
  <thead>
    <th>Name</th>
    <th>Description</th>
    <th>Parameters</th>
    <th>Parameter type</th>
    <th>Parameter description</th>
    <th>Return type</th>
  </thead>
  <tbody>
    <tr>
      <td id="initStringCursor">initStringCursor</td>
      <td>
        Creates new context to work with the string.
        Returns the object with methods for creating operators and binding context to them.
      </td>
      <td><em>options</em></td>
      <td><em><a href="#InitStringCursorProps">InitStringCursorProps</a></em></td>
      <td>Settings needed for context</td>
      <td><em><a href="#IStringCursor">IStringCursor</a></em></td>
    </tr>
    <tr>
      <td id="createEmptyOperator">createEmptyOperator&lt;Args extends [...unknown[]], Result&gt;</td>
      <td>
        Creates and returns the operator without the context by default.
        Methods <a href="#IStringCursor_bind">bind</a> or <a href="#IStringCursor_apply">apply</a> are needed for binding the context.
      </td>
      <td><em>operator</em></td>
      <td><em>Operator&lt;<a href="#IOperatorContext">IOperatorContext</a>, Args, Result&gt;</em></td>
      <td>
        The callback that takes the context as the first parameter, followed by arbitrary arguments.
      </td>
      <td><em>EmptyOperator&lt;<a href="#IOperatorContext">IOperatorContext</a>, Args, Result&gt;</em</td>
    </tr>
  </tbody>
</table>

<table>
  <caption>Interfaces</caption>
  <thead>
    <th>Name</th>
    <th>Description</th>
    <th>Properties</th>
    <th>Property type</th>
    <th>Property description</th>
  </thead>
  <tbody>
    <tr>
      <td id="InitStringCursorProps" rowspan="2">InitStringCursorProps</td>
      <td rowspan="2"><em><a href="#initStringCursor">initStringCursor</a></em> options.</td>
      <td id="InitStringCursorProps_text"><em>text</em></td>
      <td><em>string</em></td>
      <td>The string with which further interaction takes place.</td>
    </tr>
    <tr>
      <td id="InitStringCursorProps_startWith"><em>startWith</em></td>
      <td><em>number</em></td>
      <td>Optional parameter. Set the initial position in string. By default is 0.</td>
    </tr>
    <tr>
      <td id="IStringCursor" rowspan="3">IStringCursor</td>
      <td rowspan="3">The object containing methods for working with the pointer context.</td>
      <td><em>createOperator&lt;Args extends [...unknown[]], Result&gt;</em></td>
      <td><em>(operator: Operator&lt;<a href="#IOperatorContext">IOperatorContext</a>, Args, Result&gt;) => BoundOperator&lt;Args, Result&gt;</em></td>
      <td>
        Creates and returns the operator with bound context.
        Works similarly to <em><a href="#createEmptyOperator">createEmptyOperator</a></em>, except that the context is already set and the bind and apply methods are not required.
      </td>
    </tr>
    <tr>
      <td id="IStringCursor_bind"><em>bind&lt;Args extends [...unknown[]], Result&gt;</em></td>
      <td><em>(emptyOperator: EmptyOperator&lt;<a href="#IOperatorContext">IOperatorContext</a>, Args, Result&gt;) => BoundOperator&lt;Args, Result&gt;</em></td>
      <td>
      Binds the current pointer context to the operator created with <em><a href="#createEmptyOperator">createEmptyOperator</a></em> and returns the operator with the context.
      </td>
    </tr>
    <tr>
      <td id="IStringCursor_apply"><em>apply&lt;Args extends [...unknown[]], Result&gt;</em></td>
      <td><em>(emptyOperator: EmptyOperator&lt;<a href="#IOperatorContext">IOperatorContext</a>, Args, Result&gt;, ...args: Args) => Result</em></td>
      <td>
        Works similarly to <em><a href="#IStringCursor_bind">bind</a></em>, except that after binding the context to an operator, it immediately calls it and passes arbitrary args arguments. Returns the result of the operator call.
      </td>
    </tr>
    <tr>
      <td id="IOperatorContext" rowspan="9">IOperatorContext</td>
      <td rowspan="9">The object containing properties and methods for working with a string</td>
      <td><em>text</em></td>
      <td><em>string</em></td>
      <td>The original string passed to <em><a href="#InitStringCursorProps">InitStringCursorProps</a></em> as the <em><a href="#InitStringCursorProps_text">text</a></em> parameter.</td>
    </tr>
    <tr>
      <td id="initialPosition"><em>initialPosition</em></td>
      <td><em>number</em></td>
      <td>The starting position passed to <em><a href="#InitStringCursorProps">InitStringCursorProps</a></em> as a parameter to <em><a href="#InitStringCursorProps_startWith">startWith</a></em>.</td>
    </tr>
    <tr>
       <td id="lastCharIndex"><em>lastCharIndex</em></td>
       <td><em>number</em></td>
       <td>The index of the last character in the string. If the length of the string is less than or equal to 1, the value will be 0.</td>
    </tr>
    <tr>
      <td><em>getPosition</em></td>
      <td><em>() => number</em></td>
      <td>Returns the current pointer position in a string. Initially, the current position is <em><a href="#initialPosition">initialPosition</a></em>.</td>
    </tr>
    <tr>
      <td><em>getChar</em></td>
      <td><em>(by: number) => string</em></td>
      <td>
        Returns the character corresponding to the <em>by</em> position.
        If the number <em>by</em> goes beyond the boundaries of the interval [0; <em><a href="#lastCharIndex">lastCharIndex</a></em>], the first or last character will be returned.
      </td>
    </tr>
    <tr>
      <td><em>move</em></td>
      <td><em>(to: number) => number</em></td>
      <td>
        Moves the cursor to the <em>to</em> position. If the number <em>to</em> goes beyond the boundaries of the interval [0; <em><a href="#lastCharIndex">lastCharIndex</a></em>], the cursor will be moved to the position of the first or last character. Returns the position to which the cursor has moved.
      </td>
    </tr>
    <tr>
      <td><em>clamp</em></td>
      <td><em>(value: number) => number</em></td>
      <td>
        Checks whether the number <em>value</em> is in the range [0; <em><a href="#lastCharIndex">lastCharIndex</a></em>].
        If included, returns the original <em>value</em>. Otherwise, the index of the first or last character.
      </td>
    </tr>
    <tr>
      <td><em>bind&lt;Args extends [...unknown[]], Result&gt;</em></td>
      <td><em>(emptyOperator: EmptyOperator&lt;<a href="#IOperatorContext">IOperatorContext</a>, Args, Result&gt;): BoundOperator&lt;Args, Result&gt;</em></td>
      <td>Works similarly to <em><a href="#IStringCursor_bind">bind</a></em>.</td>
    </tr>
    <tr>
      <td><em>apply&lt;Args extends [...unknown[]], Result&gt;</em></td>
      <td><em>(emptyOperator: EmptyOperator&lt;<a href="#IOperatorContext">IOperatorContext</a>, Args, Result&gt;, ...args: Args) => Result</em></td>
      <td>Works similarly to <em><a href="#IStringCursor_apply">apply</a></em>.</td>
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
        Moves the cursor to the initial position specified in the <em><a href="#InitStringCursorProps_startWith">startWith</a></em> parameter.
        Returns the position to which the cursor was moved.
      </td>
      <td colspan="3">-</td>
      <td><em>number</em></td>
    </tr>
    <tr>
      <td>calculateRleative</td>
      <td>
        Takes a relative position (relative to the current cursor position) and calculates an absolute position. Can take negative values. Returns the calculated absolute position.
        If the calculated absolute position goes beyond the boundaries of the interval [0; <em><a href="#lastCharIndex">lastCharIndex</a></em>], the position of the first or last character will be returned.
      </td>
      <td><em>step</em></td>
      <td><em>number</em></td>
      <td>Relative position</td>
      <td><em>number</em></td>
    </tr>
    <tr>
      <td>moveRelative</td>
      <td>
        Takes a relative position (relative to the current cursor position) and calculates an absolute position. Can take negative values. Moves the cursor to the calculated absolute position.
        If the calculated absolute position goes beyond the boundaries of the interval [0; <em><a href="#lastCharIndex">lastCharIndex</a></em>], the cursor will be moved to the position of the first or last character. Returns the position to which the cursor was moved.
      </td>
      <td><em>to</em></td>
      <td><em>number</em></td>
      <td>The relative position to which the cursor should be moved.</td>
      <td><em>number</em></td>
    </tr>
    <tr>
      <td id="peekRelative">peekRelative</td>
      <td>
        Takes a relative position (relative to the current cursor position) and calculates an absolute position. Can take negative values.
        Returns an object with information about the character whose position matches the calculated absolute position.
        If the calculated absolute position goes beyond the boundaries of the interval [0; <em><a href="#lastCharIndex">lastCharIndex</a></em>], an object with information about the first or last character will be returned.
      </td>
      <td><em>from</em></td>
      <td><em>number</em></td>
      <td>Relative character position</td>
      <td><em><a href="#CharObject">CharObject</a></em></td>
    </tr>
  </tbody>
</table>

<table>
  <caption>Interfaces</caption>
  <thead>
    <th>Name</th>
    <th>Description</th>
    <th>Properties</th>
    <th>Property type</th>
    <th>Property description</th>
  </thead>
  <tbody>
    <tr>
      <td rowspan="3" id="CharObject">CharObject</td>
      <td rowspan="3">
        The object that is the result of the <a href="#peekRelative">peekRelative</a> function, containing information about the character found.
      </td>
      <td><em>char</em></td>
      <td><em>string</em></td>
      <td>Found character</td>
    </tr>
    <tr>
      <td><em>positiion</em></td>
      <td><em>number</em></td>
      <td>Absolute character position</td>
    </tr>
    <tr>
      <td><em>isLastChar</em></td>
      <td><em>boolean</em></td>
      <td>Is the found character the last one in the string?</td>
    </tr>
  </tbody>
</table>
