import React, { Component } from 'react';
import Photo from '../Photo/Photo';
import style from './Posts.css';
import PropTypes from "prop-types";

class Posts extends Component {
    render () {
        const photos = this.props.posts.map((photo, index) => {
            return (<Photo
                url={'url(' + photo.url + ')'}
                likes={photo.likes}
                comments={photo.comments}
                onClick={() => { this.props.onClick(index); }}
                key= { '' + index }
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
}
export default Posts;
