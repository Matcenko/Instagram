import React, { Component } from 'react';
import style from './Photo.css';
import classNames from 'classnames';
import PropTypes from 'prop-types';

class Photo extends Component {
    render () {
        return (
            <button
                className={classNames(style.photo)}
                style={{ backgroundImage: this.props.url }}
                onClick={() => {
                    this.props.onClick();
                }}
            >
                <div className={style.hoverPhoto}>
                    <div>
                        <span className={style.likes}>
                            {this.props.likes}
                        </span>
                        <span className={style.comments}>
                            {this.props.comments}
                        </span>
                    </div>
                </div>
            </button>
        );
    }
}

Photo.propTypes = {
    url: PropTypes.string,
    likes: PropTypes.number,
    comments: PropTypes.number
}
export default Photo;
