import style from './PopUpPhoto.css';
import React from 'react';
import PropTypes from 'prop-types';

PopUpPhoto.propTypes = {
    popUpInfo: PropTypes.object,
    postsOrTagged: PropTypes.array
};
PopUpPhoto.defaultProps = {
    popUpInfo: {},
    postsOrTagged: []
};

function PopUpPhoto (props) {
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

export default PopUpPhoto;
