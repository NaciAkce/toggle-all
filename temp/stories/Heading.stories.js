import './header.scss';
import { withCssResources } from '@storybook/addon-cssresources';

export default {
  title: 'Example/Headings',
  parameters: {
    cssresources: [
      {
        id: `bluetheme`,
        code: `<style>

body {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  background-color: #ffffff;
  color: #000000;
  font-family: "Open Sans", "Helvetica", Arial, sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.65;
  position: relative;
  text-align: left; }

h1,
h2,
h3,
h4,
h5,
h6 {
  margin-top: 0;
  text-transform: uppercase; }
  h1.ce-headline-center,
  h2.ce-headline-center,
  h3.ce-headline-center,
  h4.ce-headline-center,
  h5.ce-headline-center,
  h6.ce-headline-center {
    text-align: center; }
  h1.ce-headline-right,
  h2.ce-headline-right,
  h3.ce-headline-right,
  h4.ce-headline-right,
  h5.ce-headline-right,
  h6.ce-headline-right {
    text-align: right; }

h2,
h3,
h4,
h5,
h6 {
  font-family: "Open Sans", "Helvetica", Arial, sans-serif;
  line-height: 1.2;
  word-wrap: break-word; }

h1 {
  font-family: "Open Sans", "Helvetica", Arial, sans-serif;
  font-size: 1.625rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 2.5rem;
  word-wrap: break-word; }
  @media (min-width: 768px) {
    h1 {
      font-size: 2rem; } }
  h1 span {
    display: block;
    font-family: "Open Sans", "Helvetica", Arial, sans-serif;
    font-size: 0.875rem;
    font-weight: 400; }

h2 {
  font-size: 1.25rem;
  font-weight: 700; }
  @media (min-width: 992px) {
    h2 {
      font-size: 1.625rem; } }

h3 {
  font-size: 16px;
  font-weight: 600; }
  @media (min-width: 992px) {
    h3 {
      font-size: 1.25rem; } }

h4 {
  font-size: 0.875rem; }

h5 {
  font-size: 0.875rem; }

h6 {
  font-size: 0.875rem; }

.paragraph, p {
  font-size: 16px;
  line-height: 1.65;
  margin-top: 0; }

p.text-center {
  text-align: center; }

p.text-justify {
  text-align: justify; }

p.text-right {
  text-align: right; }

strong {
  font-weight: 700; }

figure {
  margin: 0; }

img {
  display: block;
  height: auto;
  max-width: 100%; }

.image-caption {
  color: #929d9e;
  font-size: 0.875rem;
  margin-top: 0.5rem; }

blockquote {
  padding-left: 20px;
  position: relative; }
  blockquote p {
    font-size: 1.625rem; }
    @media (max-width: 767.98px) {
      blockquote p {
        font-size: 16px; } }
  blockquote::before {
    background-color: #f3e367;
    bottom: 0;
    content: '';
    left: 0;
    position: absolute;
    top: 0;
    width: 6px; }

.footnote {
  font-size: 0.875rem; }

.preformatted, pre {
  background: #929d9e;
  overflow: scroll; }
        </style>`,
        picked: true,
        hideCode: false, // Defaults to false, this enables you to hide the code snippet and only displays the style selector
      },
    ],
  },
  decorators: [withCssResources],
};
export const H1 = () => '<h1>Heading 1</h1>';
export const H2 = () => '<h2>Heading 2</h2>';
export const H3 = () => '<h3>Heading 3</h3>';
export const H4 = () => '<h4>Heading 4</h4>';
export const H5 = () => '<h5>Heading 5</h5>';
export const H6 = () => '<h6>Heading 6</h6>';
