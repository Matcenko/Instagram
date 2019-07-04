import React from 'react';
import PropTypes from 'prop-types';
import style from './Avatar.css';

Avatar.defaultProps = {
    size: '150px'
};

Avatar.propTypes = {
    size: PropTypes.string
};

export default function Avatar (props) {
    function renderAvatar (size) {
        return (<img
            className={style.avatar}
            style={{
                width: size,
                height: size,
                backgroundSize: `${size} ${size}`
            }}
        />);
    }
    return (
        <div>
            {renderAvatar(props.size)}
        </div>
    );
}
