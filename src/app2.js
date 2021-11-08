import './app2.css';
import $ from 'jquery';  //多次引用也没事，已经设计好了
const eventBus = $(window)
const localKey = 'app2.index';

//所有数据相关都放到M
const m = {
    //初始化数据
    localKey: 'app2.index',
    data: {
        index: parseInt(localStorage.getItem(localKey)) || 0
    },
    create() { },
    delete() { },
    update(data) {
        Object.assign(m.data, data);      //把data所有的属性一个个赋值给m的data
        eventBus.trigger('m:updated')
        localStorage.setItem(localKey, m.data.index)
    },
    get() { }
}


const v = {
    el: null,
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
    init(container) {
        v.el = $(container);
    },
    render(index) {
        if (v.el.children.length !== 0) {
            v.el.empty();
        }
        $(v.html(index))
            .appendTo(v.el);
    }
}


//其他都放到C
const c = {
    init(container) {
        v.init(container);
        v.render(m.data.index);  //view = render(data)
        c.autoBindEvents();
        eventBus.on('m:updated', () => {
            v.render(m.data.index)
        })
    },
    events: {
        'click .tab-bar li': 'x',
    },
    x(e) {
        const index = parseInt(e.currentTarget.dataset.index);
        m.update({ index: index })
    },
    autoBindEvents() {
        for (let key in c.events) {
            const value = c[c.events[key]]
            const spaceIndex = key.indexOf(' ');
            const part1 = key.slice(0, spaceIndex);
            const part2 = key.slice(spaceIndex + 1);
            v.el.on(part1, part2, value);
        }
    }
}

export default c;