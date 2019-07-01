import React, { Component } from 'react';
import Photo from '../Photo/Photo';
import style from './Posts.css';
import { connect } from 'react-redux';

class Posts extends Component {
    render () {
        const postsOrTagged = this.props.state.postsType ? this.props.state.posts : this.props.state.tagged;
        const photos = postsOrTagged.map((photo, index) => {
            const middlePostStyle = (index - 1) % 3 === 0 ? '3.5%' : '';
            return (<Photo
                url={'url(' + photo.url + ')'}
                likes={photo.likes}
                comments={photo.comments}
                onClick={() => {
                    this.props.сhangePopup(index);
                }}
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

export default connect(
    state => ({
        state: state.postsInfo
    }),
    dispatch => ({
        сhangePopup: (index) => {
            dispatch({ type: 'CHANGE_POPUP', payload: index });
        }
    })
)(Posts);
