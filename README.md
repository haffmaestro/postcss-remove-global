# postcss-remove-global [![Build Status][ci-img]][ci]

[PostCSS] plugin to remove :global identifier from your stylesheet files.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/princetoad/postcss-remove-global.svg
[ci]:      https://travis-ci.org/princetoad/postcss-remove-global

## Examples

1. Remove :global as a single selector
```css
:global {
    a { }
}
```

```css
a { }
```

2. Remove :global as part of a selecotr
```css
.root :global .text { margin: 0 6px; }
```

```css
.root .text { margin: 0 6px; }
```

3. Remove :global as part of params of @keyframe
```css
@keyframes :global(zoomIn) { }
```

```css
@keyframes zoomIn { }
```

## Usage

```js
postcss([ require('postcss-remove-global') ])
```

See [PostCSS] docs for examples for your environment.
