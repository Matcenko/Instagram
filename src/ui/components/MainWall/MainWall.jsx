import React, { Component } from 'react';
import style from './MainWall.css';
import User from '../User/User';
import Posts from '../Posts/Posts';
import PopUp from '../PopUp/PopUp';

class MainWall extends Component {
    constructor (props) {
        super(props);
        this.state = {
            posts: [
                {
                    url: './src/ui/components/MainWall/images/Tolkien1.jpg',
                    likes: 14,
                    comments: 1
                },
                {
                    url: './src/ui/components/MainWall/images/Tolkien2.jpg',
                    likes: 19,
                    comments: 1
                },
                {
                    url: './src/ui/components/MainWall/images/Tolkien3.jpg',
                    likes: 0,
                    comments: 1
                },
                {
                    url: './src/ui/components/MainWall/images/Tolkien4.jpg',
                    likes: 0,
                    comments: 1
                }
            ],
            tagged: [
                {
                    url: 'https://i0.wp.com/rusmonitor.com/wp-content/uploads/2019/02/5515.jpg',
                    likes: 14,
                    comments: 1
                },
                {
                    url: 'https://vignette.wikia.nocookie.net/lotr/images/b/bd/Christopher-Tolkien-220x300.jpg/revision/latest?cb=20160620084929&path-prefix=ru',
                    likes: 14,
                    comments: 1
                },
                {
                    url: 'https://tolkien.su/media/iblock/e26/christopher_tolkien_1_.jpg',
                    likes: 14,
                    comments: 1
                },
                {
                    url: 'https://i2.wp.com/www.henneth-annun.ru/wp-content/uploads/2013/04/ChristopherTolkien.jpg',
                    likes: 14,
                    comments: 1
                },
                {
                    url: 'https://beztabu.net/uploads/770x433_DIR/media_news/2019/02/5c63cc7b82ca3905155313.jpg',
                    likes: 14,
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

    handleOnClick (index) { //передача данных попапу
        this.setState({ popUpRender: true } ); // рендерим попАп
        this.setState({ popUpPhotoUrl: this.state.posts[index].url });  //пробрасываем ссылку на фото в попап
    }

    renderPopUp () {
        return <PopUp
            url={this.state.popUpPhotoUrl}
            userInformation={this.state.userInformation}
        />;
    }

    render () {
        return (

            <main className={style.main}>

                { this.state.popUpRender ? this.renderPopUp() : null}

                <User userInformation={this.state.userInformation}/>
                <hr className={style.hr}/>
                <div className={style.buttons}>
                    <button className={style.PostsButton}> Posts</button>
                    <button className={style.TaggedButton}> Tagged</button>
                </div>

                <Posts
                    posts={this.state.posts}
                    onClick={(index) => {
                        this.handleOnClick(index);
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
