import Toggle from './index';

describe('Toggle click', () => {
    it('should add class to button and Dropdown when clicked', () => {
        // GIVEN
        document.body.innerHTML = `<div class="dropdown show">
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
        </div>`;
        Toggle();

        // WHEN
        document.getElementById('dropdownMenuLink-one').click();

        // THEN
        expect(document.body).toMatchSnapshot();
    });
});
