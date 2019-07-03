import React, { Component } from 'react';
import Photo from '../Photo/Photo';
import style from './Posts.css';
import { connect } from 'react-redux';

class Posts extends Component {
    render () {
        const postsOrTagged = this.props.postsShouldRender ? this.props.posts : this.props.tagged;
        const photos = postsOrTagged.map((photo, index) => {
            const middlePostStyle = (index - 1) % 3 === 0 ? '3.5%' : '';
            return (<Photo
                url={ `url(${photo.url})`}
                likes={photo.likes}
                comments={photo.comments}
                onClick={() => {
                    this.props.handleChangePopupClick(index);
                }}
                key={index}
                margin={middlePostStyle}
            />);
        });
        return (
            <div className={style.posts}>
                {photos}
            </div>
        );
    }
}
export default connect(
    state => ({
        postsShouldRender: state.postsInfo.postsShouldRender,
        posts: state.postsInfo.posts,
        tagged: state.postsInfo.tagged
    }),
    dispatch => ({
        handleChangePopupClick: (index) => dispatch({ type: 'CHANGE_POPUP', payload: index })
    })
)(Posts);
