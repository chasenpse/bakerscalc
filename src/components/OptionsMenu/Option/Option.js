import React from 'react';

const Option = ({id, label, value, visible}) => {
    return (
        <div className={"option"}>
            {id}:{label}:{value}:{visible ? 'true' : 'false'}
        </div>
    );
}

export default Option;