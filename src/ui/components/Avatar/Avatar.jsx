import React from 'react';
import style from './Avatar.css';
import PropTypes from 'prop-types';

function Avatar (props) {
    function renderAvatar (size) {
        return (<img
            className={style.avatar}
            style={{
                width: size,
                height: size,
                backgroundSize: `${size}  ${size}`
            }}
        />);
    }
    return (
        <div>
            {renderAvatar(props.size)}
        </div>
    );
}

Avatar.defaultProps = {
    size: '150px'
};

Avatar.propTypes = {
    size: PropTypes.string
};

export default Avatar;
