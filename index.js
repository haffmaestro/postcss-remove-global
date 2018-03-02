const postcss = require('postcss');

const pluginName = 'postcss-global-selector';

module.exports = postcss.plugin(pluginName, () => (root) => {
    root.walkRules(rule => {
        if (rule.selector === ':global') {
            console.log(':global selector found');
            rule.parent.append(...rule.nodes);
            rule.remove();
        }
    });
});
