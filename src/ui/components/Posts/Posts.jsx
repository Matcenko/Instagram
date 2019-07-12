import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import style from './Posts.css';
import Photo from '../Photo/Photo';

class Posts extends Component {
    static defaultProps = {
        postsShouldRender: true,
        posts: [],
        tagged: []
    };

    static propTypes = {
        postsShouldRender: PropTypes.bool,
        posts: PropTypes.array,
        tagged: PropTypes.array
    };

    render () {
        const {
            postsShouldRender,
            posts,
            tagged,
            handleChangePopupClick
        } = this.props;

        const postsOrTagged = postsShouldRender ? posts : tagged;
        const photos = postsOrTagged.map((photo, index) => {
            const isMiddle = (index - 1) % 3 === 0;
            return (<Photo
                url={`url(${photo.url})`}
                likes={photo.likes}
                comments={photo.comments}
                onClick={() => {
                    handleChangePopupClick(index);
                }}
                key={index}
                isMiddle={isMiddle}
            />);
        });
        return (
            <div className={style.posts}>
                {photos}
            </div>
        );
    }
}

const mapStateToProps = ({ postsInfo }) => ({
    postsShouldRender: postsInfo.postsShouldRender,
    posts: postsInfo.posts,
    tagged: postsInfo.tagged
});

const mapDispatchToProps = dispatch => ({
    handleChangePopupClick: (index) => dispatch({ type: 'CHANGE_POPUP', payload: index })
});
export default connect(mapStateToProps, mapDispatchToProps)(Posts);
