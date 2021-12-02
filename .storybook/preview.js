import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import Toggle from '../lib/es/index';
import '../dist/styles.css';

export const parameters = {
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
  docs: {
    // Opt-out of inline rendering
    inlineStories: false,
  },
};

window.Toggle = Toggle;

setTimeout(() => {
  Toggle({
    onHover: true,
  });
});

if (module.hot) {
  module.hot.accept(['../lib/es/index.js'], () => {
    Toggle({
      onHover: true,
    });
  });
}
