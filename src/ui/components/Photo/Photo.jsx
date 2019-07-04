import React from 'react';
import {string, number, array, func} from 'prop-types';
import style from './Photo.css';


Photo.propTypes = {
    url: string,
    likes: number,
    comments: array,
    onClick: func,
    margin: string
};

function Photo(props) {
    const {
        url,
        likes,
        comments,
        onClick,
        margin
    } = props;
    return (
        <button
            className={style.photo}
            style={{
                backgroundImage: url || '',
                marginRight: margin || '',
                marginLeft: margin || ''
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
