import style from './PopUpPhoto.css';
import React from 'react';
import PropTypes from 'prop-types';

PopUpPhoto.propTypes = {
    popUpInfoUrl: PropTypes.string,
    postsOrTagged: PropTypes.array,
    handleChangeLikeClick: PropTypes.func,
    handleStopPropagationClick: PropTypes.func
};
PopUpPhoto.defaultProps = {
    popUpInfo: {},
    postsOrTagged: []
};

export default function PopUpPhoto (props) {
    const {
        popUpInfoUrl,
        handleChangeLikeClick,
        postsOrTagged,
        handleStopPropagationClick
    } = props;
    return (
        <div className={style.container}>
            <img
                className={style.photo}
                src={popUpInfoUrl}
                onDoubleClick={() => handleChangeLikeClick(postsOrTagged, true)}
                onClick={handleStopPropagationClick}
            />
        </div>);
}
