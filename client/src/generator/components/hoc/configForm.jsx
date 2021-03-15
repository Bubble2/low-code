import React from 'react';

export default (props) => {

    return (
        <div className="fr-field w-100 ">
            <div className="fr-label mb2" style={{ flexGrow: 1 }}>
                <label className="fr-label-title no-colon" title={props.title}>
                    <span className=" flex-none">{props.title}</span>
                    {props.description && <span className="fr-desc ml2">({props.description})</span>}
                </label>
            </div>
            <div className="fr-content">
                {props.children}
            </div>
        </div>
    );
}


