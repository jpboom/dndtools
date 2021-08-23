import React from 'react';

export default function Modal(props) {
    let modal = null;
    console.log('props = ', props);
    if (props.show) {
        modal = (
            <div className="fixed w-full h-full top-0 left-0 flex items-center justify-center">
                <div
                    onClick={() => props.onClose()}
                    className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"
                ></div>
                <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
                    <div className="modal-content py-4 text-left px-6">
                        {props.children}
                    </div>
                </div>
            </div>
        );
    }
    return modal;
}
