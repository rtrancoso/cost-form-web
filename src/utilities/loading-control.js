import EventEmitter from './event-emitter';

let count = 0;

const callback = () => {
    EventEmitter.dispatch('loading', count > 0);
}

const LoadingControl = {
    add: () => {
        count++;
        callback();
    },
    rem: () => {
        count--;
        count = 0 ? 0 : count;
        callback();
    }

};

export default LoadingControl;