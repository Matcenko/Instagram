import React, { Component } from 'react';
import classNames from 'classnames';
import style from './Header.css';

class Header extends Component {
    constructor (props) {
        super(props);
        this.state = {
            scrollY: null
        };
    }

    componentDidMount () {
        window.addEventListener('scroll', this.listenScrollEvent);
    }

    componentWillUnmount () {
        window.removeEventListener('scroll', this.listenScrollEvent);
    }

    listenScrollEvent = () => {
        if (window.scrollY) {
            this.setState({
                scrollY: window.scrollY
            });
        }
    };

    render () {
        let headerScrollClass;
        let logoScrollClass;
        if (this.state.scrollY > 100) {
            headerScrollClass = style.headerScrollClass;
            logoScrollClass = style.logoScroll;
        }

        return (
            <nav className={classNames(style.header, headerScrollClass)}>
                <button className={classNames(style.logo, logoScrollClass)}/>
                <input
                    className={style.search}
                    placeholder='Search'
                />
                <div>
                    <button className={style.logInButton}>Log In</button>
                    <button className={style.singUpButton}>Sing Up</button>
                </div>
            </nav>
        );
    }
}

export default Header;
