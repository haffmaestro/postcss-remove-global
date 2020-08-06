var postcss = require('postcss');

var plugin = require('./');

function run(input, output, opts) {
    return postcss([ plugin(opts) ]).process(input)
        .then(result => {
            expect(result.css).toEqual(output);
            expect(result.warnings().length).toBe(0);
        });
}

it('remove :global - as a single selector', () => {
    return run(':global { a{ } }', 'a{ }', { });
});

it('remove :global - as part of selector', () => {
    return run(
        '.root :global .text { margin: 0 6px; }',
        '.root .text { margin: 0 6px; }',
        { });
});

it('remove :global - as part of selector with multiple spaces', () => {
    return run(
        '.root :global  .text { margin: 0 6px; }',
        '.root .text { margin: 0 6px; }',
        { });
});

it('remove :global - as a class modifier', () => {
    return run(
        '.root :global(.text) { margin: 0 6px; }',
        '.root .text { margin: 0 6px; }',
        { });
});

it('remove :global - as a class modifier, multiple', () => {
    return run(
        '.root :global(.text):not(:global(.text-small)) { margin: 0 6px; }',
        '.root .text:not(.text-small) { margin: 0 6px; }',
        { });
});

it('remove :global - as part of @keyframe params', () => {
    return run('@keyframes :global(zoomIn) { }', '@keyframes zoomIn { }', { });
});
