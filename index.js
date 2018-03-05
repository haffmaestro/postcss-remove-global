const postcss = require('postcss');

const pluginName = 'postcss-global-selector';

module.exports = postcss.plugin(pluginName, () => (root) => {
    console.log('root = ', root);
    // :global in rules
    root.walkRules(rule => {
        // console.log('rule = ', rule);
        // :global as nested selector
        if (rule.selector === ':global') {
            // console.log(':global selector found');
            rule.parent.append(...rule.nodes);
            rule.remove();
        } else if (rule.selector.match(/:global(\s+)/)) {
            // console.log(':global selector as part of selector found');
            // console.log('rule.selector = ', rule.selector,
            //     ', rule.selectors = ', rule.selectors);
            rule.selector = rule.selector.replace(/:global(\s+)/, '');
            // console.log('rule.selector after replaced = ', rule.selector);
        }
    });
    // :global in AtRules
    root.walkAtRules(atRule => {
        console.log('at-rule = ', atRule);
        // :global as nested selector
        const name = atRule.name;
        const params = atRule.params;
        if (name === 'keyframes' && params.match(/:global\((\w+\))/)) {
            console.log(':global as part of params in @keyframes found');
            console.log('AtRule.name = ', name,
                ', AtRule.params = ', params);
            atRule.params = params.replace(/:global\((\w+)\)/, '$1');
            console.log('atRule.params after replaced = ', atRule.params);
        }
    });
});
