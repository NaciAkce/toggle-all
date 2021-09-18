"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __importDefault(require("./index"));
describe('Toggle click', function () {
    it('should add class to button and Dropdown when clicked', function () {
        // GIVEN
        document.body.innerHTML = "<div class=\"dropdown show\">\n            <a class=\"btn btn-primary dropdown__toggle\" href=\"#\" role=\"button\"\n            id=\"dropdownMenuLink-one\" data-toggle=\"#dropdown\" aria-haspopup=\"true\"\n            aria-expanded=\"false\">\n                Dropdown link\n            </a>\n            <div class=\"dropdown__container\" id=\"dropdown\"\n                aria-labelledby=\"dropdownMenuLink-one\">\n                <a class=\"dropdown__item\" href=\"#\">Action</a>\n                <a class=\"dropdown__item\" href=\"#\">Another action</a>\n                <a class=\"dropdown__item\" href=\"#\">Something else here</a>\n            </div>\n        </div>";
        index_1.default();
        // WHEN
        document.getElementById('dropdownMenuLink-one').click();
        // THEN
        expect(document.body).toMatchSnapshot();
    });
});
