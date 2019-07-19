import React from 'react';
import PropTypes from 'prop-types';
import followUser from '../../../../../actions/followUser';
import changeUnFollowPopUp from '../../../../../actions/changeUnFollowPopUp';
import { connect } from 'react-redux';
import classNames from 'classnames';
import style from './PopUpHeader.css';
import Avatar from '../../../Avatar/Avatar';

PopUpHeader.propTypes = {
    userNick: PropTypes.string,
    follow: PropTypes.bool,
    handleFollowUserClick: PropTypes.func,
    handleChangeUnFollowPopUp: PropTypes.func
};
PopUpHeader.defaultProps = {
    userNick: '',
    follow: false
};

function PopUpHeader (props) {
    const {
        userNick,
        follow,
        handleFollowUserClick,
        handleChangeUnFollowPopUp
    } = props;

    return (
        <header className={style.header}>
            <div className={style.user}>
                <Avatar avatarIsSmall/>
                <span className={classNames(style.name, style.addIconBefore, style.nickNameMargin)}>{userNick}</span>
                <span> &bull;</span>
                <button
                    className={classNames(style.follow, style.name, { [style.following]: follow })}
                    onClick={() => {
                        if (follow) {
                            handleChangeUnFollowPopUp();
                        } else {
                            handleFollowUserClick();
                        }
                    }
                    }
                >
                    {follow ? 'Following' : 'Follow'}
                </button>
            </div>
            <div className={style.points}/>
        </header>
    );
}

const mapStateToProps = ({ postsInfo }) => ({
    userNick: postsInfo.userInformation.nick,
    follow: postsInfo.userInformation.follow
});

const mapDispatchToProps = dispatch => ({
    handleFollowUserClick: () => dispatch(followUser()),
    handleChangeUnFollowPopUp: () => dispatch(changeUnFollowPopUp())
});

export default connect(mapStateToProps, mapDispatchToProps)(PopUpHeader);
