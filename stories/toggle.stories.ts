import '../dist/styles.css';
import '../dist/toggle.css';
import '../dist/tooltip.css';
import '../dist/nav.css';

import defaultToggle from '../src/templates/simple-dropdown.html';

export default {
  title: 'Toggle/Simple',
  parameters: {},
};

export const Default = (): string => defaultToggle;
