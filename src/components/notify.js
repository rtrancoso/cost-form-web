import React from 'react';
import clsx from 'clsx';

export default function Notify({ uuid, title, type, dismissible = true, onClose, children }) {
    return (
        <div id={uuid} className={clsx('notify', type)}>
            {dismissible && <button className="close" onClick={() => onClose(uuid)}><span>&times;</span></button>}
            {title && <h4 className="title">{title}</h4>}
            {children}
        </div>
    );
}
