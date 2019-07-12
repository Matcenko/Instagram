import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
        nick: PropTypes.string,
        fullName: PropTypes.string,
        profession: PropTypes.string,
        site: PropTypes.string
    };

    state = {
        follow: false,
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
            site,
            posts
        } = this.props;
        const {
            follow,
            followers,
            following
        } = this.state;
        return (
            <header className={style.user}>
                <Avatar/>
                <div className={style.userInformation}>
                    <div className={style.nameAndFollow}>
                        <span className={style.nickName}> {nick}</span>
                        <button
                            className={classNames(style.followButton, {[style.followingButton]: !follow })}
                            onClick={this.handleToFollowClick}
                        >{follow ? 'Following' : 'Follow'}
                        </button>
                    </div>
                    <div className={style.followers}>
                        <span className={style.followersInfo}><span className={style.bold}>{posts}</span> posts </span>
                        <span className={style.followersInfo}><span className={style.bold}>{followers}</span> followers </span>
                        <span className={style.followersInfo}><span className={style.bold}>{following}</span> following </span>
                    </div>
                    <div className={style.nameWorkWeb}>
                        <span>{fullName}</span>
                        <span>{profession} </span>
                        <a className={style.bold}
                            href={`https://${site}`}>{site}</a>
                    </div>
                </div>
            </header>
        );
    }
}

const mapStateToProps = ({ postsInfo }) =>  ({
    nick: postsInfo.userInformation.nick,
    fullName: postsInfo.userInformation.fullName,
    profession: postsInfo.userInformation.profession,
    site: postsInfo.userInformation.site,
    posts: postsInfo.posts.length
});

export default connect(mapStateToProps)(User);
