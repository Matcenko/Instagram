import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from './Photo.css';

Photo.propTypes = {
    url: PropTypes.string,
    likes: PropTypes.number,
    comments: PropTypes.array,
    onClick: PropTypes.func,
    isMiddle: PropTypes.bool
};
Photo.defaultProps = {
    url: '',
    likes: 0,
    comments: '',
    isMiddle: true
};

export default function Photo (props) {
    const {
        url,
        likes,
        comments,
        onClick,
        isMiddle
    } = props;
    return (
        <button
            className={classNames(style.photo, { [style.middlePost]: isMiddle })}
            style={{
                backgroundImage: url
            }}
            onClick={onClick}
        >
            <div className={style.hoverPhoto}>
                <div>
                    <span className={style.likes}>
                        {likes}
                    </span>
                    <span className={style.comments}>
                        {comments.length}
                    </span>
                </div>
            </div>
        </button>
    );
}

;
