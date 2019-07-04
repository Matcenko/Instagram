import React, {Component} from 'react';
import {bool, array, string, object, number, oneOfType} from 'prop-types';
import {connect} from 'react-redux';
import classNames from 'classnames';
import style from './PopUp.css';
import Avatar from '../Avatar/Avatar';

class PopUp extends Component {
    static defaultProps = {
        postsShouldRender: true,
        posts: [],
        tagged: [],
        userNick: '',
        popUpIndex: null
    };

    static propTypes = {
        postsShouldRender: bool,
        posts: array,
        tagged: array,
        userNick: string,
        popUpIndex: oneOfType([object, number]) // потому что null объект
    };

    state = {
        comment: ''
    };

    componentDidMount() {
        this.changePopUpByKeyword();
        document.body.style.overflow = 'hidden';
    }

    componentWillUnmount() {
        document.body.style.overflow = 'auto';
    }

    changePopUpByKeyword = () => {
        const postsOrTagged = this.props.postsShouldRender ? this.props.posts : this.props.tagged;
        window.addEventListener('keydown', (e) => {
            if (e.keyCode === 27) {
                e.preventDefault();
                this.props.handleClosePopUpClick();
            }
        });
        window.addEventListener('keyup', (e) => {
            if ((e.keyCode === 37) && (this.props.popUpIndex > 0)) {
                this.props.handleChangePopupClick(this.props.popUpIndex - 1);
            } else if ((e.keyCode === 39) && (this.props.popUpIndex < postsOrTagged.length - 1)) {
                this.props.handleChangePopupClick(this.props.popUpIndex + 1);
            }
        });
    };

    handleInputChange = (e) => {
        if (e.target.value.length < 100) {
            this.setState({comment: e.target.value});
        }
    }

    handleClearInputClick = () => {
        this.setState({comment: ''});
    };
    handleStopPropagationClick = (e) => {
        e.stopPropagation();
    };
    handleAddLikeButtonClick = (postsOrTagged) => {
        this.props.handleAddLikeClick(postsOrTagged);
        this.props.handleRemoveLikeClick(postsOrTagged);
    };
    handleLeftArrowClick = (e) => {
        if (this.props.popUpIndex > 0) {
            this.props.handleChangePopupClick(this.props.popUpIndex - 1);
            this.handleStopPropagationClick(e);
        }
    };
    handleRightArrowClick = (e, postsOrTagged) => {
        if (this.props.popUpIndex < postsOrTagged.length - 1) {
            this.props.handleChangePopupClick(this.props.popUpIndex + 1);
            this.handleStopPropagationClick(e);
        }
    };

    render() {
        const {
            postsShouldRender,
            posts,
            tagged,
            userNick,
            popUpIndex,
            handleClosePopUpClick,
            handleAddLikeClick,
            handleAddCommentClick
        } = this.props;

        const postsOrTagged = postsShouldRender ? posts : tagged;
        const popUpInfo = postsOrTagged[popUpIndex];
        const comments = popUpInfo.comments.map((comment, index) => {
            return (<li key={comment + index}> {comment} </li>);
        });
        const likeClass = popUpInfo.liked ? style.heartButtonRed : style.heartButton;
        const leftButtonClass = popUpIndex === 0 ? style.displayNone : style.arrowButton;
        const rightButtonClass = popUpIndex >= postsOrTagged.length - 1 ? style.displayNone : style.arrowButton;

        return (
            <div
                className={style.popUp}
                onClick={handleClosePopUpClick}
            >
                <button
                    className={classNames(leftButtonClass, style.transformArrow)}
                    onClick={this.handleLeftArrowClick}
                />
                <img
                    className={style.photo}
                    src={popUpInfo.url}
                    onDoubleClick={() => handleAddLikeClick(postsOrTagged)}
                    onClick={this.handleStopPropagationClick}
                />
                <div
                    className={style.photoInformation}
                    onClick={this.handleStopPropagationClick}
                >
                    <header className={style.header}>
                        <div className={style.user}>
                            <Avatar size="50px"/>
                            <span className={style.name}>{userNick}</span>
                            <span> &bull;</span>
                            <button className={style.follow}>Follow</button>
                        </div>
                        <div className={style.points}/>
                    </header>
                    <div className={style.commentsField}>
                        <hr className={style.grayHr}/>
                        <ul className={style.commentsUl}>
                            {comments}
                        </ul>
                        <hr className={style.grayHr}/>
                    </div>
                    <div className={style.navigation}>
                        <div className={style.buttons}>
                            <div className={classNames(style.leftButtons, style.popUpButton)}>
                                <div
                                    className={classNames(likeClass, style.popUpButton)}
                                    onClick={() => this.handleAddLikeButtonClick(postsOrTagged)}/>
                                <div className={classNames(style.commentButton, style.popUpButton)}/>
                                <div className={classNames(style.upLoadButton, style.popUpButton)}/>
                            </div>
                            <div className={classNames(style.saveButton, style.popUpButton)}/>
                        </div>
                        <p>{popUpInfo.likes} likes</p>
                        <hr className={style.grayHr}/>
                    </div>
                    <div className={style.comment}>
                        <input
                            className={style.addComment}
                            value={this.state.comment}
                            onChange={this.handleInputChange}
                            ref='input'
                            type='text'
                            placeholder='Add a comment...'/>
                        <button
                            className={style.post}
                            onClick={() => {
                                handleAddCommentClick(postsOrTagged, this.state.comment);
                                this.handleClearInputClick();
                            }}
                        >Post
                        </button>
                    </div>
                </div>
                <button
                    className={rightButtonClass}
                    onClick={(e) => this.handleRightArrowClick(e, postsOrTagged)}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    postsShouldRender: state.postsInfo.postsShouldRender,
    posts: state.postsInfo.posts,
    tagged: state.postsInfo.tagged,
    userNick: state.postsInfo.userInformation.nick,
    popUpIndex: state.postsInfo.popUpIndex
});

const mapDispatchToProps = dispatch => ({
    handleChangePopupClick: (index) => dispatch({type: 'CHANGE_POPUP', payload: index}),
    handleClosePopUpClick: () => dispatch({type: 'CLOSE_POPUP'}),
    handleAddLikeClick: (postsOrTagged) => dispatch({type: 'ADD_LIKE', payload: postsOrTagged}),
    handleRemoveLikeClick: (postsOrTagged) => dispatch({type: 'REMOVE_LIKE', payload: postsOrTagged}),
    handleAddCommentClick: (postsOrTagged, comment) => {
        dispatch({type: 'ADD_COMMENT', payload: postsOrTagged, comment: comment})
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(PopUp);
