import React, { Component } from 'react';
import PropTypes from 'prop-types';
import changePopup from '../../../actions/changePopup';
import closePopup from '../../../actions/closePopup';
import changePostInfo from '../../../actions/changePostInfo';
import { connect } from 'react-redux';
import classNames from 'classnames';
import style from './PostPopUp.css';
import PopUpPhoto from './components/PopUpPhoto/PopUpPhoto';
import PopUpHeader from './components/PopUpHeader/PopUpHeader';
import CommentsField from './components/CommentsField/CommentsField';
import Navigation from './components/Navigation/Navigation';
import AddComment from './components/AddComment/AddComment';

const ESC_KEY_CODE = 27;
const LEFT_ARROW_KEY_CODE = 37;
const RIGHT_ARROW_KEY_CODE = 39;

class PostPopUp extends Component {
    static defaultProps = {
        postsShouldRender: true,
        posts: [],
        tagged: [],
        postPopUpIndex: null
    };

    static propTypes = {
        postsShouldRender: PropTypes.bool,
        posts: PropTypes.array,
        tagged: PropTypes.array,
        postPopUpIndex: PropTypes.oneOfType([PropTypes.object, PropTypes.number]), // потому что null объект
        handleClosePopUpClick: PropTypes.func,
        handleChangePopupClick: PropTypes.func,
        changePostInfo: PropTypes.func
    };

    state = {
        comment: ''
    };

    componentDidMount () {
        this.changePopUpByKeyword();
        document.body.style.overflow = 'hidden';
    }

    componentWillUnmount () {
        document.body.style.overflow = 'auto';
        window.removeEventListener('keydown', this.ecsListener);
        window.removeEventListener('keyup', this.arrowListener);
    }

    changePopUpByKeyword = () => {
        window.addEventListener('keydown', this.ecsListener);
        window.addEventListener('keyup', this.arrowListener);
    };
    ecsListener = (e) => {
        if (e.keyCode === ESC_KEY_CODE) {
            e.preventDefault();
            this.props.handleClosePopUpClick();
        }
    };
    arrowListener = (e) => {
        const postsOrTagged = this.props.postsShouldRender ? this.props.posts : this.props.tagged;
        if ((e.keyCode === LEFT_ARROW_KEY_CODE) && (this.props.postPopUpIndex > 0)) {
            this.props.handleChangePopupClick(this.props.postPopUpIndex - 1);
        } else if ((e.keyCode === RIGHT_ARROW_KEY_CODE) && (this.props.postPopUpIndex < postsOrTagged.length - 1)) {
            this.props.handleChangePopupClick(this.props.postPopUpIndex + 1);
        }
    };
    handleChangeLikeClick = (postsOrTagged, like) => {
        if (((postsOrTagged[this.props.postPopUpIndex].liked) && (like)) ||
            ((!postsOrTagged[this.props.postPopUpIndex].liked) && (!like))) {
            return postsOrTagged;
        }
        const changed = postsOrTagged.map((post, index) => {
            if (index === this.props.postPopUpIndex) {
                const { url, likes, comments } = post;
                const value = like ? 1 : -1;
                return { url, likes: likes + value, comments, liked: like };
            } else return post;
        });
        this.props.changePostInfo(changed);
    };

    handleStopPropagationClick = (e) => {
        e.stopPropagation();
    };
    handleLeftArrowClick = (e) => {
        if (this.props.postPopUpIndex > 0) {
            this.props.handleChangePopupClick(this.props.postPopUpIndex - 1);
            this.handleStopPropagationClick(e);
        }
    };
    handleRightArrowClick = postsOrTagged => e => {
        if (this.props.postPopUpIndex < postsOrTagged.length - 1) {
            this.props.handleChangePopupClick(this.props.postPopUpIndex + 1);
            this.handleStopPropagationClick(e);
        }
    };
    renderPopUpPhoto = (postsOrTagged, popUpInfo) => {
        return (
            <PopUpPhoto
                postsOrTagged={postsOrTagged}
                popUpInfoUrl={popUpInfo.url}
                handleStopPropagationClick={this.handleStopPropagationClick}
                handleChangeLikeClick={this.handleChangeLikeClick}
            />);
    };
    renderNavigation = (postsOrTagged, popUpInfo) => {
        return (
            <Navigation
                handleChangeLikeClick={this.handleChangeLikeClick}
                postsOrTagged={postsOrTagged}
                popUpInfo={popUpInfo}
            />);
    };

    render () {
        const {
            postsShouldRender,
            posts,
            tagged,
            postPopUpIndex,
            handleClosePopUpClick
        } = this.props;
        const {
            handleLeftArrowClick,
            handleStopPropagationClick,
            renderNavigation,
            renderPopUpPhoto,
            handleRightArrowClick
        } = this;

        const postsOrTagged = postsShouldRender ? posts : tagged;
        const popUpInfo = postsOrTagged[postPopUpIndex];
        const leftButtonClass = postPopUpIndex === 0 ? style.displayNone : style.arrowButton;
        const rightButtonClass = postPopUpIndex >= postsOrTagged.length - 1 ? style.displayNone : style.arrowButton;

        return (
            <div
                className={style.popUp}
                onClick={handleClosePopUpClick}
            >
                <button className={style.closePopup}/>
                <button
                    className={classNames(leftButtonClass, style.transformArrow)}
                    onClick={handleLeftArrowClick}
                />
                <div className={style.bigPopupField}>
                    {this.renderPopUpPhoto(postsOrTagged, popUpInfo)}
                    <div
                        className={style.photoInformation}
                        onClick={handleStopPropagationClick}
                    >
                        <PopUpHeader/>
                        <CommentsField popUpInfo={popUpInfo}/>
                        {renderNavigation(postsOrTagged, popUpInfo)}
                        <AddComment postsOrTagged={postsOrTagged}/>
                    </div>
                </div>
                <div className={style.smallPopupField}>
                    <PopUpHeader/>
                    {renderPopUpPhoto(postsOrTagged, popUpInfo)}
                    {renderNavigation(postsOrTagged, popUpInfo)}
                </div>
                <button
                    className={rightButtonClass}
                    onClick={handleRightArrowClick(postsOrTagged)}
                />
            </div>
        );
    }
}

const mapStateToProps = ({ postsInfo }) => ({
    postsShouldRender: postsInfo.postsShouldRender,
    posts: postsInfo.posts,
    tagged: postsInfo.tagged,
    postPopUpIndex: postsInfo.postPopUpIndex
});

const mapDispatchToProps = dispatch => ({
    handleChangePopupClick: (index) => dispatch(changePopup(index)),
    handleClosePopUpClick: () => dispatch(closePopup()),
    changePostInfo: (changed) => dispatch(changePostInfo(changed))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostPopUp);
