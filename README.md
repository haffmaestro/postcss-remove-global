# PostCSS Global Selector [![Build Status][ci-img]][ci]

[PostCSS] plugin to add or remove :global selectors.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/princetoad/postcss-global-selector.svg
[ci]:      https://travis-ci.org/princetoad/postcss-global-selector

```css
:global {
    a { }
}
```

```css
a { }
```

## Usage

```js
postcss([ require('postcss-global-selector') ])
```

See [PostCSS] docs for examples for your environment.
