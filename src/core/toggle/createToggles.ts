import { setDataset } from '~/lib/Helper';
import { Config, CreateToggleProps, ToggleElement } from '~/types/toggle';
import { CreateTogglesElements } from './createTogglesElements';
import { toggleEventDecision } from './ToggleEvents';

export function createToggles(
  props: CreateToggleProps
): ToggleElement[] | null {
  const { eventDecision, targetElement, toggleElements } =
    CreateTogglesElements(props);
  const toggle = toggleEventDecision(props);
  console.log('toggle', toggle.makeDecision());
  console.log('toggle', toggle.getToggleElement());
  console.log('toggle decision', toggle.toggleElement, eventDecision);

  if (!eventDecision) return null;

  return toggleElements();
}

export const defaultConfig: Config = {
  selectorToggle: '[data-toggle]',
  selectorGlobal: '[data-toggle-global]',
  selectorGroup: '[data-toggle-group]',
  selectorValidate: '[data-toggle-validate]',
  selectorRole: '[data-toggle-role]',
  selectorAnimate: '[data-toggle-animate]',
  selectorHover: '[data-toggle-hover]',
  toggleActiveClass: 'is--active',
  toggleErrorClass: 'is--error',
  toggleCollapseClass: 'is--collapsing',
  toggleShowClass: 'is--show',
  toggleCurrentClass: 'is--current',
  onHover: false,
  onMediaQuery: '(max-width: 992px)',
  stopVideo: true,
  callbackOpen: null,
  callbackClose: null,
  callbackToggle: null,
  dataToggle: '',
  dataGlobal: '',
  dataAnimate: '',
  dataGroup: '',
  dataHover: '',
  dataRole: '',
  dataValidate: '',
};

export function setConfig(
  defaultConfig: Config,
  userSettings: Partial<Config>
): Config {
  const config = {
    ...defaultConfig,
    ...userSettings,
  };
  config.dataAnimate = setDataset(config.selectorAnimate);
  config.dataGlobal = setDataset(config.selectorGlobal);
  config.dataGroup = setDataset(config.selectorGroup);
  config.dataHover = setDataset(config.selectorHover);
  config.dataRole = setDataset(config.selectorRole);
  config.dataToggle = setDataset(config.selectorToggle);
  config.dataValidate = setDataset(config.selectorValidate);

  return config;
}
