import EventEmitter from './event-emitter';

const notify = (config) => {
    EventEmitter.dispatch('notify', config);
}

const NotifyControl = {
    primary: (title, body) => {
        notify({ title, body, type: 'primary' });
    },
    secondary: (title, body) => {
        notify({ title, body, type: 'secondary' });
    },
    success: (title, body) => {
        notify({ title, body, type: 'success' });
    },
    danger: (title, body) => {
        notify({ title, body, type: 'danger' });
    },
    warning: (title, body) => {
        notify({ title, body, type: 'warning' });
    },
    info: (title, body) => {
        notify({ title, body, type: 'info' });
    },
    light: (title, body) => {
        notify({ title, body, type: 'light' });
    },
    dark: (title, body) => {
        notify({ title, body, type: 'dark' });
    }
};

export default NotifyControl;