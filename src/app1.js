import './app1.css';
import $ from 'jquery';
import Model from './base/Model.js';
import View from './base/View.js';
import EventBus from './base/EventBus';


const m = new Model({
    data: {
        n: parseFloat(localStorage.getItem('n'))
    },
    update: function (data) {
        Object.assign(m.data, data);      //把data所有的属性一个个赋值给m的data
        m.trigger('m:updated')
        localStorage.setItem('n', m.data.n)
    }
})

//所有跟视图相关的都放到V

//其他都放到C
const init = (el) => {
    new View({   //vue.js觉得应该叫view
        el: el,
        data: m.data,
        html: `
        <div>
            <div class="output">
                <span id="number">{{n}}</span>
            </div>
            <div id="actions">
                <button id="add1">+1</button>
                <button id="minus1">-1</button>
                <button id="mul2">*2</button>
                <button id="divide2">/2</button>
             </div>
        </div>
        `,
        render(data) {
            const n = data.n;
            if (this.el.children.length !== 0) {
                this.el.empty();
            }
            $(this.html.replace('{{n}}', n))
                .appendTo(this.el);
        },
        events: {
            'click #add1': 'add',
            'click #minus1': 'minus',
            'click #mul2': 'mul',
            'click #divide2': 'divide'
        },
        add() {
            m.update({ n: m.data.n + 1 })
        },
        minus() {
            m.update({ n: m.data.n - 1 })
        },
        mul() {
            m.update({ n: m.data.n * 2 })
        },
        divide() {
            m.update({ n: m.data.n / 2 })
        },
    })
}


export default init;