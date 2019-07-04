import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from './Avatar.css';

Avatar.propTypes = {
    size: PropTypes.string
};
// не использую дефолтпропс, потому что дефолтные значения прописаны в классе avatar

export default function Avatar (props) {
    function renderAvatar (size) {
        return (<img
            className={classNames(style.avatar)}
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
