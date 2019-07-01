import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import style from './MainWall.css';
import User from '../User/User';
import Posts from '../Posts/Posts';
import PopUp from '../PopUp/PopUp';

class MainWall extends Component {
    constructor (props) {
        super(props);
        this.state = {
            footerLinksInfo:
                [{ name: 'ABOUT US', link: '#1' }, { name: 'SUPPORT', link: '#2' }, { name: 'PRESS', link: '#3' },
                    { name: 'API', link: '#4' }, { name: 'JOBS', link: '5#' }, { name: 'PRIVACY', link: '#6' },
                    { name: 'TERMS', link: '#7' }, { name: 'DIRECTORY', link: '#8' }, { name: 'PROFILES', link: '#9' },
                    { name: 'HASHTAGS', link: '#10' }, { name: 'LANGUAGE', link: '#11' }]
        };
    }

    renderPopUp () {
        return <PopUp/>;
    }

    render () {
        const footerLinks = this.state.footerLinksInfo.map((obj) => {
            return (<a className={style.footerLinks} key={obj.link} href={obj.link}>{obj.name}</a>);
        });

        const postsOrTagged = this.props.state.postsType ? this.props.state.posts : this.props.state.tagged;
        return (
            <main className={style.main}>
                {(this.props.state.renderPopUp !== undefined) && this.renderPopUp(postsOrTagged)}
                <User/>
                <hr className={style.hr}/>
                <div className={style.buttons}>
                    <button
                        className={classNames(style.postsButton, this.props.state.postsType && style.buttonClicked)}
                        onClick={() => this.props.postsTypePosts()}
                    >Posts
                    </button>
                    <button
                        className={classNames(style.taggedButton, !this.props.state.postsType && style.buttonClicked)}
                        onClick={() => this.props.postsTypeTagged()}
                    >Tagged
                    </button>
                </div>
                <Posts/>
                <footer className={style.footer}>
                    {footerLinks}
                </footer>
            </main>

        );
    }
}

export default connect(
    state => ({
        state: state.postsInfo
    }),
    dispatch => ({
        сhangePopup: (index) => dispatch({ type: 'CHANGE_POPUP', payload: index }),
        closePopUp: () => dispatch({ type: 'CLOSE_POPUP' }),
        postsTypePosts: () => dispatch({ type: 'POSTSTYPE_POSTS' }),
        postsTypeTagged: () => dispatch({ type: 'POSTSTYPE_TAGGED' })
    })
)(MainWall);
