// eslint-disable-next-line no-restricted-imports
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Photo from '../Photo/Photo';
import style from './Posts.css';
import { connect } from 'react-redux';

class Posts extends Component {
    render () {
        const photos = this.props.posts.map((photo, index) => {
            const middlePostStyle = (index - 1) % 3 === 0 ? '3.5%' : '';
            return (<Photo
                url={'url(' + photo.url + ')'}
                likes={photo.likes}
                comments={photo.comments}
                onClick={() => { this.props.сhangePopup(index); }}
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
    posts: PropTypes.array
};

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
