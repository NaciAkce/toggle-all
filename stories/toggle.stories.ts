import '../dist/styles.css';
import '../dist/toggle.css';
import '../dist/tooltip.css';
import '../dist/tabs.css';
import '../dist/accordion.css';
import '../dist/nav.css';

import Toggle from '../lib/es/index';

import toggleCss from '!!raw-loader!../dist/toggle.css';
import tabCss from '!!raw-loader!../dist/tabs.css';
import tooltipCss from '!!raw-loader!../dist/tooltip.css';
import accordionCss from '!!raw-loader!../dist/accordion.css';
import navCss from '!!raw-loader!../dist/nav.css';

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
        tab: 'CSS Dropdown',
        template: toggleCss,
        language: 'css',
      },
      {
        tab: 'CSS Tooltip',
        template: tooltipCss,
        language: 'css',
      },
      {
        tab: 'CSS Nav',
        template: navCss,
        language: 'css',
      },
      {
        tab: 'CSS Tab',
        template: tabCss,
        language: 'css',
      },
      {
        tab: 'CSS Accordion',
        template: accordionCss,
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

setTimeout(() => {
  Toggle({
    onHover: true,
  });
});
