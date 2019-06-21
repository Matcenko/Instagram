import React, { Component } from 'react';
import MainWall from '../../components/MainWall/MainWall';
import Header from '../../components/Header/Header';
import PopUp from  '../../components/PopUp/PopUp'

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
