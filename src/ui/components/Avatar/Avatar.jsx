import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from './Avatar.css';

Avatar.propTypes = {
    avatarIsSmall: PropTypes.string
};
Avatar.defaultProps = {
    avatarIsSmall: false
};
export default function Avatar(props) {
    const {avatarIsSmall} = props
    return (
        <div>
            <div className={classNames(style.container, { [style.avatarIsSmallCont]: avatarIsSmall })}>
                <img className={classNames(style.avatar, { [style.avatarIsSmall]: avatarIsSmall })}/>
            </div>
        </div>
    );
}
