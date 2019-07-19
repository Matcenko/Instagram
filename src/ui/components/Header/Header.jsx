import React, { Component } from 'react';
import classNames from 'classnames';
import style from './Header.css';

const HEADER_SCROLL = 100;

export default class Header extends Component {
    state = {
        isScrolled: false
    };

    componentDidMount () {
        window.addEventListener('scroll', this.listenScrollEvent);
    }

    componentWillUnmount () {
        window.removeEventListener('scroll', this.listenScrollEvent);
    }

    listenScrollEvent = () => {
        this.setState({
            isScrolled: window.scrollY > HEADER_SCROLL
        });
    };

    render () {
        const { isScrolled } = this.state;
        return (
            <nav className={classNames(style.header, { [style.headerScroll]: isScrolled })}>
                <button className={classNames(style.logo, { [style.logoScroll]: isScrolled })}/>
                <input
                    className={style.search}
                    placeholder='Search'
                />
                <div className={style.buttons}>
                    <button className={style.logInButton}>Log&nbsp;In</button>
                    <button className={style.singUpButton}>Sing&nbsp;Up</button>
                </div>
            </nav>
        );
    }
}
