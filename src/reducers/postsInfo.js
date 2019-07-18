import {
    CHANGE_POPUP,
    CLOSE_POPUP,
    ESTABLISH_POSTS,
    ESTABLISH_TAGGED,
    CHANGE_POST_INFO,
    FOLLOW_USER,
    CHANGE_UN_FOLLOW_POPUP
} from '../types/types';

const initialState = {
    postsShouldRender: true, // переменная для определения рендеринга posts или tagged
    posts: [
        {
            url: './src/ui/components/MainWall/images/Posts/tolkien1.jpg',
            likes: 14,
            comments: [{
                comment: 'nice photo!',
                date: { year: 2019, month: 6, day: 16, hours: 14, minutes: 25, seconds: 14 }
            }, { comment: 'cool', date: { year: 2019, month: 6, day: 13, hours: 2, minutes: 22, seconds: 14 } }],
            liked: false
        },
        {
            url: './src/ui/components/MainWall/images/Posts/tolkien2.jpg',
            likes: 19,
            comments: [{
                comment: 'good photo!',
                date: { year: 2018, month: 6, day: 1, hours: 2, minutes: 22, seconds: 14 }
            }, { comment: 'nice', date: { year: 2019, month: 6, day: 10, hours: 2, minutes: 22, seconds: 14 } }],
            liked: false
        },
        {
            url: './src/ui/components/MainWall/images/Posts/tolkien3.jpg',
            likes: 0,
            comments: [{
                comment: 'I really like your books!!!',
                date: { year: 2019, month: 2, day: 10, hours: 2, minutes: 22, seconds: 14 }
            }],

            liked: false
        },
        {
            url: './src/ui/components/MainWall/images/Posts/tolkien4.jpg',
            likes: 0,
            comments: [{
                comment: 'cool',
                date: { year: 2019, month: 6, day: 10, hours: 2, minutes: 22, seconds: 14 }
            }, { comment: 'cool', date: { year: 2019, month: 6, day: 10, hours: 2, minutes: 22, seconds: 14 } }],

            liked: false
        }
    ],
    tagged: [
        {
            url: './src/ui/components/MainWall/images/Tagged/tolkien1.jpg',
            likes: 20,
            comments: [{ comment: 'follow me', date: { year: 2019, month: 6, day: 10, hours: 2, minutes: 22, seconds: 14 } }],

            liked: false
        },
        {
            url: './src/ui/components/MainWall/images/Tagged/tolkien2.jpg',
            likes: 4,
            comments: [{
                comment: 'cool',
                date: { year: 2019, month: 6, day: 10, hours: 2, minutes: 22, seconds: 14 }
            }, { comment: 'good', date: { year: 2019, month: 6, day: 10, hours: 2, minutes: 22, seconds: 14 } }, {
                comment: 'nice',
                date: { year: 2019, month: 6, day: 10, hours: 2, minutes: 22, seconds: 14 }
            }],

            liked: false
        },
        {
            url: './src/ui/components/MainWall/images/Tagged/tolkien3.jpg',
            likes: 4,
            comments: [{ comment: 'cool', date: { year: 2019, month: 6, day: 10, hours: 2, minutes: 22, seconds: 14 } }],

            liked: false
        },
        {
            url: './src/ui/components/MainWall/images/Tagged/tolkien4.jpg',
            likes: 0,
            comments: [{ comment: 'ok', date: { year: 2019, month: 6, day: 10, hours: 2, minutes: 22, seconds: 14 } }],

            liked: false
        },
        {
            url: './src/ui/components/MainWall/images/Tagged/tolkien5.jpg',
            likes: 6,
            comments: [{ comment: 'ok!', date: { year: 2019, month: 6, day: 10, hours: 2, minutes: 22, seconds: 14 } }],
            liked: false
        }
    ],
    userInformation: {
        nick: 'JohnTolkien',
        fullName: 'John Ronald Reuel Tolkien',
        profession: 'Writer, poet, philologist, and academic',
        site: 'tolkien.co.uk',
        follow: true,
        followers: 956,
        following: 23
    },

    postPopUpIndex: null,
    isUnFollowPopUp: false
};

export default function (state = initialState, action) {
    switch (action.type) {
    case CHANGE_POPUP:
        return { ...state, postPopUpIndex: action.payload };
    case CLOSE_POPUP:
        return { ...state, postPopUpIndex: null };
    case ESTABLISH_POSTS:
        return { ...state, postsShouldRender: true };
    case ESTABLISH_TAGGED:
        return { ...state, postsShouldRender: false };
    case CHANGE_UN_FOLLOW_POPUP:
        return { ...state, isUnFollowPopUp: !state.isUnFollowPopUp };
    case CHANGE_POST_INFO:
        return state.postsShouldRender ? { ...state, posts: action.payload } : { ...state, tagged: action.payload };
    case FOLLOW_USER:
        return { ...state,
            userInformation:
                    { ...state.userInformation,
                        follow: !state.userInformation.follow,
                        followers: state.userInformation.follow ? state.userInformation.followers - 1 : state.userInformation.followers + 1
                    } };
    default:
        return state;
    }
}
