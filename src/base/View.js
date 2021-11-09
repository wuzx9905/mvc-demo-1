import $ from 'jquery';

class view {
    constructor({ el, html, render }) {
        this.el = $(el);
        this.html = html;
        this.render = render;
    }
}

export default view