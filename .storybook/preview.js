import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import Toggle from '../lib/es/index';
import '../dist/styles.css';

export const parameters = {
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
  storybookCodePanel: {
    disabled: true,
    allowedExtensions: ['js', 'jsx', 'ts', 'tsx', 'css', 'sass'],
  },
};

Toggle({
  onHover: true,
});

if (module.hot) {
  module.hot.accept(['../lib/es/index.js'], () => {});
}
