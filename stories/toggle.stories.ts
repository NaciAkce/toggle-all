import '../dist/styles.css';
import '../dist/toggle.css';
import '../dist/tooltip.css';
import '../dist/tabs.css';
import '../dist/accordion.css';
import '../dist/nav.css';

import toggleCss from '!!raw-loader!../src/scss/tabs.scss';
import stylesCss from '!!raw-loader!../src/scss/styles.scss';
import tooltipCss from '!!raw-loader!../src/scss/tooltip.scss';
import navCss from '!!raw-loader!../src/scss/nav.scss';

import defaultToggle from '../src/templates/simple-dropdown.html';
import groupedToggle from '../src/templates/grouped-dropdown.html';
import tabsToggle from '../src/templates/tabs.html';
import accordionsToggle from '../src/templates/accordions.html';
import menuHoverToggle from '../src/templates/menu-hover.html';

export default {
  title: 'Toggle',
  parameters: {
    preview: [
      {
        tab: 'SCSS Dropdown',
        template: toggleCss,
        language: 'css',
      },
      {
        tab: 'SCSS Tooltip',
        template: tooltipCss,
        language: 'css',
      },
      {
        tab: 'SCSS Nav',
        template: navCss,
        language: 'css',
      },
      {
        tab: 'SCSS Global',
        template: stylesCss,
        language: 'css',
      },
    ],
  },
};

export const Default = (): string => defaultToggle;
export const Grouped = (): string => groupedToggle;
export const Tabs = (): string => tabsToggle;
export const Accordions = (): string => accordionsToggle;
export const Menu = (): string => menuHoverToggle;
