import React, { useState, useEffect } from 'react';
import EventEmitter from '../utilities/event-emitter';

import clsx from 'clsx';

function Loading() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        EventEmitter.subscribe('loading', setShow);
    }, []);

    return (
        <div className={clsx('loading', { 'show': show })}>
            <div data-loader="rectangle"></div>
        </div>
    );
}

export default Loading;