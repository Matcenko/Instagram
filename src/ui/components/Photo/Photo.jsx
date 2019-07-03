import PropTypes from 'prop-types';
import React, { Component } from 'react';
import style from './Photo.css';

class Photo extends Component {
    render () {
        return (
            <button
                className={style.photo}
                style={{
                    backgroundImage: this.props.url,
                    marginRight: this.props.margin,
                    marginLeft: this.props.margin
                }}
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
                            {this.props.comments.length}
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
    comments: PropTypes.array,
    onClick: PropTypes.func,
    margin: PropTypes.string
};
export default Photo;
