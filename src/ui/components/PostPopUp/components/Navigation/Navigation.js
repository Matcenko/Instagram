import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from './Navigation.css';

Navigation.propTypes = {
    postsOrTagged: PropTypes.array,
    popUpInfo: PropTypes.object
};
Navigation.defaultProps = {
    popUpInfo: {},
    postPopUpIndex: PropTypes.oneOfType([PropTypes.object, PropTypes.number]) // потому что null объект

};

function Navigation (props) {
    const {
        handleChangeLikeClick,
        postsOrTagged,
        popUpInfo
    } = props;

    function handleAddLikeButtonClick (postsOrTagged) {
        handleChangeLikeClick(postsOrTagged, true);
        handleChangeLikeClick(postsOrTagged, false);
    }
    const likeClass = popUpInfo.liked ? style.heartButtonRed : style.heartButton;

    return (
        <div className={style.navigation}>
            <div className={style.buttons}>
                <div className={classNames(style.leftButtons, style.popUpButton)}>
                    <div
                        className={classNames(likeClass, style.popUpButton)}
                        onClick={() => handleAddLikeButtonClick(postsOrTagged)}/>
                    <div className={classNames(style.commentButton, style.popUpButton)}/>
                    <div className={classNames(style.upLoadButton, style.popUpButton)}/>
                </div>
                <div className={classNames(style.saveButton, style.popUpButton)}/>
            </div>
            <p>{popUpInfo.likes} likes</p>
            <hr className={style.grayHr}/>
        </div>
    );
}

export default Navigation;
