import React from 'react';
import './CharComponent.css';

const charComponent = (props) => {
    return (
        <div className="CharStyle" onClick={props.clicked}>
            <p>{props.character}</p>
        </div>
    )
};

export default charComponent;