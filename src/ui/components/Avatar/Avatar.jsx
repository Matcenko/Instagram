import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from './Avatar.css';

Avatar.propTypes = {
    avatarIsSmall: PropTypes.bool,
    avatarIsMiddle: PropTypes.bool
};
Avatar.defaultProps = {
    avatarIsSmall: false,
    avatarIsMiddle: false
};
export default function Avatar (props) {
    const { avatarIsSmall, avatarIsMiddle } = props;
    return (
        <div>
            <div className={classNames(style.container, { [style.avatarIsSmallCont]: avatarIsSmall, [style.avatarIsMiddleCont]: avatarIsMiddle })}>
                <img className={classNames(style.avatar, { [style.avatarIsSmall]: avatarIsSmall, [style.avatarIsMiddle]: avatarIsMiddle })}/>
            </div>
        </div>
    );
}
