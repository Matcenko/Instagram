import React, {Component} from 'react';
import Avatar from '../Avatar/Avatar.jsx';
import style from './User.css';

class User extends Component {
    constructor (props) {
        super(props);
        this.state = {
            follow: false,
            posts: 10,
            followers: 9,
            following: 10
        };
    }

    render () {
        const follow = this.state.follow ? 'Following' : 'Follow';
        return (
            <div className={style.user}>
                <Avatar/>
                <div className={style.userInformation}>
                    <div>
                        <span className={style.nickName}>{this.props.userInformation.nick}</span>
                        <button
                            className={this.state.follow ? style.followButton : style.followButton + ' ' + style.followingButton}
                            onClick={() => {
                                this.setState({
                                    followers: this.state.follow ? this.state.followers - 1 : this.state.followers + 1,
                                    follow: !this.state.follow
                                });
                            }}
                        >{follow}
                        </button>
                    </div>
                    <div className={style.followers}>
                        <span><span className={style.bold}>{this.state.posts}</span> posts </span>
                        <span><span className={style.bold}>{this.state.followers}</span> followers </span>
                        <span><span className={style.bold}>{this.state.following}</span> following </span>
                    </div>
                    <div className={style.nameWorkWeb}>
                        <span>{this.props.userInformation.fullName}</span>
                        <span>{this.props.userInformation.profession} </span>
                        <a className={style.bold} href={this.props.userInformation.site}>{this.props.userInformation.site}</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default User;
