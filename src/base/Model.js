import EventBus from "./EventBus";

class Model extends EventBus {
    constructor(options) {
        super();  //调用EventBus#constructor
        ['data', 'update', 'create', 'delete', 'get'].forEach((key) => {
            if (key in options) {
                this[key] = options[key];
            }
        })
    }
    create() {
        //?.可选链语法
        console?.error?.('你还没有实现create')
    }
    delete() {
        console?.error?.('你还没有实现delete')
    }
    update() {
        console?.error?.('你还没有实现update')
    }
    get() {
        console?.error?.('你还没有实现get')
    }
}

export default Model