import React from 'react';
import PropTypes from 'prop-types';
import followUser from '../../../actions/followUser';
import changeUnFollowPopUp from '../../../actions/changeUnFollowPopUp';
import { connect } from 'react-redux';
import classNames from 'classnames';
import style from './User.css';
import Avatar from '../Avatar/Avatar.jsx';

User.defaultProps = {
    nick: '',
    fullName: '',
    profession: '',
    site: '',
    follow: false,
    followers: 0,
    following: 0
};

User.propTypes = {
    nick: PropTypes.string,
    fullName: PropTypes.string,
    profession: PropTypes.string,
    site: PropTypes.string,
    follow: PropTypes.bool,
    followers: PropTypes.number,
    following: PropTypes.number
};

function User (props) {
    const {
        nick,
        fullName,
        profession,
        site,
        posts,
        follow,
        followers,
        following,
        handleFollowUserClick,
        handleChangeUnFollowPopUp
    } = props;

    return (
        <div className={style.container}>
            <header className={style.user}>
                <Avatar/>
                <div className={style.userInformation}>
                    <div className={style.nameAndFollow}>
                        <span className={classNames(style.nickName, style.bold)}> {nick}</span>
                        <button
                            className={classNames(style.followButton, { [style.followingButton]: !follow })}
                            onClick={() => {
                                if (follow) {
                                    handleChangeUnFollowPopUp();
                                } else {
                                    handleFollowUserClick();
                                }
                            }}
                        >{follow ? 'Following' : 'Follow'}
                        </button>
                    </div>
                    <div className={style.followers}>
                        <span className={style.followersInfo}><span
                            className={style.bold}>{posts}</span> posts </span>
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
            <div className={style.followersInfoMobile}>
                <hr className={style.hr}/>
                <div className={style.followersInfoMobileText}>
                    <p>
                        <span className={style.bold}>{posts}</span>
                        <br/>
                        <span className={style.greyText}>posts</span>
                    </p>
                    <p>
                        <span className={style.bold}>{followers}</span>
                        <br/>
                        <span className={style.greyText}>followers</span>
                    </p>
                    <p>
                        <span className={style.bold}>{following}</span>
                        <br/>
                        <span className={style.greyText}>following</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = ({ postsInfo }) => ({
    nick: postsInfo.userInformation.nick,
    fullName: postsInfo.userInformation.fullName,
    profession: postsInfo.userInformation.profession,
    site: postsInfo.userInformation.site,
    posts: postsInfo.posts.length,
    follow: postsInfo.userInformation.follow,
    followers: postsInfo.userInformation.followers,
    following: postsInfo.userInformation.following
});

const mapDispatchToProps = dispatch => ({
    handleFollowUserClick: () => dispatch(followUser()),
    handleChangeUnFollowPopUp: () => dispatch(changeUnFollowPopUp())
});
export default connect(mapStateToProps, mapDispatchToProps)(User);
