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
        const postsOrTagged = this.props.postsShouldRender ? this.props.posts : this.props.tagged;

        return (
            <main className={style.main}>
                {(this.props.popUpIndex !== null) && this.renderPopUp(postsOrTagged)}
                <User/>
                <hr className={style.hr}/>
                <div className={style.buttons}>
                    <button
                        className={classNames(style.postsButton, { [style.buttonClicked ]: this.props.postsShouldRender })}
                        onClick={this.props.handleEstablishPostsClick}
                    >Posts
                    </button>
                    <button
                        className={classNames(style.taggedButton, !this.props.postsShouldRender && style.buttonClicked)}
                        onClick={this.props.handleEstablishTaggedClick}
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
        postsShouldRender: state.postsInfo.postsShouldRender,
        posts: state.postsInfo.posts,
        tagged: state.postsInfo.tagged,
        popUpIndex: state.postsInfo.popUpIndex
    }),
    dispatch => ({
        handleEstablishPostsClick: () => dispatch({ type: 'ESTABLISH_POSTS' }),
        handleEstablishTaggedClick: () => dispatch({ type: 'ESTABLISH_TAGGED' })
    })
)(MainWall);
