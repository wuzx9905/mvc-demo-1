import $ from 'jquery'

class EventBus {
    constructor() {
        this._eventBus = $(window)
    }
    on(evenName, fn) {
        return this._eventBus.on(evenName, fn);
    }
    trigger(evenName, data) {
        return this._eventBus.trigger(evenName, data);
    }
    off(evenName, fn) {
        return this._eventBus.off(evenName, fn);
    }
}

export default EventBus

