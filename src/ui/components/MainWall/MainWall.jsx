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
                    url: './src/ui/components/MainWall/images/Posts/Tolkien1.jpg',
                    likes: 14,
                    comments: 1
                },
                {
                    url: './src/ui/components/MainWall/images/Posts/Tolkien2.jpg',
                    likes: 19,
                    comments: 1
                },
                {
                    url: './src/ui/components/MainWall/images/Posts/Tolkien3.jpg',
                    likes: 0,
                    comments: 1
                },
                {
                    url: './src/ui/components/MainWall/images/Posts/Tolkien4.jpg',
                    likes: 0,
                    comments: 1
                }
            ],
            taggedClick: false,
            tagged: [
                {
                    url: './src/ui/components/MainWall/images/Tagged/BrotherHood.jpg',
                    likes: 20,
                    comments: 4
                },
                {
                    url: './src/ui/components/MainWall/images/Tagged/ChristopherTolkien.jpg',
                    likes: 4,
                    comments: 9
                },
                {
                    url: './src/ui/components/MainWall/images/Tagged/ChristopherTolkien2.jpg',
                    likes: 4,
                    comments: 1
                },
                {
                    url: './src/ui/components/MainWall/images/Tagged/ChristopherTolkien3.jpg',
                    likes: 0,
                    comments: 9
                },
                {
                    url: './src/ui/components/MainWall/images/Tagged/TolkienFilm.jpg',
                    likes: 6,
                    comments: 1
                }
            ],
            popUpRender: false,
            popUpPhotoUrl: null,
            userInformation: {
                nick: 'JRRT',
                fullName: 'John Ronald Reuel Tolkien',
                profession: 'Writer, poet, philologist, and academic',
                site: 'tolkien.co.uk'
            }
        };
    }

    handleOnClick(index, postsOrTagged) { //передача данных попапу
        this.setState({popUpRender: true}); // рендерим попАп
        this.setState({popUpPhotoUrl: postsOrTagged[index].url});  //пробрасываем ссылку на фото в попап
    }

    renderPopUp() {
        return <PopUp
            url={this.state.popUpPhotoUrl}
            userInformation={this.state.userInformation}
        />;
    }

    render () {
        const postsOrTagged = this.state.postsClick ? this.state.posts : this.state.tagged;
        return (
            <main className={style.main}>

                {this.state.popUpRender ? this.renderPopUp() : null}

                <User userInformation={this.state.userInformation}/>
                <hr className={style.hr}/>
                <div className={style.buttons}>
                    <button
                        className={style.PostsButton}
                        onClick={() => {
                            this.setState({
                                postsClick: true,
                                taggedClick: false
                            })
                        }}
                    >Posts
                    </button>
                    <button
                        className={style.TaggedButton}
                        onClick={() => {
                            this.setState({
                                postsClick: false,
                                taggedClick: true
                            })
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

                <footer>
                    <a href="#">ABOUT US</a>
                    <a href="#">SUPPORT</a>
                    <a href="#">PRESS</a>
                    <a href="#">API</a>
                    <a href="#">JOBS</a>
                    <a href="#">PRIVACY</a>
                    <a href="#">TERMS</a>
                    <a href="#">DIRECTORY</a>
                    <a href="#">PROFILES</a>
                    <a href="#">HASHTAGS</a>
                    <a href="#">LANGUAGE</a>
                </footer>
            </main>

        );
    }
}

export default MainWall;
