import React, { Component } from 'react';
import { bool, array, object, number, oneOfType } from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import style from './MainWall.css';
import User from '../User/User';
import Posts from '../Posts/Posts';
import PopUp from '../PopUp/PopUp';

class MainWall extends Component {
    static defaultProps = {
        postsShouldRender: true,
        posts: [],
        tagged: [],
        popUpIndex: null
    };

    static propTypes = {
        postsShouldRender: bool,
        posts: array,
        tagged: array,
        popUpIndex: oneOfType([object, number]) // потому что null объект
    };

    state = {
        footerLinksInfo:
            [{ name: 'ABOUT US', link: '#1' }, { name: 'SUPPORT', link: '#2' }, { name: 'PRESS', link: '#3' },
                { name: 'API', link: '#4' }, { name: 'JOBS', link: '5#' }, { name: 'PRIVACY', link: '#6' },
                { name: 'TERMS', link: '#7' }, { name: 'DIRECTORY', link: '#8' }, { name: 'PROFILES', link: '#9' },
                { name: 'HASHTAGS', link: '#10' }, { name: 'LANGUAGE', link: '#11' }]
    };

    renderPopUp () {
        return <PopUp/>;
    }

    render () {
        const {
            postsShouldRender,
            posts,
            tagged,
            popUpIndex,
            handleEstablishPostsClick,
            handleEstablishTaggedClick
        } = this.props;
        const postsOrTagged = postsShouldRender ? posts : tagged;
        const footerLinks = this.state.footerLinksInfo.map((obj) => {
            return (<a className={style.footerLinks} key={obj.link} href={obj.link}>{obj.name}</a>);
        });

        return (
            <main className={style.main}>
                {(popUpIndex !== null) && this.renderPopUp(postsOrTagged)}
                <User/>
                <hr className={style.hr}/>
                <div className={style.buttons}>
                    <button
                        className={classNames(style.postsButton, { [style.buttonClicked]: postsShouldRender })}
                        onClick={handleEstablishPostsClick}
                    >Posts
                    </button>
                    <button
                        className={classNames(style.taggedButton, !postsShouldRender && style.buttonClicked)}
                        onClick={handleEstablishTaggedClick}
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

const mapStateToProps = state => ({
    postsShouldRender: state.postsInfo.postsShouldRender,
    posts: state.postsInfo.posts,
    tagged: state.postsInfo.tagged,
    popUpIndex: state.postsInfo.popUpIndex
});

const mapDispatchToProps = dispatch => ({
    handleEstablishPostsClick: () => dispatch({ type: 'ESTABLISH_POSTS' }),
    handleEstablishTaggedClick: () => dispatch({ type: 'ESTABLISH_TAGGED' })
});

export default connect(mapStateToProps, mapDispatchToProps)(MainWall);
