import { storiesOf, forceReRender } from '@storybook/html';
import Toggle from '../src/index';

document.addEventListener('DOMContentLoaded', Toggle);

storiesOf('Toggle', module)
    .add('Simple Example', () => {
        return `
            <section class="section section__toggle">
                    <div class="py-sm"></div>
                    <div class="simple container">
                        <header>
                            <h2>Simple Dropdowns</h2>
                        </header>
                        <div class="simple__content">
                            <div class="div contaner">
                                <div class="row">
                                    <div class="col-md-4">
                                        <h3>Dropdown</h3>
                                        <div class="dropdown show">
                                            <a class="btn btn-primary dropdown__toggle" href="#" role="button"
                                               id="dropdownMenuLink" data-toggle="#dropdown" aria-haspopup="true"
                                               aria-expanded="false">
                                                Dropdown link
                                            </a>
                                            <div class="dropdown__container" id="dropdown" aria-labelledby="dropdownMenuLink">
                                                <a class="dropdown__item" href="#">Action</a>
                                                <a class="dropdown__item" href="#">Another action</a>
                                                <a class="dropdown__item" href="#">Something else here</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <h3>Tooltip</h3>
                                        <div class="tool-tip__content"><button
                                                    class="tool-tip__toggle btn btn--default btn--round" data-toggle-global
                                                    data-toggle="#tool-tip-dropdown-1" aria-labelledby="Tooltip"><span
                                                      class="i-info"></span></button>
                                            <div class="tool-tip__dropdown" id="tool-tip-dropdown-1">
                                                magni modi exercitationem debitis ducimus assumenda ratione corporis, illum
                                                eius,.
                                                <div>
                                                    <a class="dropdown__toggle" href="#" role="button" id="dropdownMenuLink"
                                                       data-toggle="#dropdown" aria-haspopup="true" aria-labelledby="Tooltip"
                                                       aria-expanded="false">
                                                        open simple dropdown
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-4 simple-menu">
                                        <h3>Menu</h3>
                                        <span class="sr-only" id="toggle-btn">Toggle Navigation</span>
                                        <button class="dropdown__button" data-toggle="#nav" data-toggle-global
                                                data-toggle-global aria-labelledby="toggle-btn"><span
                                                  class="dropdown__open"></span><span class="dropdown__close"></span></button>
                                        <div id="nav" class="dropdown__container simple-menu--fixed">
                                            <button class="dropdown__button is--active" data-toggle="#nav"
                                                    data-toggle-global><span class="dropdown__close"></span></button>
                                            <ul class="dropdown__list">
                                                <li class="dropdown__item"><a href="#" class="dropdown__link "
                                                       title="Cult &amp; Card"><span class="dropdown__link-text">Item &amp;
                                                            Card</span></a></li>
                                                <li class="dropdown__item"><a href="#" data-toggle="#nav-item-2"
                                                       class="dropdown__link " title="Abos"><span
                                                              class="dropdown__link-text">Item 2</span></a>
                                                    <ul class="dropdown__list dropdown" id="nav-item-2">
                                                        <li class="dropdown__item"><a href="#" class="dropdown__link "
                                                               title="Cult &amp; Card"><span class="dropdown__link-text">Item
                                                                    &amp;
                                                                    Card</span></a></li>
                                                        <li class="dropdown__item"><a href="#" class="dropdown__link "
                                                               title="Abos"><span class="dropdown__link-text">Item 2</span></a>
                                                        </li>
                                                        <li class="dropdown__item"><a href="#" class="dropdown__link "
                                                               title="Weitere Angebote"><span class="dropdown__link-text">Item
                                                                    2</span></a></li>
                                                    </ul>
                                                </li>
                                                <li class="dropdown__item"><a href="#" class="dropdown__link "
                                                       title="Weitere Angebote"><span class="dropdown__link-text">Item
                                                            2</span></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            `;
    })
    .add('Simple Example Grouped', () => {
        return `
        <section class="section section__toggle">
        <div class="py-sm"></div>
        <div class="simple container">
            <header>
                <h2>Simple Dropdowns Grouped</h2>
            </header>
            <div class="simple__content">
                <div class="div contaner">
                    <div class="row">
                        <div class="col-md-4">
                            <h3>Dropdown</h3>
                            <div class="dropdown show">
                                <a class="btn btn-primary dropdown__toggle" href="#" role="button"
                                   id="dropdownMenuLink" data-toggle="#dropdown1" data-toggle-group="group-1"
                                   aria-haspopup="true" aria-expanded="false">
                                    Dropdown link
                                </a>
                                <div class="dropdown__container" id="dropdown1" aria-labelledby="dropdownMenuLink">
                                    <a class="dropdown__item" href="#">Action</a>
                                    <a class="dropdown__item" href="#">Another action</a>
                                    <a class="dropdown__item" href="#">Something else here</a>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <h3>Tooltip</h3>
                            <div class="tool-tip__content"><button
                                        class="tool-tip__toggle btn btn--default btn--round" data-toggle-global
                                        data-toggle-group="group-1" data-toggle="#tool-tip-dropdown-11"
                                        aria-labelledby="Tooltip"><span class="i-info"></span></button>
                                <div class="tool-tip__dropdown" id="tool-tip-dropdown-11">
                                    magni modi exercitationem debitis ducimus assumenda ratione corporis, illum
                                    eius,.
                                    <div>
                                        <a class="dropdown__toggle" href="#" role="button" id="dropdownMenuLink"
                                           data-toggle="#dropdown1" aria-haspopup="true" aria-labelledby="Tooltip"
                                           aria-expanded="false">
                                            open simple dropdown
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 simple-menu">
                            <h3>Menu</h3>
                            <span class="sr-only" id="toggle-btn">Toggle Navigation</span>
                            <button class="dropdown__button" data-toggle-group="group-1" data-toggle="#nav1"
                                    data-toggle-global data-toggle-global aria-labelledby="toggle-btn"><span
                                      class="dropdown__open"></span><span class="dropdown__close"></span></button>
                            <div id="nav1" class="dropdown__container simple-menu--fixed">
                                <button class="dropdown__button is--active" data-toggle="#nav1"
                                        data-toggle-global><span class="dropdown__close"></span></button>
                                <ul class="dropdown__list">
                                    <li class="dropdown__item"><a href="#" class="dropdown__link "
                                           title="Cult &amp; Card"><span class="dropdown__link-text">Cult &amp;
                                                Card</span></a></li>
                                    <li class="dropdown__item"><a href="#" class="dropdown__link "
                                           title="Abos"><span class="dropdown__link-text">Abos</span></a></li>
                                    <li class="dropdown__item"><a href="#" class="dropdown__link "
                                           title="Weitere Angebote"><span class="dropdown__link-text">Weitere
                                                Angebote</span></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
        `;
    })
    .add('Accordion oder', () => {
        return `
        <section class="section section__toggle">
        <div class="accordion container">
            <header>
                <h2>Accordions</h2>
            </header>
            <div class="div contaner">
                <div class="row">
                    <div class="col-md-6">
                        <div class="accordion__content" id="accordion">
                            <div class="accordion__card">
                                <div class="accordion__header" id="headingOne">
                                    <button class="accordion__button is--active" data-toggle="#first-accordion"
                                            data-toggle-role="accordion" aria-controls="first"
                                            aria-expanded="true">Accordion 1 <span
                                              class="accordion__icon"></span></button>
                                </div>
                                <div class="accordion__body is--active" aria-labelledby="headingOne"
                                     id="first-accordion">
                                    <h4 class="accordion__header">heading 1</h4>
                                    <p class="accordion__text">Lorem ipsum, dolor sit amet consectetur adipisicing
                                        elit.
                                        Incidunt
                                        libero ipsum, veniam
                                        magni modi exercitationem debitis ducimus assumenda ratione corporis, illum
                                        eius,
                                        laborum tempore cumque amet id perspiciatis nostrum unde?</p>
                                    <p class="accordion__text">Lorem ipsum dolor sit, amet consectetur adipisicing
                                        elit.
                                        Ipsum,
                                        maiores.</p>
                                </div>
                            </div>
                            <div class="accordion__card">
                                <div class="accordion__header" id="headingTwo">
                                    <button class="accordion__button" data-toggle="#second-accordion"
                                            data-toggle-role="accordion" aria-controls="second"
                                            aria-expanded="true">Accordion 1<span
                                              class="accordion__icon"></span></button>
                                </div>
                                <div class="accordion__body" aria-labelledby="headingTwo" id="second-accordion">
                                    <h4 class="tabs__header">heading 1</h4>
                                    <p class="tabs__text">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                        Laboriosam
                                        officiis voluptas
                                        maiores deserunt ullam aliquam?</p>
                                    <p class="tabs__text">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                        Accusamus,
                                        officia accusantium
                                        quod fuga porro eius animi earum excepturi omnis! Reprehenderit!</p>
                                </div>
                            </div>
                            <div class="accordion__card">
                                <div class="accordion__header" id="headingThree">
                                    <button class="accordion__button" data-toggle="#third-accordion"
                                            data-toggle-group="#accordion" data-toggle-role="accordion"
                                            aria-controls="third" aria-expanded="true">Accordion 1 <span
                                              class="accordion__icon"></span></button>
                                </div>
                                <div class="accordion__body" aria-labelledby="headingThree" id="third-accordion">
                                    <h4 class="accordion__header">heading 2</h4>
                                    <p class="accordion__text">Lorem ipsum dolor sit amet consectetur adipisicing
                                        elit.
                                        Consectetur
                                        odio cum eveniet
                                        excepturi eum provident molestias ad ipsa unde dignissimos illo porro animi
                                        earum
                                        aliquam perspiciatis id omnis, adipisci incidunt. Qui, beatae. Beatae animi
                                        totam
                                        obcaecati at quae, iste facere fuga nemo pariatur esse nihil?</p>
                                    <p class="accordion__text">Lorem ipsum, dolor sit amet consectetur adipisicing
                                        elit.
                                        Doloremque
                                        commodi eos
                                        voluptatem numquam pariatur deleniti repellat fugiat eligendi nulla
                                        molestiae sunt
                                        praesentium vero sequi distinctio error quibusdam maiores natus magnam,
                                        explicabo
                                        hic
                                        sed alias dolores, quis eum! Reprehenderit atque cupiditate dolorum? Saepe,
                                        doloribus
                                        veniam? Nulla!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="accordion__content" id="accordion2">
                            <div class="accordion__card">
                                <div class="accordion__header" id="headingFour">
                                    <button class="accordion__button" data-toggle="#fourth-accordion"
                                            data-toggle-group="#accordion2" data-toggle-role="accordion"
                                            aria-controls="fourth" aria-expanded="true">Accordion 1 Grouped <span
                                              class="accordion__icon"></span></button>
                                </div>
                                <div class="accordion__body" aria-labelledby="headingFour" id="fourth-accordion">
                                    <h4 class="accordion__header">heading 1</h4>
                                    <p class="accordion__text">Lorem ipsum, dolor sit amet consectetur adipisicing
                                        elit.
                                        Incidunt
                                        libero ipsum, veniam
                                        magni modi exercitationem debitis ducimus assumenda ratione corporis, illum
                                        eius,
                                        laborum tempore cumque amet id perspiciatis nostrum unde?</p>
                                    <p class="accordion__text">Lorem ipsum dolor sit, amet consectetur adipisicing
                                        elit.
                                        Ipsum,
                                        maiores.</p>
                                </div>
                            </div>
                            <div class="accordion__card">
                                <div class="accordion__header" id="headingFive">
                                    <button class="accordion__button  is--active" data-toggle="#fifth-accordion"
                                            data-toggle-group="#accordion2" data-toggle-role="accordion"
                                            aria-controls="fifth" aria-expanded="true">Accordion
                                        1 Grouped<span class="accordion__icon"></span></button>
                                </div>
                                <div class="accordion__body  is--active" aria-labelledby="headingFive"
                                     id="fifth-accordion">
                                    <h4 class="tabs__header">heading 1</h4>
                                    <p class="tabs__text">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                        Laboriosam
                                        officiis voluptas
                                        maiores deserunt ullam aliquam?</p>
                                    <p class="tabs__text">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                        Accusamus,
                                        officia accusantium
                                        quod fuga porro eius animi earum excepturi omnis! Reprehenderit!</p>
                                </div>
                            </div>
                            <div class="accordion__card">
                                <div class="accordion__header" id="headingSix">
                                    <button class="accordion__button" data-toggle="#sixth-accordion"
                                            data-toggle-role="accordion" data-toggle-group="#accordion2"
                                            aria-controls="sixth" aria-expanded="true">Accordion 1
                                        Grouped<span class="accordion__icon"></span></button>
                                </div>
                                <div class="accordion__body" aria-labelledby="headingSix" id="sixth-accordion">
                                    <h4 class="accordion__header">heading 2</h4>
                                    <p class="accordion__text">Lorem ipsum dolor sit amet consectetur adipisicing
                                        elit.
                                        Consectetur
                                        odio cum eveniet
                                        excepturi eum provident molestias ad ipsa unde dignissimos illo porro animi
                                        earum
                                        aliquam perspiciatis id omnis, adipisci incidunt. Qui, beatae. Beatae animi
                                        totam
                                        obcaecati at quae, iste facere fuga nemo pariatur esse nihil?</p>
                                    <p class="accordion__text">Lorem ipsum, dolor sit amet consectetur adipisicing
                                        elit.
                                        Doloremque
                                        commodi eos
                                        voluptatem numquam pariatur deleniti repellat fugiat eligendi nulla
                                        molestiae sunt
                                        praesentium vero sequi distinctio error quibusdam maiores natus magnam,
                                        explicabo
                                        hic
                                        sed alias dolores, quis eum! Reprehenderit atque cupiditate dolorum? Saepe,
                                        doloribus
                                        veniam? Nulla!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
        `;
    })
    .add('Tabs', () => {
        return `
        <section class="section section__toggle">
        <div class="tabs container">
            <header>
                <h2>Tabs</h2>
            </header>
            <div class="tabs__content">
                <ul class="tabs__list" id="myTab" role="tablist">
                    <li class="tabs__item">
                        <a class="tabs__link is--active" id="first-tab" data-toggle="#first"
                           data-toggle-group="#myTab" data-toggle-role="tab" href="#first" role="tab"
                           aria-controls="first" aria-selected="true">Home</a>
                    </li>
                    <li class="tabs__item">
                        <a class="tabs__link" id="profile-tab" data-toggle="#second" data-toggle-group="#myTab"
                           data-toggle-role="tab" href="#first" role="tab" aria-controls="first"
                           aria-selected="false">Profile</a>
                    </li>
                    <li class="tabs__item">
                        <a class="tabs__link" id="contact-tab" data-toggle="#third" data-toggle-group="#myTab"
                           data-toggle-role="tab" href="#first" role="tab" aria-controls="first"
                           aria-selected="false">Contact</a>
                    </li>
                </ul>
                <div class="tabs__content">
                    <div class="tabs__body is--active is--show" role="tabpanel" aria-labelledby="first-tab"
                         id="first">
                        <h4 class="tabs__header">Tab heading 1</h4>
                        <p class="tabs__text">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt
                            libero ipsum, veniam
                            magni modi exercitationem debitis ducimus assumenda ratione corporis, illum eius,
                            laborum tempore cumque amet id perspiciatis nostrum unde?</p>
                        <p class="tabs__text">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum,
                            maiores.</p>
                    </div>
                    <div class="tabs__body" role="tabpanel" aria-labelledby="second-tab" id="second">
                        <h4 class="tabs__header">Tab heading 2</h4>
                        <p class="tabs__text">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Consectetur
                            odio cum eveniet
                            excepturi eum provident molestias ad ipsa unde dignissimos illo porro animi earum
                            aliquam perspiciatis id omnis, adipisci incidunt. Qui, beatae. Beatae animi totam
                            obcaecati at quae, iste facere fuga nemo pariatur esse nihil?</p>
                        <p class="tabs__text">Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                            Doloremque
                            commodi eos
                            voluptatem numquam pariatur deleniti repellat fugiat eligendi nulla molestiae sunt
                            praesentium vero sequi distinctio error quibusdam maiores natus magnam, explicabo
                            hic
                            sed alias dolores, quis eum! Reprehenderit atque cupiditate dolorum? Saepe,
                            doloribus
                            veniam? Nulla!</p>
                    </div>
                    <div class="tabs__body" role="tabpanel" aria-labelledby="third-tab" id="third">
                        <h4 class="tabs__header">Tab heading 3</h4>
                        <p class="tabs__text">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Laboriosam
                            officiis voluptas
                            maiores deserunt ullam aliquam?</p>
                        <p class="tabs__text">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Accusamus,
                            officia accusantium
                            quod fuga porro eius animi earum excepturi omnis! Reprehenderit!</p>
                    </div>
                </div>
            </div>
        </div>
        
    </section>
        `;
    });

// Hack to hard reload page
let count = 1;
function runOnInit() {
    console.log('Init');
}
function runOnPageChange() {
    count++;
    if (count > 2) {
        count = 1;
        location.reload();
    }
    Toggle();
}

document.addEventListener(
    'DOMContentLoaded',
    function() {
        runOnInit();
        const callback = function(mutationsList) {
            for (let i = 0, len = mutationsList.length; i < len; i++) {
                if (mutationsList[i].type == 'childList') {
                    runOnPageChange();
                    break;
                }
            }
        };

        const observer = new MutationObserver(callback);
        const config = { childList: true, subtree: false };
        observer.observe(document.getElementById('root'), config);
    },
    false
);
