import React, {Component} from 'react';
import classNames from 'classnames';
import style from './Header.css';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            headerScrollClass: null
        };
        this.listenScrollEvent = this.listenScrollEvent.bind(this);
    }

    componentDidMount () {
        window.addEventListener('scroll', this.listenScrollEvent);
    }
    componentWillUnmount (){
        window.removeEventListener('scroll', this.listenScrollEvent);
    }

    listenScrollEvent() {
        if (window.scrollY > 100) {
            this.setState({
                headerScrollClass: style.headerScrollClass
            })
        }
        if (window.scrollY < 100){
            this.setState({
                headerScrollClass: ''
            })
        }
    }

    render() {
        return (
            <nav className={classNames(style.header, this.state.headerScrollClass)}>
                <button className={style.logo}/>
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
