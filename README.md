# Toggle

Toggle can handle Dropdowns, Accordions, Menu, Tabs, Tooltips. Can be grouped and supports also on hover also

## Options

```js
 {
    selectorToggle: '[data-toggle]', // Toggle Selector
    selectorGlobal: '[data-toggle-global]', // Close Toggle if click outside
    selectorGroup: '[data-toggle-group]', // Group toggles
    selectorValidate: '[data-toggle-validate]', // Form Validation - Prevent Closing if invalid
    selectorRole: '[data-toggle-role]', // tab, accordion, tooltip,  defsult 
    selectorBack: '[data-toggle-back]', // Close Toggle
    selectorNext: '[data-toggle-next]', // Selects next Sibling. Add to Parent. Use Case  for Nested Multiple driopdowns 
    selectorAnimate: '[data-toggle-animate]', // Animate. Values: default, height
    selectorHover: '[data-toggle-hover]', // Add to direct Parent 
    toggleActiveClass: 'is--active',
    toggleErrorClass: 'is--error',
    toggleCollapseClass: 'is--collapsing', // Class while animating height
    toggleShowClass: 'is--show', // Class for default animation
    onHover: false,
    onnHoverMediaQuery: '(max-width: 992px)', // Disable hover e.g up to 992px
    stopVideo: true,
    callbackOpen: false,
    callbackClose: false,
    callbackToggle: false
}

```

## Example Simple


```html

<div class="dropdown show">
    <a class="btn btn-primary dropdown__toggle" href="#" role="button"
        id="dropdownMenuLink-two" data-toggle="#dropdown1" data-toggle-global
        data-toggle-group="group-1" aria-haspopup="true" aria-expanded="false">
        Dropdown link
    </a>
    <div class="dropdown__container" id="dropdown1"
            aria-labelledby="dropdownMenuLink-two">
        ...
    </div>
</div>

```


## Example

Enable Hover Support

```js
Toggle({
    onHover: true
});
```

```html
    <div class="nav__wrap" data-toggle-next>
         <ul class="nav__list nav__list-0">
            <li class="nav-two__item" data-toggle-hover>
                <a class="nav-two__link" data-toggle=".nav-two__dropdown" data-toggle-group="#nav-two-list-0" href="#">...</a>
                <ul class="nav-two__list  nav-two__dropdown">
                    ...
                </ul>
            </li>
            ...
        </ul>
    </div>
```

## Browser Support

```json
"browserslist": [
    "Chrome >= 72",
    "ChromeAndroid >= 72",
    "Firefox >= 65",
    "iOS >=12",
    "IE >= 11"
],
```
