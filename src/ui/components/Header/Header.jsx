import React, {Component} from 'react';
import classNames from 'classnames';
import style from './Header.css';

class Header extends Component {
    constructor (props) {
        super(props);
        this.state =
            {
                searchClick: null
            };
    }

    render () {
        return (
            <header ref='list' className={style.header}>
                <button className={style.logo}></button>
                <input
                    className={classNames(style.search, this.state.searchClick)}
                    placeholder='Search'
                    onClick={() => {
                        this.setState({
                            searchClick: style.searchClick
                        });
                    }}
                />
                <div>
                    <button className={style.logInButton}>Log In</button>
                    <button className={style.singUpButton}>Sing Up</button>
                </div>
            </header>
        );
    }
}

export default Header;
