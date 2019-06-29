// eslint-disable-next-line no-restricted-imports
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import style from './PopUp.css';
import Avatar from '../Avatar/Avatar';

class PopUp extends Component {
    constructor (props) {
        super(props);
        this.state = {
            comment: ''
        };
    }

    componentDidMount () {
        this.props.closePopUpByKeyword();
        document.body.style.overflow = 'hidden';
    }

    componentWillUnmount () {
        document.body.style.overflow = 'auto';
    }

    handleOnClickAddComment (e) {
        this.setState({
            comment: e.target.value
        });
    }

    handleOnClickPostComment () {
        this.refs.input.value = '';
    }

    render () {
        const
            comments = this.props.popUpInfo.comments.map((comment, index) => {
                return (<li key={comment + index}>{comment}</li>);
            });
        const
            liked = this.props.popUpInfo.liked ? style.heartButtonRed : style.heartButton;

        return (
            <div
                className={style.popUp}
                onClick={() => {
                    this.props.closePopUp();
                }}
            >
                <img
                    className={style.photo}
                    src={this.props.popUpInfo.url}
                    onDoubleClick={() => {
                        this.setState({ liked: true });
                        this.props.addLike();
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
                            <span className={style.name}>{this.props.userInformation.nick}</span>
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
                                        this.props.addLike()}
                                />
                                <div className={style.commentButton}/>
                                <div className={style.upLoadButton}/>
                            </div>
                            <div className={style.saveButton}/>
                        </div>
                        <p>{this.props.popUpInfo.likes} likes</p>
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
                            onClick={() => this.handleOnClickPostComment()}
                        >Post
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

PopUp.propTypes = {
    userInformation: PropTypes.object,
    popUpInfo: PropTypes.object,
    addLike: PropTypes.func,
    closePopUp: PropTypes.func
};

export default PopUp;
