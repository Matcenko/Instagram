import React from 'react';
import PropTypes from 'prop-types';
import changeUnFollowPopUp from '../../../actions/changeUnFollowPopUp';
import followUser from '../../../actions/followUser';
import { connect } from 'react-redux';
import style from './UnFollowPopUp.css';
import Avatar from '../Avatar/Avatar';

UnFollowPopUp.propTypes = {
    nick: PropTypes.string
};
UnFollowPopUp.defaultProps = {
    nick: ''
};

function UnFollowPopUp (props) {
    const {
        nick,
        handleChangeUnFollowPopUp,
        handleFollowUserClick
    } = props;
    return (
        <div
            className={style.popUp}
            onClick={props.handleChangeUnFollowPopUp}>
            <div
                className={style.unFollow}
                onClick={e => e.stopPropagation()}
            >
                <div className={style.container}>
                    <Avatar avatarIsMiddle/>
                    <p className={style.UnfollowUserText}>Unfollow @{nick}?</p>
                </div>
                <div className={style.container}>
                    <hr className={style.hrStyle}/>
                    <button
                        className={style.UnfollowButton}
                        onClick={() => {
                            handleChangeUnFollowPopUp();
                            handleFollowUserClick();
                        }}
                    >Unfollow
                    </button>
                </div>
                <div className={style.container}>
                    <hr className={style.hrStyle}/>
                    <button
                        className={style.cancelButton}
                        onClick={handleChangeUnFollowPopUp}
                    >Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = ({ postsInfo }) => ({
    nick: postsInfo.userInformation.nick
});
const mapDispatchToProps = dispatch => ({
    handleChangeUnFollowPopUp: () => dispatch(changeUnFollowPopUp()),
    handleFollowUserClick: () => dispatch(followUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(UnFollowPopUp);
