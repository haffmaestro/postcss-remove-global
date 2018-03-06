const postcss = require('postcss');

const pluginName = 'postcss-remove-global';

module.exports = postcss.plugin(pluginName, () => (root) => {
    // :global in rules
    root.walkRules(rule => {
        // :global as nested selector
        const globalReg = /:global(\s+)/;
        if (rule.selector === ':global') {
            rule.parent.append(...rule.nodes);
            rule.remove();
        } else if (rule.selector.match(globalReg)) {
            rule.selector = rule.selector.replace(globalReg, '');
        }
    });
    // :global in AtRules
    root.walkAtRules(atRule => {
        const name = atRule.name;
        const params = atRule.params;
        const globalReg = /:global\((\w+)\)/;
        if (name === 'keyframes' && params.match(globalReg)) {
            atRule.params = params.replace(globalReg, '$1');
        }
    });
});
