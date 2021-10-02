import './header.scss';
import { withCssResources } from '@storybook/addon-cssresources';

export default {
  title: 'Example/Headings',
  parameters: {},
  decorators: [withCssResources],
};
export const H1 = () => '<h1>Heading 1</h1>';
export const H2 = () => '<h2>Heading 2</h2>';
export const H3 = () => '<h3>Heading 3</h3>';
export const H4 = () => '<h4>Heading 4</h4>';
export const H5 = () => '<h5>Heading 5</h5>';
export const H6 = () => '<h6>Heading 6</h6>';
