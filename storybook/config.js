import { configure, addDecorator } from '@storybook/html';
import { withOptions } from '@storybook/addon-options';
import packageJson from '../package.json';
// function loadStories() {
//     require('../stories/index.js');
// }

// configure(loadStories, module);

const req = require.context('../stories', true, /.index.js$/);

function loadStories() {
    req.keys().forEach(filename => req(filename));
}
addDecorator(
    withOptions({
        name: 'Toggle',
        url: packageJson.repository.url,
        showAddonPanel: false
    })
);
configure(loadStories, module);

if (module.hot) {
    module.hot.accept(() => configure(loadStories, module));
}
