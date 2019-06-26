import React, { Component } from 'react';
import Avatar from '../Avatar/Avatar.jsx';
import classNames from 'classnames';
import style from './User.css';
import PropTypes from 'prop-types';

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
        return (
            <header className={style.user}>
                <Avatar/>
                <div className={style.userInformation}>
                    <div className={style.nameAndFollow}>
                        <span className={style.nickName}> {this.props.userInformation.nick}</span>
                        <button
                            className={ classNames(style.followButton, !this.state.follow && style.followingButton)}
                            onClick={() => {
                                this.setState({
                                    followers: this.state.follow ? this.state.followers - 1 : this.state.followers + 1,
                                    follow: !this.state.follow
                                });
                            }}
                        >{this.state.follow ? 'Following' : 'Follow'}
                        </button>
                    </div>
                    <div className={style.followers}>
                        <span className={style.followersInfo}><span className={style.bold}>{this.state.posts}</span> posts </span>
                        <span className={style.followersInfo}><span className={style.bold}>{this.state.followers}</span> followers </span>
                        <span className={style.followersInfo}><span className={style.bold}>{this.state.following}</span> following </span>
                    </div>
                    <div className={style.nameWorkWeb}>
                        <span>{this.props.userInformation.fullName}</span>
                        <span>{this.props.userInformation.profession} </span>
                        <a className={style.bold} href={this.props.userInformation.site}>{this.props.userInformation.site}</a>
                    </div>
                </div>
            </header>
        );
    }
}
User.propTypes = {
    userInformation: PropTypes.object
}
export default User;
