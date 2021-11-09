import './app2.css';
import $ from 'jquery';  //多次引用也没事，已经设计好了
import Model from './base/Model.js';
import View from './base/View.js';
import EventBus from './base/EventBus';


const eventBus = new EventBus()
const localKey = 'app2.index';

//所有数据相关都放到M
const m = new Model({
    //初始化数据
    data: {
        index: parseInt(localStorage.getItem(localKey)) || 0
    },
    update(data) {
        Object.assign(m.data, data);      //把data所有的属性一个个赋值给m的data
        eventBus.trigger('m:updated')
        localStorage.setItem(localKey, m.data.index)
    },
})



//其他都放到C


const init = (el) => {
    new View({
        el: el,
        data: m.data,
        eventBus: eventBus,
        html: (index) => {
            return `
        <div>
        <ol class="tab-bar">
            <li class="${index === 0 ? 'selected' : ''}" data-index="0"><span>1111</span> 1</li>
            <li class="${index === 1 ? 'selected' : ''}" data-index="1"><span>2222</span> 2</li>
        </ol>
        <ol class="tab-content">
            <li class="${index === 0 ? 'active' : ''}" >内容1</li>
            <li class="${index === 1 ? 'active' : ''}" >内容2</li>
        </ol>
        </div>
        `},
        render(data) {
            const index = data.index;
            if (this.el.children.length !== 0) {
                this.el.empty();
            }
            $(this.html(index))
                .appendTo(this.el);
        },
        events: {
            'click .tab-bar li': 'x',
        },
        x(e) {
            const index = parseInt(e.currentTarget.dataset.index);
            m.update({ index: index })
        },

    })
}

export default init;