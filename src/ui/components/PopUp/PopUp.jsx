import React, { Component } from 'react';
import style from './PopUp.css';
import Avatar from '../Avatar/Avatar';

class PopUp extends Component {
    render () {

        //РАЗОБРАТЬСЯ С КОЛЕСОМ ПРОКРУТКИ КОММЕНТАРИЕВ
        return (
            <div className={style.popUp}>
                <img className={style.photo} src={this.props.url}/>
                <div className={style.photoInformation}>
                    <header className={style.header}>
                        <div className={style.user}>
                            <Avatar size={'50px'}/>
                            <span className={style.name}>{this.props.userInformation.nick}</span>
                            <span> &bull;</span>
                            <button className={style.follow}>Follow</button>
                        </div>
                        <div className={style.points}></div>
                    </header>
                    <div className={style.commentsField}>
                        <hr/>
                        <ul>
                            <li>nice photo!</li>
                            <li>nice photo!</li>
                            <li>nice photo!</li>
                            <li>nice photo!</li>
                            <li>bad photo!</li>
                            <li>bad photo!</li>
                            <li>bad photo!</li>
                            <li>bad photo!</li>
                            <li>bad photo!</li>
                        </ul>
                        <hr/>
                    </div>
                    <div className={style.navigation}>
                        <div className={style.buttons}>
                            <div className={style.leftButtons}>
                                <div id={style.heartButton}></div>
                                <div id={style.commentButton}></div>
                                <div id={style.upLoadButton}></div>
                            </div>
                            <div id={style.saveButton}></div>
                        </div>
                        <p>10 likes</p>
                        <hr/>
                    </div>
                    <div className={style.comment}>
                        <div>
                            <input id={style.comment} type="text" placeholder='Add a comment...'/>
                            <button>Post</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PopUp;
