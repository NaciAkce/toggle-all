import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
// import Toggle from '../lib/es/index';
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

// window.Toggle = Toggle;

// Toggle({
//   onHover: true,
// });

// export const decorators = [
//   story => {
//     setTimeout(() => {
//       Toggle({
//         onHover: true,
//       });
//     });
//     return story();
//   },
// ];

// if (module.hot) {
//   console.log('module', module.hot);
//   module.hot.accept(['../lib/es/index.js'], () => {
//     Toggle({
//       onHover: true,
//     });
//   });
// }
