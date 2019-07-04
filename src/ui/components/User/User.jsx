import React, { Component } from 'react';
import { string } from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import style from './User.css';
import Avatar from '../Avatar/Avatar.jsx';

class User extends Component {
    static defaultProps = {
        nick: '',
        fullName: '',
        profession: '',
        site: ''
    };

    static propTypes = {
        nick: string,
        fullName: string,
        profession: string,
        site: string
    };

    state = {
        follow: false,
        posts: 10,
        followers: 9,
        following: 10
    };

    handleToFollowClick = () => {
        this.setState({
            followers: this.state.follow ? this.state.followers - 1 : this.state.followers + 1,
            follow: !this.state.follow
        });
    };

    render () {
        const {
            nick,
            fullName,
            profession,
            site
        } = this.props;
        return (
            <header className={style.user}>
                <Avatar/>
                <div className={style.userInformation}>
                    <div className={style.nameAndFollow}>
                        <span className={style.nickName}> {nick}</span>
                        <button
                            className={classNames(style.followButton, !this.state.follow && style.followingButton)}
                            onClick={this.handleToFollowClick}
                        >{this.state.follow ? 'Following' : 'Follow'}
                        </button>
                    </div>
                    <div className={style.followers}>
                        <span className={style.followersInfo}><span className={style.bold}>{this.state.posts}</span> posts </span>
                        <span className={style.followersInfo}><span className={style.bold}>{this.state.followers}</span> followers </span>
                        <span className={style.followersInfo}><span className={style.bold}>{this.state.following}</span> following </span>
                    </div>
                    <div className={style.nameWorkWeb}>
                        <span>{fullName}</span>
                        <span>{profession} </span>
                        <a className={style.bold}
                            href={`https:\/\/${site}`}>{site}</a>
                    </div>
                </div>
            </header>
        );
    }
}

const mapStateToProps = state => ({
    nick: state.postsInfo.userInformation.nick,
    fullName: state.postsInfo.userInformation.fullName,
    profession: state.postsInfo.userInformation.profession,
    site: state.postsInfo.userInformation.site
});

export default connect(mapStateToProps)(User);
