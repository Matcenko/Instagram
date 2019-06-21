import React, { Component } from 'react';
import style from './Photo.css';
import classNames from 'classnames';

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
                        <span id={style.likes}>
                            {this.props.likes}
                        </span>
                        <span id={style.comments}>
                            {this.props.comments}
                        </span>
                    </div>
                </div>
            </button>
        );
    }
}

export default Photo;
