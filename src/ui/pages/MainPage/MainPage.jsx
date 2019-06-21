import React, { Component } from 'react';
import MainWall from '../../components/MainWall/MainWall';
import Header from '../../components/Header/Header';

class MainPage extends Component {

    render () {
        return (
            <div>
                <Header/>
                <MainWall/>
            </div>
        );
    }
}

export default MainPage;
