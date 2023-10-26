# CHANGELOG

## [Unreleased]

- Class operators - you will be able to create operators by wrapping classes with createEmptyOperator and createOperator functions for more complex logic.
- Changing string - there will be created methods in createEmptyOperator and createOperator functions that will help you add, remove or replace symbols from the string.
- Custom store manager - i'm going to create my own store manager that will be used for operator context.
- Plugin support.

## [[0.1.3]](https://github.com/ThatsEmbarrassing/strcursor/releases/tag/0.1.3) - 2023.10.26

### Other

- Small source code improvements.
- Removed unnecessary dependencies.

## [[0.1.2]](https://github.com/ThatsEmbarrassing/strcursor/releases/tag/0.1.2) - 2023.10.21

### Fixes

- Fixed the bug in [getLastTextIndex](src/lib/getLastTextIndex.ts) when the function returned the string length instead of the index of the last char.

### Other

- Added documentation in [Russian](github/docs/readme_ru.md) and [English](github/docs/readme_en.md).
- Added tests (jest).

## [[0.1.1]](https://github.com/ThatsEmbarrassing/strcursor/releases/tag/0.1.1) - 2023.10.19

### Fixes

- Decreased bundle size (32.7 kB -> 18.2 kB).

## [[0.1.0]](https://github.com/ThatsEmbarrassing/strcursor/releases/tag/0.1.0) - 2023.10.19

First pre-release.
