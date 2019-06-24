import React, {Component} from 'react';
import style from './PopUp.css';
import Avatar from '../Avatar/Avatar';
import PropTypes from 'prop-types';

class PopUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            liked: false
        };
    }

    render() {
        const liked = this.state.liked ? style.heartButtonRed : style.heartButton;
        return (
            <div className={style.popUp}>
                <img
                    className={style.photo}
                    src={this.props.popUpInfo.photoUrl}
                    onDoubleClick={() => {
                        this.setState({ liked: true });
                    }}
                />
                <div className={style.photoInformation}>
                    <header className={style.header}>
                        <div className={style.user}>
                            <Avatar size="50px"/>
                            <span className={style.name}>{this.props.userInformation.nick}</span>
                            <span> &bull;</span>
                            <button className={style.follow}>Follow</button>
                        </div>
                        <div className={style.points}></div>
                    </header>
                    <div className={style.commentsField}>
                        <hr className={style.hr}/>
                        <ul className={style.ul}>

                        </ul>
                        <hr className={style.hr}/>
                    </div>
                    <div className={style.navigation}>
                        <div className={style.buttons}>
                            <div className={style.leftButtons}>
                                <div className={liked}></div>
                                <div className={style.commentButton}></div>
                                <div className={style.upLoadButton}></div>
                            </div>
                            <div className={style.saveButton}></div>
                        </div>
                        <p>{this.props.popUpInfo.likes} likes</p>
                        <hr className={style.hr}/>
                    </div>
                    <div className={style.comment}>
                        <input className={style.addComment} type="text" placeholder='Add a comment...'/>
                        <button className={style.post}>Post</button>
                    </div>
                </div>
            </div>
        );
    }
}

PopUp.propTypes = {
    userInformation: PropTypes.object,
    popUpInfo: PropTypes.object
}

export default PopUp;
