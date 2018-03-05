const postcss = require('postcss');

const pluginName = 'postcss-remove-global';

module.exports = postcss.plugin(pluginName, () => (root) => {
    // :global in rules
    root.walkRules(rule => {
        // :global as nested selector
        if (rule.selector === ':global') {
            rule.parent.append(...rule.nodes);
            rule.remove();
        } else if (rule.selector.match(/:global(\s+)/)) {
            rule.selector = rule.selector.replace(/:global(\s+)/, '');
        }
    });
    // :global in AtRules
    root.walkAtRules(atRule => {
        const name = atRule.name;
        const params = atRule.params;
        if (name === 'keyframes' && params.match(/:global\((\w+\))/)) {
            atRule.params = params.replace(/:global\((\w+)\)/, '$1');
        }
    });
});
