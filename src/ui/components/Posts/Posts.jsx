import React, {Component} from 'react';
import {bool, array} from 'prop-types';
import {connect} from 'react-redux';
import style from './Posts.css';
import Photo from '../Photo/Photo';

class Posts extends Component {
    static defaultProps = {
        postsShouldRender: true,
        posts: [],
        tagged: []
    };

    static propTypes = {
        postsShouldRender: bool,
        posts: array,
        tagged: array
    };

    render() {
        const {
            postsShouldRender,
            posts,
            tagged,
            handleChangePopupClick
        } = this.props;

        const postsOrTagged = postsShouldRender ? posts : tagged;
        const photos = postsOrTagged.map((photo, index) => {
            const middlePostStyle = (index - 1) % 3 === 0 ? '3.5%' : '';
            return (<Photo
                url={`url(${photo.url})`}
                likes={photo.likes}
                comments={photo.comments}
                onClick={() => {
                    handleChangePopupClick(index);
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


const mapStateToProps = state => ({
    postsShouldRender: state.postsInfo.postsShouldRender,
    posts: state.postsInfo.posts,
    tagged: state.postsInfo.tagged
});

const mapDispatchToProps = dispatch => ({
    handleChangePopupClick: (index) => dispatch({type: 'CHANGE_POPUP', payload: index})
});
export default connect(mapStateToProps, mapDispatchToProps)(Posts);
