import { storiesOf } from '@storybook/html';
import Toggle from '../src/index';

import '../src/scss/styles.scss';

storiesOf('Toggle', module)
    .add('Simple Example', () => {
        return `
        <section class="section section__toggle">
        <div class="py-sm"></div>
        <div class="container">
            <header>
                <h2>nav Dropdowns</h2>
            </header>
            <div class="nav__content">
                <div class="div contaner">
                    <div class="row">
                        <div class="col-md-4">
                            <h3>Dropdown</h3>
                            <div class="dropdown show">
                                <a class="btn btn-primary dropdown__toggle" href="#" role="button"
                                   id="dropdownMenuLink-one" data-toggle="#dropdown" aria-haspopup="true"
                                   aria-expanded="false">
                                    Dropdown link
                                </a>
                                <div class="dropdown__container" id="dropdown"
                                     aria-labelledby="dropdownMenuLink-one">
                                    <a class="dropdown__item" href="#">Action</a>
                                    <a class="dropdown__item" href="#">Another action</a>
                                    <a class="dropdown__item" href="#">Something else here</a>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <h3>Tooltip</h3>
                            <div class="tool-tip__content"><button
                                        class="tool-tip__toggle btn btn--default btn--round"
                                        data-toggle="#tool-tip-dropdown-1" data-toggle-role="tooltip"
                                        aria-label="Tooltip" aria-describedby="tool-tip-dropdown-1"><span
                                          class="i-info"></span></button>
                                <div class="tool-tip__dropdown" id="tool-tip-dropdown-1">
                                    magni modi exercitationem debitis ducimus assumenda ratione corporis, illum
                                    eius,.
                                    <div>
                                        <a class="dropdown__toggle" href="#" role="button" id="dropdownMenuLink"
                                           data-toggle="#dropdown" aria-haspopup="true" aria-describedby="dropdown"
                                           aria-expanded="false">
                                            open nav dropdown
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <h3>Menu</h3>
                            <span class="sr-only" id="toggle-btn">Toggle Navigation</span>
                            <button class="dropdown__button" data-toggle="#nav" aria-labelledby="toggle-btn"><span
                                      class="dropdown__open"></span><span class="dropdown__close"></span></button>
                            <nav id="nav" class="nav nav--absolute nav--default">
                                <!-- Close button for mobile version -->
                                <button class="dropdown__button" data-toggle="#nav"><span
                                          class="dropdown__close"></span></button>
                                <div class="nav__wrap" data-toggle-next>
                                    <ul class="nav__list nav__list-0">
                                        <li class="nav__item">
                                            <a class="nav__link nav__toggle  nav__parent"
                                               data-toggle=".nav__dropdown" href="#">Vegetables</a>
                                            <!-- Submenu 1 -->
                                            <ul class="nav__list  nav__list-1  nav__sub nav__dropdown">
                                                <li class="nav__item"><a class="nav__link" href="#">Stalk
                                                        Vegetables</a>
                                                </li>
                                                <li class="nav__item"><a class="nav__link" href="#">Roots &
                                                        Seeds</a></li>
                                                <li class="nav__item"><a class="nav__link" href="#">Cabbages</a>
                                                </li>
                                                <li class="nav__item"><a class="nav__link" href="#">Salad Greens</a>
                                                </li>
                                                <li class="nav__item"><a class="nav__link" href="#">Mushrooms</a>
                                                </li>
                                                <li class="nav__item">
                                                    <a class="nav__link nav__toggle nav__parent  nav__link--last-child"
                                                       data-toggle=".nav__dropdown" href="#">Sale %</a>
                                                    <!-- Submenu 1-1 -->
                                                    <ul class="nav__list  nav__list-2  nav__sub nav__dropdown">
                                                        <li class="nav__item"><a class="nav__link" href="#">Fair
                                                                Trade Roots</a>
                                                        </li>
                                                        <li class="nav__item"><a class="nav__link" href="#">Dried
                                                                Veggies</a></li>
                                                        <li class="nav__item"><a class="nav__link" href="#">Our
                                                                Brand</a></li>
                                                        <li class="nav__item"><a
                                                               class="nav__link  nav__link--last-child"
                                                               href="#">Homemade</a></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </li>
                                        <li class="nav__item">
                                            <a class="nav__link nav__toggle  nav__parent"
                                               data-toggle=".nav__dropdown" href="#">Fruits</a>
                                            <!-- Submenu 2 -->
                                            <ul class="nav__list  nav__list-1  nav__sub nav__dropdown">
                                                <li class="nav__item"><a class="nav__link" href="#">Citrus
                                                        Fruits</a></li>
                                                <li class="nav__item"><a class="nav__link" href="#">Berries</a></li>
                                                <li class="nav__item"><a class="nav__link nav__toggle nav__parent"
                                                       data-toggle=".nav__dropdown" href="#">Special Selection</a>
                                                    <!-- Submenu 2-1 -->
                                                    <ul class="nav__list  nav__list-2  nav__sub nav__dropdown">
                                                        <li class="nav__item"><a class="nav__link" href="#">Exotic
                                                                Mixes</a></li>
                                                        <li class="nav__item"><a class="nav__link" href="#">Wild
                                                                Pick</a></li>
                                                        <li class="nav__item"><a
                                                               class="nav__link nav__link--last-child"
                                                               href="#">Vitamin
                                                                Boosters</a>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li class="nav__item"><a class="nav__link  nav__link--last-child"
                                                       href="#">Tropical
                                                        Fruits</a>
                                                </li>
                                                <li class="nav__item"><a class="nav__link" href="#">Melons</a></li>
                                            </ul>
                                        </li>
                                        <li class="nav__item">
                                            <a class="nav__link nav__toggle  nav__parent"
                                               data-toggle=".nav__dropdown" href=" #">Grains</a>
                                            <!-- Submenu 3 -->
                                            <ul class="nav__list  nav__list-1   nav__sub nav__sub nav__dropdown">
                                                <li class="nav__item"><a class="nav__link" href="#">Buckwheat</a>
                                                </li>
                                                <li class="nav__item"><a class="nav__link" href="#">Millet</a></li>
                                                <li class="nav__item"><a class="nav__link" href="#">Quinoa</a></li>
                                                <li class="nav__item"><a class="nav__link" href="#">Wild Rice</a>
                                                </li>
                                                <li class="nav__item"><a class="nav__link" href="#">Durum Wheat</a>
                                                </li>
                                                <li class="nav__item">
                                                    <a class="nav__link nav__toggle nav__parent nav__link--last-child"
                                                       data-toggle=".nav__dropdown" href="#">Promo
                                                        Packs</a>
                                                    <!-- Submenu 3-1 -->
                                                    <ul
                                                        class="nav__list  nav__list-2   nav__sub nav__sub nav__dropdown">
                                                        <li class="nav__item"><a class="nav__link" href="#">Starter
                                                                Kit</a></li>
                                                        <li class="nav__item"><a class="nav__link" href="#">The
                                                                Essential 8</a>
                                                        </li>
                                                        <li class="nav__item"><a class="nav__link" href="#">Bolivian
                                                                Secrets</a>
                                                        </li>
                                                        <li class="nav__item"><a
                                                               class="nav__link nav__link--last-child"
                                                               href="#">Flour
                                                                Packs</a></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </li>
                                        <li class="nav__item">
                                            <a class="nav__link nav__toggle  nav__parent"
                                               data-toggle=".nav__dropdown" href="#">Mylk & Drinks</a>
                                            <!-- Submenu 4 -->
                                            <ul class="nav__list  nav__list-1   nav__sub nav__sub nav__dropdown">
                                                <li class="nav__item"><a class="nav__link" href="#">Grain Mylks</a>
                                                </li>
                                                <li class="nav__item"><a class="nav__link" href="#">Seed Mylks</a>
                                                </li>
                                                <li class="nav__item"><a class="nav__link" href="#">Nut Mylks</a>
                                                </li>
                                                <li class="nav__item"><a class="nav__link" href="#">Nutri Drinks</a>
                                                </li>
                                                <li class="nav__item">
                                                    <a class="nav__link nav__toggle nav__parent nav__link--last-child"
                                                       data-toggle=".nav__dropdown" href="#">Selection</a>
                                                    <!-- Submenu 4-1 -->
                                                    <ul
                                                        class="nav__list  nav__list-2   nav__sub nav__sub nav__dropdown">
                                                        <li class="nav__item"><a class="nav__link" href="#">Nut Mylk
                                                                Packs</a>
                                                        </li>
                                                        <li class="nav__item"><a class="nav__link" href="#">Amino
                                                                Acid Heaven</a>
                                                        </li>
                                                        <li class="nav__item"><a
                                                               class="nav__link nav__link--last-child"
                                                               href="#">Allergy
                                                                Free</a></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </nav>
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
        <div class="container">
            <header>
                <h2>nav Dropdowns Grouped</h2>
            </header>
            <div class="nav__content">
                <div class="div contaner">
                    <div class="row">
                        <div class="col-md-4">
                            <h3>Dropdown</h3>
                            <div class="dropdown show">
                                <a class="btn btn-primary dropdown__toggle" href="#" role="button"
                                   id="dropdownMenuLink-two" data-toggle="#dropdown1" data-toggle-global
                                   data-toggle-group="group-1" aria-haspopup="true" aria-expanded="false">
                                    Dropdown link
                                </a>
                                <div class="dropdown__container" id="dropdown1"
                                     aria-labelledby="dropdownMenuLink-two">
                                    <a class="dropdown__item" href="#">Action</a>
                                    <a class="dropdown__item" href="#">Another action</a>
                                    <a class="dropdown__item" href="#">Something else here</a>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <h3>Tooltip</h3>
                            <div class="tool-tip__content"><button
                                        class="tool-tip__toggle btn btn--default btn--round"
                                        data-toggle-role="tooltip" data-toggle-global data-toggle-group="group-1"
                                        data-toggle="#tool-tip-dropdown-11" aria-label="Tooltip 2"
                                        aria-describedby="tool-tip-dropdown-11"><span
                                          class="i-info"></span></button>
                                <div class="tool-tip__dropdown" id="tool-tip-dropdown-11">
                                    magni modi exercitationem debitis ducimus assumenda ratione corporis, illum
                                    eius,
                                    <a href="#">
                                        link
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <h3>Menu</h3>
                            <span class="sr-only" id="toggle-btn-two">Toggle Navigation</span>
                            <button class="dropdown__button" data-toggle-group="group-1" data-toggle="#nav2"
                                    data-toggle-global aria-labelledby="toggle-btn-two"><span
                                      class="dropdown__open"></span><span class="dropdown__close"></span></button>
                            <nav id="nav2" class="nav nav--absolute nav--transition" data-toggle-animate="default">
                                <!-- Close button for mobile version -->
                                <button class="dropdown__button" data-toggle="#nav2"
                                        data-toggle-global><span class="dropdown__close"></span></button>
                                <div class="nav__wrap" data-toggle-next>
                                    <ul class="nav__list nav__list-0">
                                        <li class="nav__item">
                                            <a class="nav__link nav__toggle  nav__parent"
                                               data-toggle=".nav__dropdown" href="#">Vegetables</a>
                                            <!-- Submenu 1 -->
                                            <ul class="nav__list  nav__list-1  nav__sub nav__dropdown">
                                                <li class="nav__item"><a class="nav__link" href="#">Stalk
                                                        Vegetables</a>
                                                </li>
                                                <li class="nav__item"><a class="nav__link" href="#">Roots &
                                                        Seeds</a></li>
                                                <li class="nav__item"><a class="nav__link" href="#">Cabbages</a>
                                                </li>
                                                <li class="nav__item"><a class="nav__link" href="#">Salad Greens</a>
                                                </li>
                                                <li class="nav__item"><a class="nav__link" href="#">Mushrooms</a>
                                                </li>
                                                <li class="nav__item">
                                                    <a class="nav__link nav__toggle nav__parent  nav__link--last-child"
                                                       data-toggle=".nav__dropdown" tabindex="-1" href="#">Sale
                                                        %</a>
                                                    <!-- Submenu 1-1 -->
                                                    <ul class="nav__list  nav__list-2  nav__sub nav__dropdown">
                                                        <li class="nav__item"><a class="nav__link" href="#">Fair
                                                                Trade Roots</a>
                                                        </li>
                                                        <li class="nav__item"><a class="nav__link" href="#">Dried
                                                                Veggies</a></li>
                                                        <li class="nav__item"><a class="nav__link" href="#">Our
                                                                Brand</a></li>
                                                        <li class="nav__item"><a
                                                               class="nav__link  nav__link--last-child"
                                                               href="#">Homemade</a></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </li>
                                        <li class="nav__item">
                                            <a class="nav__link nav__toggle  nav__parent"
                                               data-toggle=".nav__dropdown" href="#">Fruits</a>
                                            <!-- Submenu 2 -->
                                            <ul class="nav__list  nav__list-1  nav__sub nav__dropdown">
                                                <li class="nav__item"><a class="nav__link" href="#">Citrus
                                                        Fruits</a></li>
                                                <li class="nav__item"><a class="nav__link" href="#">Berries</a></li>
                                                <li class="nav__item"><a class="nav__link nav__toggle nav__parent"
                                                       data-toggle=".nav__dropdown" href="#">Special Selection</a>
                                                    <!-- Submenu 2-1 -->
                                                    <ul class="nav__list  nav__list-2  nav__sub nav__dropdown">
                                                        <li class="nav__item"><a class="nav__link" href="#">Exotic
                                                                Mixes</a></li>
                                                        <li class="nav__item"><a class="nav__link" href="#">Wild
                                                                Pick</a></li>
                                                        <li class="nav__item"><a
                                                               class="nav__link nav__link--last-child"
                                                               href="#">Vitamin
                                                                Boosters</a>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li class="nav__item"><a class="nav__link  nav__link--last-child"
                                                       href="#">Tropical
                                                        Fruits</a>
                                                </li>
                                                <li class="nav__item"><a class="nav__link" href="#">Melons</a></li>
                                            </ul>
                                        </li>
                                        <li class="nav__item">
                                            <a class="nav__link nav__toggle  nav__parent"
                                               data-toggle=".nav__dropdown" href=" #">Grains</a>
                                            <!-- Submenu 3 -->
                                            <ul class="nav__list  nav__list-1  nav__sub nav__dropdown">
                                                <li class="nav__item"><a class="nav__link" href="#">Buckwheat</a>
                                                </li>
                                                <li class="nav__item"><a class="nav__link" href="#">Millet</a></li>
                                                <li class="nav__item"><a class="nav__link" href="#">Quinoa</a></li>
                                                <li class="nav__item"><a class="nav__link" href="#">Wild Rice</a>
                                                </li>
                                                <li class="nav__item"><a class="nav__link" href="#">Durum Wheat</a>
                                                </li>
                                                <li class="nav__item">
                                                    <a class="nav__link nav__toggle nav__parent nav__link--last-child"
                                                       data-toggle=".nav__dropdown" href="#">Promo
                                                        Packs</a>
                                                    <!-- Submenu 3-1 -->
                                                    <ul class="nav__list  nav__list-2  nav__sub nav__dropdown">
                                                        <li class="nav__item"><a class="nav__link" href="#">Starter
                                                                Kit</a></li>
                                                        <li class="nav__item"><a class="nav__link" href="#">The
                                                                Essential 8</a>
                                                        </li>
                                                        <li class="nav__item"><a class="nav__link" href="#">Bolivian
                                                                Secrets</a>
                                                        </li>
                                                        <li class="nav__item"><a
                                                               class="nav__link nav__link--last-child"
                                                               href="#">Flour
                                                                Packs</a></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </li>
                                        <li class="nav__item">
                                            <a class="nav__link nav__toggle  nav__parent"
                                               data-toggle=".nav__dropdown" href="#">Mylk & Drinks</a>
                                            <!-- Submenu 4 -->
                                            <ul class="nav__list  nav__list-1  nav__sub nav__dropdown">
                                                <li class="nav__item"><a class="nav__link" href="#">Grain Mylks</a>
                                                </li>
                                                <li class="nav__item"><a class="nav__link" href="#">Seed Mylks</a>
                                                </li>
                                                <li class="nav__item"><a class="nav__link" href="#">Nut Mylks</a>
                                                </li>
                                                <li class="nav__item"><a class="nav__link" href="#">Nutri Drinks</a>
                                                </li>
                                                <li class="nav__item">
                                                    <a class="nav__link nav__toggle nav__parent nav__link--last-child"
                                                       data-toggle=".nav__dropdown" href="#">Selection</a>
                                                    <!-- Submenu 4-1 -->
                                                    <ul class="nav__list  nav__list-2  nav__sub nav__dropdown">
                                                        <li class="nav__item"><a class="nav__link" href="#">Nut Mylk
                                                                Packs</a>
                                                        </li>
                                                        <li class="nav__item"><a class="nav__link" href="#">Amino
                                                                Acid Heaven</a>
                                                        </li>
                                                        <li class="nav__item"><a
                                                               class="nav__link nav__link--last-child"
                                                               href="#">Allergy
                                                                Free</a></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
        `;
    })
    .add('Accordion', () => {
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
                                    <div class="accordion__dropdown is--active" aria-labelledby="headingOne"
                                         id="first-accordion">
                                        <div class="accordion__body">
                                            <h4 class="accordion__header">heading 1</h4>
                                            <p class="accordion__text">Lorem ipsum, dolor sit amet consectetur
                                                adipisicing
                                                elit.
                                                Incidunt
                                                libero ipsum, veniam
                                                magni modi exercitationem debitis ducimus assumenda ratione corporis,
                                                illum
                                                eius,
                                                laborum tempore cumque amet id perspiciatis nostrum unde?</p>
                                            <p class="accordion__text">Lorem ipsum dolor sit, amet consectetur
                                                adipisicing
                                                elit.
                                                Ipsum,
                                                maiores.</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion__card">
                                    <div class="accordion__header" id="headingTwo">
                                        <button class="accordion__button" data-toggle="#second-accordion"
                                                data-toggle-role="accordion" aria-controls="second"
                                                aria-expanded="false">Accordion 1<span
                                                  class="accordion__icon"></span></button>
                                    </div>
                                    <div class="accordion__dropdown" aria-labelledby="headingTwo" id="second-accordion">
                                        <div class="accordion__body">
                                            <h4 class="tabs__header">heading 1</h4>
                                            <p class="tabs__text">Lorem ipsum dolor sit amet consectetur adipisicing
                                                elit.
                                                Laboriosam
                                                officiis voluptas
                                                maiores deserunt ullam aliquam?</p>
                                            <p class="tabs__text">Lorem ipsum dolor sit amet consectetur adipisicing
                                                elit.
                                                Accusamus,
                                                officia accusantium
                                                quod fuga porro eius animi earum excepturi omnis! Reprehenderit!</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion__card">
                                    <div class="accordion__header" id="headingThree">
                                        <button class="accordion__button" data-toggle="#third-accordion"
                                                data-toggle-group="#accordion" data-toggle-role="accordion"
                                                aria-controls="third" aria-expanded="false">Accordion 1 <span
                                                  class="accordion__icon"></span></button>
                                    </div>
                                    <div class="accordion__dropdown" aria-labelledby="headingThree"
                                         id="third-accordion">
                                        <div class="accordion__body">
                                            <h4 class="accordion__header">heading 2</h4>
                                            <p class="accordion__text">Lorem ipsum dolor sit amet consectetur
                                                adipisicing
                                                elit.
                                                Consectetur
                                                odio cum eveniet
                                                excepturi eum provident molestias ad ipsa unde dignissimos illo porro
                                                animi
                                                earum
                                                aliquam perspiciatis id omnis, adipisci incidunt. Qui, beatae. Beatae
                                                animi
                                                totam
                                                obcaecati at quae, iste facere fuga nemo pariatur esse nihil?</p>
                                            <p class="accordion__text">Lorem ipsum, dolor sit amet consectetur
                                                adipisicing
                                                elit.
                                                Doloremque
                                                commodi eos
                                                voluptatem numquam pariatur deleniti repellat fugiat eligendi nulla
                                                molestiae sunt
                                                praesentium vero sequi distinctio error quibusdam maiores natus magnam,
                                                explicabo
                                                hic
                                                sed alias dolores, quis eum! Reprehenderit atque cupiditate dolorum?
                                                Saepe,
                                                doloribus
                                                veniam? Nulla!</p>
                                        </div>
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
                                                aria-controls="fourth-accordion" aria-expanded="false">Accordion 1
                                            Grouped <span class="accordion__icon"></span></button>
                                    </div>
                                    <div class="accordion__dropdown" aria-labelledby="headingFour" id="fourth-accordion"
                                         data-toggle-animate="height">
                                        <div class="accordion__body">
                                            <h4 class="accordion__header">heading 1</h4>
                                            <p class="accordion__text">Lorem ipsum, dolor sit amet consectetur
                                                adipisicing
                                                elit.
                                                Incidunt
                                                libero ipsum, veniam
                                                magni modi exercitationem debitis ducimus assumenda ratione corporis,
                                                illum
                                                eius,
                                                laborum tempore cumque amet id perspiciatis nostrum unde?</p>
                                            <p class="accordion__text">Lorem ipsum dolor sit, amet consectetur
                                                adipisicing
                                                elit.
                                                Ipsum,
                                                maiores.</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion__card">
                                    <div class="accordion__header" id="headingFive">
                                        <button class="accordion__button  is--active" data-toggle="#fifth-accordion"
                                                data-toggle-group="#accordion2" data-toggle-role="accordion"
                                                aria-controls="fifth-accordion" aria-expanded="true">Accordion
                                            1 Grouped<span class="accordion__icon"></span></button>
                                    </div>
                                    <div class="accordion__dropdown is--active" aria-labelledby="headingFive"
                                         id="fifth-accordion" data-toggle-animate="height">
                                        <div class="accordion__body">
                                            <h4 class="tabs__header">heading 1</h4>
                                            <p class="tabs__text">Lorem ipsum dolor sit amet consectetur adipisicing
                                                elit.
                                                Laboriosam
                                                officiis voluptas
                                                maiores deserunt ullam aliquam?</p>
                                            <p class="tabs__text">Lorem ipsum dolor sit amet consectetur adipisicing
                                                elit.
                                                Accusamus,
                                                officia accusantium
                                                quod fuga porro eius animi earum excepturi omnis! Reprehenderit!</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion__card">
                                    <div class="accordion__header" id="headingSix">
                                        <button class="accordion__button" data-toggle="#sixth-accordion"
                                                data-toggle-role="accordion" data-toggle-group="#accordion2"
                                                aria-controls="sixth-accordion" aria-expanded="false">Accordion 1
                                            Grouped<span class="accordion__icon"></span></button>
                                    </div>
                                    <div class="accordion__dropdown" aria-labelledby="headingSix" id="sixth-accordion"
                                         data-toggle-animate="height">
                                        <div class="accordion__body">
                                            <h4 class="accordion__header">heading 2</h4>
                                            <p class="accordion__text">Lorem ipsum dolor sit amet consectetur
                                                adipisicing
                                                elit.
                                                Consectetur
                                                odio cum eveniet
                                                excepturi eum provident molestias ad ipsa unde dignissimos illo porro
                                                animi
                                                earum
                                                aliquam perspiciatis id omnis, adipisci incidunt. Qui, beatae. Beatae
                                                animi
                                                totam
                                                obcaecati at quae, iste facere fuga nemo pariatur esse nihil?</p>
                                            <p class="accordion__text">Lorem ipsum, dolor sit amet consectetur
                                                adipisicing
                                                elit.
                                                Doloremque
                                                commodi eos
                                                voluptatem numquam pariatur deleniti repellat fugiat eligendi nulla
                                                molestiae sunt
                                                praesentium vero sequi distinctio error quibusdam maiores natus magnam,
                                                explicabo
                                                hic
                                                sed alias dolores, quis eum! Reprehenderit atque cupiditate dolorum?
                                                Saepe,
                                                doloribus
                                                veniam? Nulla!</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section
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
                <div class="tabs__list" id="myTab" role="tablist">
                    <a class="tabs__link is--active" id="first-tab" data-toggle="#first" data-toggle-group="#myTab"
                       data-toggle-role="tab" href="#first" role="tab" aria-controls="first"
                       aria-selected="true">Home</a>
                    <a class="tabs__link" id="second-tab" data-toggle="#second" data-toggle-group="#myTab"
                       data-toggle-role="tab" href="#first" role="tab" aria-controls="first"
                       aria-selected="false">Profile</a>
                    <a class="tabs__link" id="third-tab" data-toggle="#third" data-toggle-group="#myTab"
                       data-toggle-role="tab" href="#first" role="tab" aria-controls="first"
                       aria-selected="false">Contact</a>
                </div>
                <div class="tabs__content">
                    <div class="tabs__body is--active is--show" role="tabpanel" aria-labelledby="first-tab"
                         id="first" data-toggle-animate="default">
                        <h4 class="tabs__header">Tab heading 1</h4>
                        <p class="tabs__text">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt
                            libero ipsum, veniam
                            magni modi exercitationem debitis ducimus assumenda ratione corporis, illum eius,
                            laborum tempore cumque amet id perspiciatis nostrum unde?</p>
                        <p class="tabs__text">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum,
                            maiores.</p>
                    </div>
                    <div class="tabs__body" role="tabpanel" aria-labelledby="second-tab" id="second"
                         data-toggle-animate="default">
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
                    <div class="tabs__body" role="tabpanel" aria-labelledby="third-tab" id="third"
                         data-toggle-animate="default">
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
    })
    .add('Menu with Hover', () => {
        return `
        <section class="section section__menu-hover">
        <div class="py-sm"></div>
        <div class="container">
            <header>
                <h2>Menu with Hover</h2>
            </header>
            <div class="nav__content">
                <div class="div contaner">
                    <p>Menu</p>
                    <span class="sr-only" id="toggle-btn-three">Toggle Navigation</span>
                    <button class="dropdown__button nav-menu__button" data-toggle-group="group-1" data-toggle="#nav3"
                            data-toggle-global aria-labelledby="toggle-btn-three"><span
                                class="dropdown__open"></span><span class="dropdown__close"></span></button>
                    <div  id="nav3" class="nav-menu--transition" data-toggle-animate="default">
                        <!-- Close button for mobile version -->
                        <button class="dropdown__button nav-menu__button" data-toggle="#nav3"
                        data-toggle-global><span class="dropdown__close"></span></button>
                        <div class="nav-menu__scroll">
                            <nav class="nav nav-menu"  data-toggle-next>

                                <ul class="nav__list nav-menu--horizontal nav__list-0">
                                    <li class="nav__item" data-toggle-hover>
                                        <a class="nav__link nav__toggle  nav__parent"
                                            data-toggle=".nav__dropdown" data-toggle-global data-toggle-group="nav-menu" href="http://google.com">Vegetables</a>

                                        <!-- Submenu 1 -->
                                        <ul class="nav__list  nav__list-1  nav__sub nav__dropdown" data-toggle-animate="default">
                                            <button class="nav-menu__back" data-toggle-back>back</button>
                                            <li class="nav__item"><a class="nav__link" href="#">Stalk
                                                    Vegetables</a>
                                            </li>
                                            <li class="nav__item"><a class="nav__link" href="#">Roots &
                                                    Seeds</a></li>
                                            <li class="nav__item"><a class="nav__link" href="#">Cabbages</a>
                                            </li>
                                            <li class="nav__item"><a class="nav__link" href="#">Salad Greens</a>
                                            </li>
                                            <li class="nav__item"><a class="nav__link" href="#">Mushrooms</a>
                                            </li>
                                            <li class="nav__item">
                                                <a class="nav__link nav__toggle nav__parent  nav__link--last-child"
                                                    data-toggle=".nav__dropdown" href="#">Sale
                                                    %</a>
                                                <!-- Submenu 1-1 -->
                                                <ul class="nav__list  nav__list-2  nav__sub nav__dropdown" data-toggle-animate="default">
                                                        <button class="nav-menu__back" data-toggle-back>back</button>
                                                    <li class="nav__item"><a class="nav__link" href="#">Fair
                                                            Trade Roots</a>
                                                    </li>
                                                    <li class="nav__item"><a class="nav__link" href="#">Dried
                                                            Veggies</a></li>
                                                    <li class="nav__item"><a class="nav__link" href="#">Our
                                                            Brand</a></li>
                                                    <li class="nav__item"><a
                                                            class="nav__link  nav__link--last-child"
                                                            href="#">Homemade</a></li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="nav__item"  data-toggle-hover>

                                        <a class="nav__link nav__toggle  nav__parent"
                                            data-toggle=".nav__dropdown" data-toggle-global data-toggle-group="nav-menu" href="#">Fruits</a>
                                        <!-- Submenu 2 -->
                                        <ul class="nav__list  nav__list-1  nav__sub nav__dropdown" data-toggle-animate="default">
                                                <button class="nav-menu__back" data-toggle-back>back</button>
                                            <li class="nav__item"><a class="nav__link" href="#">Citrus
                                                    Fruits</a></li>
                                            <li class="nav__item"><a class="nav__link" href="#">Berries</a></li>
                                            <li class="nav__item"><a class="nav__link nav__toggle nav__parent"
                                                    data-toggle=".nav__dropdown" href="#">Special Selection</a>
                                                <!-- Submenu 2-1 -->
                                                <ul class="nav__list  nav__list-2  nav__sub nav__dropdown" data-toggle-animate="default">
                                                        <button class="nav-menu__back" data-toggle-back>back</button>
                                                    <li class="nav__item"><a class="nav__link" href="#">Exotic
                                                            Mixes</a></li>
                                                    <li class="nav__item"><a class="nav__link" href="#">Wild
                                                            Pick</a></li>
                                                    <li class="nav__item"><a
                                                            class="nav__link nav__link--last-child"
                                                            href="#">Vitamin
                                                            Boosters</a>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li class="nav__item"><a class="nav__link  nav__link--last-child"
                                                    href="#">Tropical
                                                    Fruits</a>
                                            </li>
                                            <li class="nav__item"><a class="nav__link" href="#">Melons</a></li>
                                        </ul>
                                    </li>
                                    <li class="nav__item"  data-toggle-hover>
                                        <a class="nav__link nav__toggle  nav__parent"
                                            data-toggle=".nav__dropdown" data-toggle-global data-toggle-group="nav-menu" href="#">Grains</a>
                                        <!-- Submenu 3 -->
                                        <ul class="nav__list  nav__list-1  nav__sub nav__dropdown" data-toggle-animate="default">
                                                <button class="nav-menu__back" data-toggle-back>back</button>
                                            <li class="nav__item"><a class="nav__link" href="#">Buckwheat</a>
                                            </li>
                                            <li class="nav__item"><a class="nav__link" href="#">Millet</a></li>
                                            <li class="nav__item"><a class="nav__link" href="#">Quinoa</a></li>
                                            <li class="nav__item"><a class="nav__link" href="#">Wild Rice</a>
                                            </li>
                                            <li class="nav__item"><a class="nav__link" href="#">Durum Wheat</a>
                                            </li>
                                            <li class="nav__item">
                                                <a class="nav__link nav__toggle nav__parent nav__link--last-child"
                                                    data-toggle=".nav__dropdown" href="#">Promo
                                                    Packs</a>
                                                <!-- Submenu 3-1 -->
                                                <ul class="nav__list  nav__list-2  nav__sub nav__dropdown" data-toggle-animate="default">
                                                        <button class="nav-menu__back" data-toggle-back>back</button>
                                                    <li class="nav__item"><a class="nav__link" href="#">Starter
                                                            Kit</a></li>
                                                    <li class="nav__item"><a class="nav__link" href="#">The
                                                            Essential 8</a>
                                                    </li>
                                                    <li class="nav__item"><a class="nav__link" href="#">Bolivian
                                                            Secrets</a>
                                                    </li>
                                                    <li class="nav__item"><a
                                                            class="nav__link nav__link--last-child"
                                                            href="#">Flour
                                                            Packs</a></li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="nav__item"  data-toggle-hover>
                                        <a class="nav__link nav__toggle  nav__parent"
                                            data-toggle=".nav__dropdown" data-toggle-global data-toggle-group="nav-menu" href="#">Mylk & Drinks</a>
                                        <!-- Submenu 4 -->
                                        <ul class="nav__list  nav__list-1  nav__sub nav__dropdown" data-toggle-animate="default">
                                                <button class="nav-menu__back" data-toggle-back>back</button>
                                            <li class="nav__item"><a class="nav__link" href="#">Grain Mylks</a>
                                            </li>
                                            <li class="nav__item"><a class="nav__link" href="#">Seed Mylks</a>
                                            </li>
                                            <li class="nav__item"><a class="nav__link" href="#">Nut Mylks</a>
                                            </li>
                                            <li class="nav__item"><a class="nav__link" href="#">Nutri Drinks</a>
                                            </li>
                                            <li class="nav__item">
                                                <a class="nav__link nav__toggle nav__parent nav__link--last-child"
                                                    data-toggle=".nav__dropdown" href="#">Selection</a>
                                                <!-- Submenu 4-1 -->
                                                <ul class="nav__list  nav__list-2  nav__sub nav__dropdown" data-toggle-animate="default">
                                                        <button class="nav-menu__back" data-toggle-back>back</button>
                                                    <li class="nav__item"><a class="nav__link" href="#">Nut Mylk
                                                            Packs</a>
                                                    </li>
                                                    <li class="nav__item"><a class="nav__link" href="#">Amino
                                                            Acid Heaven</a>
                                                    </li>
                                                    <li class="nav__item"><a
                                                            class="nav__link nav__link--last-child"
                                                            href="#">Allergy
                                                            Free</a></li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>

                            </nav>
                        </div>
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
        // location.reload();
    }
}

document.addEventListener(
    'DOMContentLoaded',
    function () {
        runOnInit();
        const callback = function (mutationsList) {
            for (let i = 0, len = mutationsList.length; i < len; i++) {
                if (mutationsList[i].type == 'childList') {
                    console.log(mutationsList);
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

Toggle({
    onHover: true,
});
