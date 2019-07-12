import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from './Avatar.css';

Avatar.propTypes = {
    size: PropTypes.string
};

export default function Avatar (props) {
    const { size } = props;
    return (
        <div>
            <img
                className={classNames(style.avatar)}
                style={{
                    width: size,
                    height: size,
                    backgroundSize: `${size} ${size}`
                }}
            />
        </div>
    );
}
