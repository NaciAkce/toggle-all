const $ = element => document.querySelector(element);
const $$ = elements => document.querySelectorAll(elements);
export default class Toggle {
    constructor(config = {}) {
        this.selector = config.selector || '[toggle]';
        this.activeClass = config.activeClass || 'is--active';
        this.toggleGroup = config.toggleGroup || 'toggle-group';
        this.toggles = [].slice.call($$(this.selector));
        if (!toggles) return;

        this.body = $('body');
        this.init();
    }

    init() {
        this.events();
    }

    events() {
        this.toggles.map(item => item.addEventListener('click', this.toggleItem));
    }

    toggleItem(event) {
        event.preventDefault();
        if (event.currentTarget.classList.contains(this.activeClass)) {
            this.close(event.currentTarget);
            return;
        }

        event.currentTarget.hasAttribute(this.toggleGroup) &&
            [...$$([this.toggleGroup])]
                .filter(e => e !== event.currentTarget && e.classList.contains(this.activeClass))
                .forEach(e => this.close(e));

        open(event.currentTarget);
    }

    open(item) {
        item.classList.add(this.activeClass);
        $(item.getAttribute('toggle')).classList.add(this.activeClass);
    }

    close(item) {
        item.classList.remove(this.activeClass);
        $(item.getAttribute('toggle')).classList.remove(this.activeClass);
    }
}
