import React from 'react';

const validationComponent = (props) => {
    let minLength = 5;
    let validationMessage = 'Text long enough';

    if (props.inputLength <= minLength){
        validationMessage = 'Text too short';
    }

    return (
        <div>
            <p>{validationMessage}</p>
        </div>
    )
};

export default validationComponent;