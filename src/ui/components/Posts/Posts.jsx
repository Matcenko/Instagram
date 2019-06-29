// eslint-disable-next-line no-restricted-imports
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Photo from '../Photo/Photo';
import style from './Posts.css';

class Posts extends Component {
    render () {
        const photos = this.props.posts.map((photo, index) => {
            const middlePostStyle = (index - 1) % 3 === 0 ? '3.5%' : '';
            return (<Photo
                url={'url(' + photo.url + ')'}
                likes={photo.likes}
                comments={photo.comments}
                onClick={() => { this.props.onClick(index); }}
                key={index}
                style={middlePostStyle}
            />);
        });
        return (
            <div className={style.posts}>
                {photos}
            </div>
        );
    }
}

Posts.propTypes = {
    posts: PropTypes.array,
    onClick: PropTypes.func
};
export default Posts;
