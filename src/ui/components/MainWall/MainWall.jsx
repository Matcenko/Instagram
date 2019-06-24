import React, {Component} from 'react';
import style from './MainWall.css';
import User from '../User/User';
import Posts from '../Posts/Posts';
import PopUp from '../PopUp/PopUp';

class MainWall extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postsClick: true,
            posts: [
                {
                    url: './src/ui/components/MainWall/images/Posts/tolkien1.jpg',
                    likes: 14,
                    comments: 1
                },
                {
                    url: './src/ui/components/MainWall/images/Posts/tolkien2.jpg',
                    likes: 19,
                    comments: 1
                },
                {
                    url: './src/ui/components/MainWall/images/Posts/tolkien3.jpg',
                    likes: 0,
                    comments: 1
                },
                {
                    url: './src/ui/components/MainWall/images/Posts/tolkien4.jpg',
                    likes: 0,
                    comments: 1
                }
            ],
            taggedClick: false,
            tagged: [
                {
                    url: './src/ui/components/MainWall/images/Tagged/tolkien1.jpg',
                    likes: 20,
                    comments: 4
                },
                {
                    url: './src/ui/components/MainWall/images/Tagged/tolkien2.jpg',
                    likes: 4,
                    comments: 9
                },
                {
                    url: './src/ui/components/MainWall/images/Tagged/tolkien3.jpg',
                    likes: 4,
                    comments: 1
                },
                {
                    url: './src/ui/components/MainWall/images/Tagged/tolkien4.jpg',
                    likes: 0,
                    comments: 9
                },
                {
                    url: './src/ui/components/MainWall/images/Tagged/tolkien5.jpg',
                    likes: 6,
                    comments: 1
                }
            ],
            popUpState: {
                render: false,
                photoUrl: null,
                likes: null,
                comments: null
            },
            userInformation: {
                nick: 'JRRT',
                fullName: 'John Ronald Reuel Tolkien',
                profession: 'Writer, poet, philologist, and academic',
                site: 'tolkien.co.uk'
            }
        };
    }


    handleOnClick(index, postsOrTagged) { // передача данных попапу
        this.setState({
            popUpState: {
                ...this.state.popUpState,
                render: true,
                photoUrl: postsOrTagged[index].url,
                likes: postsOrTagged[index].likes,
                comments: postsOrTagged[index].comments
            }
        });
    }

    renderPopUp() {
        return <PopUp
            popUpInfo={this.state.popUpState}
            userInformation={this.state.userInformation}
        />;
    }

    render() {
        const footerLinksInfo =
            [{name: 'ABOUT US', link: '#'}, {name: 'SUPPORT', link: '#'}, {name: 'PRESS', link: '#'},
                {name: 'API', link: '#'}, {name: 'JOBS', link: '#'}, {name: 'PRIVACY', link: '#'},
                {name: 'TERMS', link: '#'}, {name: 'DIRECTORY', link: '#'}, {name: 'PROFILES', link: '#'},
                {name: 'HASHTAGS', link: '#'}, {name: 'LANGUAGE', link: '#'}];

        const footerLinks = footerLinksInfo.map((obj) => {
            return (<a className={style.footerLinks} href={obj.link}>{obj.name}</a>);
        });
        const postsOrTagged = this.state.postsClick ? this.state.posts : this.state.tagged;

        return (
            <main className={style.main}>
                {this.state.popUpState.render && this.renderPopUp()}
                <User userInformation={this.state.userInformation}/>
                <hr className={style.hr}/>
                <div className={style.buttons}>
                    <button
                        className={style.postsButton}
                        onClick={() => {
                            this.setState({
                                postsClick: true,
                                taggedClick: false
                            });
                        }}
                    >Posts
                    </button>
                    <button
                        className={style.taggedButton}
                        onClick={() => {
                            this.setState({
                                postsClick: false,
                                taggedClick: true
                            });
                        }}
                    >Tagged
                    </button>
                </div>
                <Posts
                    posts={postsOrTagged}
                    onClick={(index) => {
                        this.handleOnClick(index, postsOrTagged);
                    }}
                />
                <footer className={style.footer}>
                    {footerLinks}
                </footer>
            </main>

        );
    }
}

export default MainWall;
