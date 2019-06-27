import React, {Component} from 'react';
import style from './MainWall.css';
import User from '../User/User';
import Posts from '../Posts/Posts';
import PopUp from '../PopUp/PopUp';

class MainWall extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postsType: true, // переменная для определения рендеринга posts или tagged
            posts: [
                {
                    url: './src/ui/components/MainWall/images/Posts/tolkien1.jpg',
                    likes: 14,
                    comments: ['nice photo!', 'cool'],
                    liked: false
                },
                {
                    url: './src/ui/components/MainWall/images/Posts/tolkien2.jpg',
                    likes: 19,
                    comments: ['good photo!', 'nice'],
                    liked: false
                },
                {
                    url: './src/ui/components/MainWall/images/Posts/tolkien3.jpg',
                    likes: 0,
                    comments: ['I really like your books!!!'],
                    liked: false
                },
                {
                    url: './src/ui/components/MainWall/images/Posts/tolkien4.jpg',
                    likes: 0,
                    comments: ['cool', 'cool', 'cool', 'cool'],
                    liked: false
                }
            ],
            tagged: [
                {
                    url: './src/ui/components/MainWall/images/Tagged/tolkien1.jpg',
                    likes: 20,
                    comments: ['follow me'],
                    liked: false
                },
                {
                    url: './src/ui/components/MainWall/images/Tagged/tolkien2.jpg',
                    likes: 4,
                    comments: ['cool', 'good', 'nice'],
                    liked: false
                },
                {
                    url: './src/ui/components/MainWall/images/Tagged/tolkien3.jpg',
                    likes: 4,
                    comments: ['cool'],
                    liked: false
                },
                {
                    url: './src/ui/components/MainWall/images/Tagged/tolkien4.jpg',
                    likes: 0,
                    comments: ['ok'],
                    liked: false
                },
                {
                    url: './src/ui/components/MainWall/images/Tagged/tolkien5.jpg',
                    likes: 6,
                    comments: ['bad photo'],
                    liked: false
                }
            ],
            userInformation: {
                nick: 'JRRT',
                fullName: 'John Ronald Reuel Tolkien',
                profession: 'Writer, poet, philologist, and academic',
                site: 'tolkien.co.uk'
            },
            renderPopUp: undefined
        };
    }

    handleOnClickChangePost(index) { // передача данных попапу
        this.setState({
            renderPopUp: index
        });
    }

    handleOnClickAddLike(postsOrTagged) {
        if (postsOrTagged[this.state.renderPopUp].liked) {
            return;
        }

        const post = postsOrTagged.map((post, index) => {
            if (index === this.state.renderPopUp) {
                const {url, likes, comments} = post;
                return {url, likes: likes + 1, comments, liked: true};
            } else return post;
        });
        this.state.postsType
            ? this.setState({
                posts: post
            })
            : this.setState({
                tagged: post
            });
    }

    closePopUp() {
        this.setState({
            renderPopUp: undefined
        });
    }

    closePopUpByKeyword(postsOrTagged) {
        window.addEventListener('keydown', (e) => {
            if (e.keyCode === 27) {
                e.preventDefault();
                this.closePopUp();
            }
        });
        window.addEventListener('keyup', (e) => {
            if ((e.keyCode === 37) && (this.state.renderPopUp > 0)) {
                this.handleOnClickChangePost(this.state.renderPopUp - 1);
            }
            else if ((e.keyCode === 39) && (this.state.renderPopUp < postsOrTagged.length - 1)) {
                this.handleOnClickChangePost(this.state.renderPopUp + 1);
            }
        });
    };// добавляем два EventListener, чтобы иметь возможность отловить дефолтное
    // поведение esс и, при этом, избежать многократного перелистывания постов зажатой стрелкой

    renderPopUp(postsOrTagged) {
        return <PopUp
            popUpInfo={postsOrTagged[this.state.renderPopUp]}
            userInformation={this.state.userInformation}
            addLike={() => this.handleOnClickAddLike(postsOrTagged)}
            closePopUp={() => this.closePopUp()}
            closePopUpByKeyword={() => this.closePopUpByKeyword(postsOrTagged)}
        />;
    }

    render() {
        const footerLinksInfo =
            [{name: 'ABOUT US', link: '#1'}, {name: 'SUPPORT', link: '#2'}, {name: 'PRESS', link: '#3'},
                {name: 'API', link: '#4'}, {name: 'JOBS', link: '5#'}, {name: 'PRIVACY', link: '#6'},
                {name: 'TERMS', link: '#7'}, {name: 'DIRECTORY', link: '#8'}, {name: 'PROFILES', link: '#9'},
                {name: 'HASHTAGS', link: '#10'}, {name: 'LANGUAGE', link: '#11'}];

        const footerLinks = footerLinksInfo.map((obj) => {
            return (<a className={style.footerLinks} key={obj.link} href={obj.link}>{obj.name}</a>);
        });

        const postsOrTagged = this.state.postsType ? this.state.posts : this.state.tagged;
        return (
            <main className={ style.main}>
                {(this.state.renderPopUp !== undefined) && this.renderPopUp(postsOrTagged)}
                <User userInformation={this.state.userInformation}/>
                <hr className={style.hr}/>
                <div className={style.buttons}>
                    <button
                        className={style.postsButton}
                        onClick={() => {
                            this.setState({
                                postsType: true
                            });
                        }}
                    >Posts
                    </button>
                    <button
                        className={style.taggedButton}
                        onClick={() => {
                            this.setState({
                                postsType: false
                            });
                        }}
                    >Tagged
                    </button>
                </div>
                <Posts
                    posts={postsOrTagged}
                    onClick={(index) => {
                        this.handleOnClickChangePost(index, postsOrTagged);
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
