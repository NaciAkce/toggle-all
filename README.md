Toggle All can handle Dropdowns, Accordions, Menu, Tabs, Tooltips. Can be grouped and supports also on hover also

## Options

```js
 {
    selectorToggle: '[data-toggle]',
    selectorGlobal: '[data-toggle-global]',
    selectorGroup: '[data-toggle-group]',
    selectorValidate: '[data-toggle-validate]',
    selectorRole: '[data-toggle-role]',
    selectorBack: '[data-toggle-back]',
    selectorNext: '[data-toggle-next]',
    selectorAnimate: '[data-toggle-animate]',
    selectorHover: '[data-toggle-hover]',
    toggleActiveClass: 'is--active',
    toggleErrorClass: 'is--error',
    toggleCollapseClass: 'is--collapsing',
    toggleShowClass: 'is--show',
    onHover: false,
    onnHoverMediaQuery: '(max-width: 992px)',
    stopVideo: true,
    callbackOpen: false,
    callbackClose: false,
    callbackToggle: false
}

```

## Example Simple


```html

HTML

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

 <li class="nav-two__item" data-toggle-hover>
    <a class="nav-two__link" data-toggle=".nav-two__dropdown" data-toggle-group="#nav-two-list-0" href="#">...</a>
    <ul class="nav-two__list  nav-two__dropdown">
      ...
    </ul>
</li>
```

## oxample
Browser Support
```json
"browserslist": [
    "Chrome >= 72",
    "ChromeAndroid >= 72",
    "Firefox >= 65",
    "iOS >=12",
    "IE >= 11"
],
```
