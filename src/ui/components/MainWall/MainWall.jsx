import React, { Component } from 'react';
import PropTypes from 'prop-types';
import establishPosts from '../../../actions/establishPosts';
import establishTagged from '../../../actions/establishTagged';
import { connect } from 'react-redux';
import classNames from 'classnames';
import style from './MainWall.css';
import User from '../User/User';
import Posts from '../Posts/Posts';
import PopUp from '../PostPopUp/PostPopUp';
import UnFollowPopUp from '../UnFollowPopUp/UnFollowPopUp';

class MainWall extends Component {
    static propTypes = {
        postsShouldRender: PropTypes.bool,
        postPopUpIndex: PropTypes.oneOfType([PropTypes.object, PropTypes.number]), // потому что null объект
        isUnFollowPopUp: PropTypes.bool,
        handleEstablishPostsClick: PropTypes.func,
        handleEstablishTaggedClick: PropTypes.func
    };
    static defaultProps = {
        postsShouldRender: true,
        postPopUpIndex: null,
        isUnFollowPopUp: false
    };

    state = {
        footerLinksInfo:
            [{ name: 'ABOUT US', link: '#1' }, { name: 'SUPPORT', link: '#2' }, { name: 'PRESS', link: '#3' },
                { name: 'API', link: '#4' }, { name: 'JOBS', link: '5#' }, { name: 'PRIVACY', link: '#6' },
                { name: 'TERMS', link: '#7' }, { name: 'DIRECTORY', link: '#8' }, { name: 'PROFILES', link: '#9' },
                { name: 'HASHTAGS', link: '#10' }, { name: 'LANGUAGE', link: '#11' }]
    };

    render () {
        const {
            postsShouldRender,
            postPopUpIndex,
            isUnFollowPopUp,
            handleEstablishPostsClick,
            handleEstablishTaggedClick
        } = this.props;
        const footerLinks = this.state.footerLinksInfo.map((obj) => {
            return (<a className={style.footerLinks} key={obj.link} href={obj.link}>{obj.name}</a>);
        });

        return (
            <main className={style.main}>
                <div>
                    {(postPopUpIndex !== null) && <PopUp/>}
                    {isUnFollowPopUp && <UnFollowPopUp/>}
                    <User/>
                    <hr className={style.hr}/>
                    <div className={style.buttons}>
                        <button
                            className={classNames(style.postsButton, { [style.buttonClicked]: postsShouldRender })}
                            onClick={handleEstablishPostsClick}
                        >Posts
                        </button>
                        <button
                            className={classNames(style.taggedButton, { [style.buttonClicked]: !postsShouldRender })}
                            onClick={handleEstablishTaggedClick}
                        >Tagged
                        </button>
                    </div>
                    <Posts/>
                </div>
                <footer className={style.footer}>
                    {footerLinks}
                </footer>
            </main>

        );
    }
}

const mapStateToProps = ({ postsInfo }) => ({
    postsShouldRender: postsInfo.postsShouldRender,
    postPopUpIndex: postsInfo.postPopUpIndex,
    isUnFollowPopUp: postsInfo.isUnFollowPopUp
});

const mapDispatchToProps = dispatch => ({
    handleEstablishPostsClick: () => dispatch(establishPosts()),
    handleEstablishTaggedClick: () => dispatch(establishTagged())
});

export default connect(mapStateToProps, mapDispatchToProps)(MainWall);
