import React, { Component } from 'react';
import style from './PopUp.css';
import Avatar from '../Avatar/Avatar';
import { connect } from 'react-redux';

class PopUp extends Component {
    constructor (props) {
        super(props);
        this.state = {
            comment: ''
        };
    }

    componentDidMount () {
        this.changePopUpByKeyword();
        document.body.style.overflow = 'hidden';
    }

    componentWillUnmount () {
        document.body.style.overflow = 'auto';
    }

    changePopUpByKeyword () {
        const postsOrTagged = this.props.state.postsType ? this.props.state.posts : this.props.state.tagged;
        window.addEventListener('keydown', (e) => {
            if (e.keyCode === 27) {
                e.preventDefault();
                this.props.closePopUp();
            }
        });
        window.addEventListener('keyup', (e) => {
            if ((e.keyCode === 37) && (this.props.state.renderPopUp > 0)) {
                this.props.сhangePopup(this.props.state.renderPopUp - 1);
            } else if ((e.keyCode === 39) && (this.props.state.renderPopUp < postsOrTagged.length - 1)) {
                this.props.сhangePopup(this.props.state.renderPopUp + 1);
            }
        });
    };

    handleOnClickAddComment (e) {
        this.setState({
            comment: e.target.value
        });
    }

    handleOnClickPostComment () {
        this.refs.input.value = '';
    }

    render () {
        const postsOrTagged = this.props.state.postsType ? this.props.state.posts : this.props.state.tagged;
        const popUpInfo = postsOrTagged[this.props.state.renderPopUp];
        const comments = popUpInfo.comments.map((comment, index) => {
            return (<li key={comment + index}>{comment}</li>);
        });
        const liked = popUpInfo.liked ? style.heartButtonRed : style.heartButton;

        return (
            <div
                className={style.popUp}
                onClick={() => {
                    this.props.closePopUp();
                }}
            >
                <img
                    className={style.photo}
                    src={popUpInfo.url}
                    onDoubleClick={() => {
                        this.setState({ liked: true });
                        this.props.addLike(postsOrTagged);
                    }}
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                />
                <div
                    className={style.photoInformation}
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    <header className={style.header}>
                        <div className={style.user}>
                            <Avatar size="50px"/>
                            <span className={style.name}>{this.props.state.userInformation.nick}</span>
                            <span> &bull;</span>
                            <button className={style.follow}>Follow</button>
                        </div>
                        <div className={style.points}/>
                    </header>
                    <div className={style.commentsField}>
                        <hr className={style.hr}/>
                        <ul className={style.ul}>
                            {comments}
                        </ul>
                        <hr className={style.hr}/>
                    </div>
                    <div className={style.navigation}>
                        <div className={style.buttons}>
                            <div className={style.leftButtons}>
                                <div
                                    className={liked}
                                    onClick={() =>
                                        this.props.addLike(postsOrTagged)}
                                />
                                <div className={style.commentButton}/>
                                <div className={style.upLoadButton}/>
                            </div>
                            <div className={style.saveButton}/>
                        </div>
                        <p>{popUpInfo.likes} likes</p>
                        <hr className={style.hr}/>
                    </div>
                    <div className={style.comment}>
                        <input
                            className={style.addComment}
                            onChange={(e) => {
                                this.handleOnClickAddComment(e);
                            }}
                            ref='input'
                            type="text"
                            placeholder='Add a comment...'/>
                        <button
                            className={style.post}
                            onClick={() => {
                                this.handleOnClickPostComment();
                                this.props.addComment(postsOrTagged, this.state.comment);
                            }}
                        >Post
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({
        state: state.postsInfo
    }),
    dispatch => ({
        сhangePopup: (index) => dispatch({ type: 'CHANGE_POPUP', payload: index }),
        closePopUp: () => dispatch({ type: 'CLOSE_POPUP' }),
        addLike: (postsOrTagged) => dispatch({ type: 'ADD_LIKE', payload: postsOrTagged }),
        addComment: (postsOrTagged, comment) => dispatch({ type: 'ADD_COMMENT', payload: postsOrTagged, comment: comment })
    })
)(PopUp);
