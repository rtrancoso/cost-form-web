import React, { useState, useEffect } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Notify from './notify';

import EventEmitter from '../utilities/event-emitter';

function UUID() {
    var d = new Date().getTime();
    var d2 = (performance && performance.now && (performance.now() * 1000)) || 0;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16;
        if (d > 0) {
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        } else {
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }
        // eslint-disable-next-line no-mixed-operators
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

export default function NotifyContainer() {
    const [notifies, setNotifies] = useState([]);

    const remNotify = (uuid) => {
        setNotifies(notifies => notifies.filter(notify => notify.uuid !== uuid));
    }

    useEffect(() => {
        const addNotify = (config) => {
            let uuid = UUID();
            setNotifies(notifies => [...notifies, Object.assign(config, { uuid })]);
            setTimeout(() => remNotify(uuid), 3000);
        }
        EventEmitter.subscribe('notify', addNotify);
    }, []);

    return (
        <div className="notify-container">
            <TransitionGroup>
                {notifies.map(({ uuid, title, body, type }, i) => (
                    <CSSTransition key={i} timeout={200}>
                        <Notify uuid={uuid} title={title} type={type} onClose={remNotify}>
                            {body}
                        </Notify>
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </div>
    );
}
