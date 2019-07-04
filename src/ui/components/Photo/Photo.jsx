import React from 'react';
import classNames from 'classnames';
import { string, number, array, func, bool } from 'prop-types';
import style from './Photo.css';

Photo.propTypes = {
    url: string,
    likes: number,
    comments: array,
    onClick: func,
    middlePostStyle: bool
};

function Photo (props) {
    const {
        url,
        likes,
        comments,
        onClick,
        middlePostStyle
    } = props;
    const middlePost = middlePostStyle && style.middlePostStyle;
    return (
        <button
            className={classNames(style.photo, middlePost)}
            style={{
                backgroundImage: url || ''
            }}
            onClick={() => {
                onClick();
            }}
        >
            <div className={style.hoverPhoto}>
                <div>
                    <span className={style.likes}>
                        {likes || 0}
                    </span>
                    <span className={style.comments}>
                        {comments.length || 0}
                    </span>
                </div>
            </div>
        </button>
    );
}

export default Photo;
