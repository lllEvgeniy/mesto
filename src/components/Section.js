export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this._renderedItems = items
        this._renderer = renderer;

        this._container = document.querySelector(containerSelector);
    }



    renderItems(items) {

        items.reverse()
        .forEach((item) => {

            this._renderer(item);
        });

    }

    addItem(element) {
        this._container.prepend(element);
    }
}