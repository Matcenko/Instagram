import React, { Component } from 'react';
import style from './PopUp.css';
import Avatar from '../Avatar/Avatar';

class PopUp extends Component {
    render () {
        //ПРОБРОСИТЬ ДАННЫЕ О ПОЛЬЗОВАТЕЛЕ С MainWall
        return (
            <div className={style.popUp}>
                <img className={style.photo} src={this.props.url}/>
                <div className={style.photoInformation}>
                    <header>
                        <div className={style.user}>
                            <Avatar size={'50px'}/>
                            <span className={style.name}>JRRT</span>
                            <span> &bull;</span>
                            <button className={style.follow}>Follow</button>
                        </div>
                        <div className={style.points}></div>
                    </header>
                    <ul>
                        <hr/>
                        <li>wrfwe</li>
                        <hr/>
                    </ul>
                    <div>
                        <div className={style.buttons}>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                        <p>10 likes</p>
                    </div>
                    <div>
                        <hr/>
                        <input id={style.comment} type="text" placeholder='Add a comment...'/>
                        <button>Post</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default PopUp;
