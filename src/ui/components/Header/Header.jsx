import React, { Component } from 'react';
import classNames from 'classnames';
import style from './Header.css';

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
        if (window.scrollY > 100) {
            this.setState({
                isScrolled: true
            });
        } else if (window.scrollY < 100) {
            this.setState({
                isScrolled: false
            });
        }
    };

    render () {
        return (
            <nav className={classNames(style.header, { [style.headerScroll]: this.state.isScrolled })}>
                <button className={classNames(style.logo, { [style.logoScroll]: this.state.isScrolled })}/>
                <input
                    className={style.search}
                    placeholder='Search'
                />
                <div>
                    <button
                        className={style.logInButton}>Log In</button>
                    <button className={style.singUpButton}>Sing Up</button>
                </div>
            </nav>
        );
    }
}
