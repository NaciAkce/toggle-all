import { animationExist, selectElements, validateForm } from '~/lib/Helper';
import {
  Config,
  ToggleElement,
  CreateToggle,
  CreateToggleProps,
  EventTypes,
  Target,
  Role,
  Types,
} from '~/types/toggle';

export function CreateTogglesElements(props: CreateToggleProps): CreateToggle {
  switch (props.event.type) {
    case EventTypes.CLICK:
      return BaseToggleElement(props);
    case EventTypes.KEYDOWN:
      return BaseToggleElement(props);

    case EventTypes.ENTER:
    case EventTypes.LEAVE:
      return BaseToggleElement(props);
    default:
      break;
  }
  return null;
}

function BaseToggleElement({
  event: { target },
  config,
}: CreateToggleProps): CreateToggle {
  const item = hasTarget();
  let targetElement: ToggleElement | null = null;
  const eventDecision =
    !item ||
    (item.classList.contains(config.toggleActiveClass) &&
      item.getAttribute(config.dataRole) === Role.TAB)
      ? false
      : true;

  function hasTarget(): HTMLElement {
    return (target as HTMLElement).closest(config.selectorToggle);
  }

  function setElement() {
    if (!item) throw Error('No item ehhjxist');
    targetElement = createTarget({ target: item }, config);
  }

  function toggleElements() {
    if (!item) throw Error('No item exist');
    setElement();

    const toggles = selectElements(
      targetElement.selector,
      config.dataToggle
    ).map(target => createTarget({ target }, config));

    const drops = selectElements(targetElement.selector).map(target =>
      createTarget(
        {
          target,
          type: Types.DROP,
          role: targetElement.role,
          group: targetElement.group,
          selector: targetElement.selector,
        },
        config
      )
    );
    return [...toggles, ...drops];
  }

  return {
    eventDecision,
    targetElement,
    toggleElements,
  };
}

export function createTarget(
  {
    target,
    ...options
  }: Partial<Omit<ToggleElement, 'target'>> & Pick<ToggleElement, 'target'>,
  config: Config
) {
  const selector = target.getAttribute(config.dataToggle) ?? options?.selector;
  const group = target.getAttribute(config.dataGroup) ?? options.group;
  const hasRole =
    (target.getAttribute(config.dataRole) as Role) ??
    options.role ??
    Role.DEFAULT;
  const isActive =
    options.active ?? target.classList.contains(config.toggleActiveClass);
  const valid =
    target.hasAttribute(config.dataValidate) &&
    validateForm(target, config.toggleErrorClass);
  const animate =
    target.hasAttribute(config.dataAnimate) &&
    animationExist(target as Element);

  return {
    target,
    type: options.type ?? Types.TOGGLE,
    selector,
    group,
    role: hasRole,
    active: isActive,
    valid,
    animate,
  };
}
