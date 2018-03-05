var postcss = require('postcss');

var plugin = require('./');

function run(input, output, opts) {
    return postcss([ plugin(opts) ]).process(input)
        .then(result => {
            expect(result.css).toEqual(output);
            expect(result.warnings().length).toBe(0);
        });
}

it('remove :global selector - nested', () => {
    return run(':global { a{ } }', 'a{ }', { });
});

it('remove :global selector - part of selector', () => {
    return run(
        '.root :global .text { margin: 0 6px; }',
        '.root .text { margin: 0 6px; }',
        { });
});

it('remove :global selector - part of selector with multiple spaces', () => {
    return run(
        '.root :global  .text { margin: 0 6px; }',
        '.root .text { margin: 0 6px; }',
        { });
});

it('remove :global selector - @keyframe', () => {
    return run('@keyframes :global(zoomIn) { }', '@keyframes zoomIn { }', { });
});
