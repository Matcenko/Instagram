import React, {Component} from 'react';
import classNames from 'classnames';
import style from './PopUp.css';
import Avatar from '../Avatar/Avatar';
import {connect} from 'react-redux';

class PopUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: ''
        };
    }

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
    handleInputChange(e) {
        if (e.target.value.length < 100) {
            this.setState({ comment: e.target.value });
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
        const postsOrTagged = this.props.postsShouldRender ? this.props.posts : this.props.tagged;
        const popUpInfo = postsOrTagged[this.props.popUpIndex];
        const comments = popUpInfo.comments.map((comment, index) => {
            return (<li key={comment + index}> {comment} </li>);
        });
        const likeClass = popUpInfo.likeClass ? style.heartButtonRed : style.heartButton;
        const leftButtonClass = this.props.popUpIndex === 0 ? style.displayNone : style.arrowButton;
        const rightButtonClass = this.props.popUpIndex >= postsOrTagged.length - 1 ? style.displayNone : style.arrowButton;
        return (
            <div
                className={style.popUp}
                onClick={this.props.handleClosePopUpClick}
            >
                <button
                    className={classNames(leftButtonClass, style.transformArrow)}
                    onClick={(e) => this.handleLeftArrowClick(e)}
                />
                <img
                    className={style.photo}
                    src={popUpInfo.url}
                    onDoubleClick={() => this.props.handleAddLikeClick(postsOrTagged)}
                    onClick={(e) => this.handleStopPropagationClick(e)}
                />
                <div
                    className={style.photoInformation}
                    onClick={(e) => this.handleStopPropagationClick(e)}
                >
                    <header className={style.header}>
                        <div className={style.user}>
                            <Avatar size="50px"/>
                            <span className={style.name}>{this.props.userInformation.nick}</span>
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
                            onChange={(e) => this.handleInputChange(e)}
                            ref='input'
                            type='text'
                            placeholder='Add a comment...'/>
                        <button
                            className={style.post}
                            onClick={() => {
                                this.props.handleAddCommentClick(postsOrTagged, this.state.comment);
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

export default connect(
    state => ({
        postsShouldRender: state.postsInfo.postsShouldRender,
        posts: state.postsInfo.posts,
        tagged: state.postsInfo.tagged,
        userInformation: state.postsInfo.userInformation,
        popUpIndex: state.postsInfo.popUpIndex
    }),
    dispatch => ({
        handleChangePopupClick: (index) => dispatch({type: 'CHANGE_POPUP', payload: index}),
        handleClosePopUpClick: () => dispatch({type: 'CLOSE_POPUP'}),
        handleAddLikeClick: (postsOrTagged) => dispatch({type: 'ADD_LIKE', payload: postsOrTagged}),
        handleRemoveLikeClick: (postsOrTagged) => dispatch({type: 'REMOVE_LIKE', payload: postsOrTagged}),
        handleAddCommentClick: (postsOrTagged, comment) => {
            dispatch({type: 'ADD_COMMENT', payload: postsOrTagged, comment: comment})
        }
    })
)(PopUp);
