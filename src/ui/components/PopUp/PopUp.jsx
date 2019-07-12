import React, {Component} from 'react';
import PropTypes from 'prop-types';
import changePopup from '../../../actions/changePopup';
import closePopup from '../../../actions/closePopup';
import changePostInfo from '../../../actions/changePostInfo';
import {connect} from 'react-redux';
import classNames from 'classnames';
import style from './PopUp.css';
import Avatar from '../Avatar/Avatar';

const ESC_KEY_CODE = 27;
const LEFT_ARROW_KEY_CODE = 37;
const RIGHT_ARROW_KEY_CODE = 39;

class PopUp extends Component {
    static defaultProps = {
        postsShouldRender: true,
        posts: [],
        tagged: [],
        userNick: '',
        popUpIndex: null
    };

    static propTypes = {
        postsShouldRender: PropTypes.bool,
        posts: PropTypes.array,
        tagged: PropTypes.array,
        userNick: PropTypes.string,
        popUpIndex: PropTypes.oneOfType([PropTypes.object, PropTypes.number]) // потому что null объект
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
        window.removeEventListener('keydown', this.ecsListener);
        window.removeEventListener('keyup', this.arrowListener);
    }

    changePopUpByKeyword = () => {
        window.addEventListener('keydown', this.ecsListener);
        window.addEventListener('keyup', this.arrowListener);
    };
    ecsListener = (e) => {
        if (e.keyCode === ESC_KEY_CODE) {
            e.preventDefault();
            this.props.handleClosePopUpClick();
        }
    };
    arrowListener = (e) => {
        const postsOrTagged = this.props.postsShouldRender ? this.props.posts : this.props.tagged;
        if ((e.keyCode === LEFT_ARROW_KEY_CODE) && (this.props.popUpIndex > 0)) {
            this.props.handleChangePopupClick(this.props.popUpIndex - 1);
        } else if ((e.keyCode === RIGHT_ARROW_KEY_CODE) && (this.props.popUpIndex < postsOrTagged.length - 1)) {
            this.props.handleChangePopupClick(this.props.popUpIndex + 1);
        }
    };
    handleChangeLikeClick = (postsOrTagged, like) => {
        if (((postsOrTagged[this.props.popUpIndex].liked) && (like)) ||
            ((!postsOrTagged[this.props.popUpIndex].liked) && (!like))) {
            return postsOrTagged;
        }
        const changed = postsOrTagged.map((post, index) => {
            if (index === this.props.popUpIndex) {
                const {url, likes, comments} = post;
                const value = like ? 1 : -1;
                return {url, likes: likes + value, comments, liked: like};
            } else return post;
        });
        this.props.changePostInfo(changed);
    };
    handleAddCommentClick = (postsOrTagged) => {
        const commentaries = postsOrTagged.map((post, index) => {
            if (index === this.props.popUpIndex) {
                const {comments} = post;
                comments.push(this.state.comment);
                return {...post, comments};
            } else return post;
        });
        this.props.changePostInfo(commentaries);
    }
    handleInputChange = (e) => {
        if (e.target.value.length < 100) {
            this.setState({comment: e.target.value});
        }
    };
    handleClearInputClick = () => {
        this.setState({comment: ''});
    };
    handleStopPropagationClick = (e) => {
        e.stopPropagation();
    };
    handleAddLikeButtonClick = (postsOrTagged) => {
        this.handleChangeLikeClick(postsOrTagged, true);
        this.handleChangeLikeClick(postsOrTagged, false);
    };
    handleLeftArrowClick = (e) => {
        if (this.props.popUpIndex > 0) {
            this.props.handleChangePopupClick(this.props.popUpIndex - 1);
            this.handleStopPropagationClick(e);
        }
    };
    handleRightArrowClick = postsOrTagged => e => {
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
            handleClosePopUpClick
        } = this.props;

        const postsOrTagged = postsShouldRender ? posts : tagged;
        const popUpInfo = postsOrTagged[popUpIndex];
        const likeClass = popUpInfo.liked ? style.heartButtonRed : style.heartButton;
        const leftButtonClass = popUpIndex === 0 ? style.displayNone : style.arrowButton;
        const rightButtonClass = popUpIndex >= postsOrTagged.length - 1 ? style.displayNone : style.arrowButton;

        return (
            <div
                className={style.popUp}
                onClick={handleClosePopUpClick}
            >
                <button className={style.closePopup}/>
                <button
                    className={classNames(leftButtonClass, style.transformArrow)}
                    onClick={this.handleLeftArrowClick}
                />
                <div className={style.popupField}>
                    <img
                        className={style.photo}
                        src={popUpInfo.url}
                        onDoubleClick={() => this.handleChangeLikeClick(postsOrTagged, true)}
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
                                {popUpInfo.comments.map((comment, index) => {
                                    return (<li key={comment + index}> {comment} </li>);
                                })}
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
                                    this.handleAddCommentClick(postsOrTagged);
                                    this.handleClearInputClick();
                                }}
                            >Post
                            </button>
                        </div>
                    </div>


                </div>
                <button
                    className={rightButtonClass}
                    onClick={this.handleRightArrowClick(postsOrTagged)}
                />
            </div>
        );
    }
}

const mapStateToProps = ({postsInfo}) => ({
    postsShouldRender: postsInfo.postsShouldRender,
    posts: postsInfo.posts,
    tagged: postsInfo.tagged,
    userNick: postsInfo.userInformation.nick,
    popUpIndex: postsInfo.popUpIndex
});

const mapDispatchToProps = dispatch => ({
    handleChangePopupClick: (index) => dispatch(changePopup(index)),
    handleClosePopUpClick: () => dispatch(closePopup()),
    changePostInfo: (changed) => dispatch(changePostInfo(changed))
});

export default connect(mapStateToProps, mapDispatchToProps)(PopUp);
