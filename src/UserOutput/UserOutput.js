import React from 'react';
import './UserOutput.css';

const userOutput = (props) => {
    return (
        <div class='UserOutput'>
            <p>Username: {props.userName}</p>
            <p>Paragraph 2</p>
        </div>
    );
};

export default userOutput;

