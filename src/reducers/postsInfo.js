import {
    CHANGE_POPUP,
    CLOSE_POPUP,
    ESTABLISH_POSTS,
    ESTABLISH_TAGGED,
    CHANGE_POST_INFO
} from '../types/types';

const initialState = {
    postsShouldRender: true, // переменная для определения рендеринга posts или tagged
    posts: [
        {
            url: './src/ui/components/MainWall/images/Posts/tolkien1.jpg',
            likes: 14,
            comments: [{ comment: 'nice photo!', date: { year: 2018, month: 6, day: 13, hours: 2, minutes: 22 } }, { comment: 'cool', date: { year: 2019, month: 6, day: 13, hours: 2, minutes: 22 } }],
            liked: false
        },
        {
            url: './src/ui/components/MainWall/images/Posts/tolkien2.jpg',
            likes: 19,
            comments: [{ comment: 'good photo!', date: { year: 2019, month: 6, day: 1, hours: 2, minutes: 22 } }, { comment: 'nice', date: { year: 2019, month: 6, day: 10, hours: 2, minutes: 22 } }],
            liked: false
        },
        {
            url: './src/ui/components/MainWall/images/Posts/tolkien3.jpg',
            likes: 0,
            comments: [{ comment: 'I really like your books!!!', date: { year: 2019, month: 2, day: 10, hours: 2, minutes: 22 } }],

            liked: false
        },
        {
            url: './src/ui/components/MainWall/images/Posts/tolkien4.jpg',
            likes: 0,
            comments: [{ comment: 'cool', date: { year: 2019, month: 6, day: 10, hours: 2, minutes: 22 } }, { comment: 'cool', date: { year: 2019, month: 6, day: 10, hours: 2, minutes: 22 } }],

            liked: false
        }
    ],
    tagged: [
        {
            url: './src/ui/components/MainWall/images/Tagged/tolkien1.jpg',
            likes: 20,
            comments: [{ comment: 'follow me', date: { year: 2019, month: 6, day: 10, hours: 2, minutes: 22 } }],

            liked: false
        },
        {
            url: './src/ui/components/MainWall/images/Tagged/tolkien2.jpg',
            likes: 4,
            comments: [{ comment: 'cool', date: { year: 2019, month: 6, day: 10, hours: 2, minutes: 22 } }, { comment: 'good', date: { year: 2019, month: 6, day: 10, hours: 2, minutes: 22 } }, {
                comment: 'nice',
                date: { year: 2019, month: 6, day: 10, hours: 2, minutes: 22 }
            }],

            liked: false
        },
        {
            url: './src/ui/components/MainWall/images/Tagged/tolkien3.jpg',
            likes: 4,
            comments: [{ comment: 'cool', date: { year: 2019, month: 6, day: 10, hours: 2, minutes: 22 } }],

            liked: false
        },
        {
            url: './src/ui/components/MainWall/images/Tagged/tolkien4.jpg',
            likes: 0,
            comments: [{ comment: 'ok', date: { year: 2019, month: 6, day: 10, hours: 2, minutes: 22 } }],

            liked: false
        },
        {
            url: './src/ui/components/MainWall/images/Tagged/tolkien5.jpg',
            likes: 6,
            comments: [{ comment: 'bad photo' }],

            liked: false
        }
    ],
    userInformation: {
        nick: 'JohnTolkien',
        fullName: 'John Ronald Reuel Tolkien',
        profession: 'Writer, poet, philologist, and academic',
        site: 'tolkien.co.uk'
    },
    popUpIndex: null
};

export default function (state = initialState, action) {
    switch (action.type) {
    case CHANGE_POPUP:
        return {
            ...state,
            popUpIndex: action.payload
        };
    case CLOSE_POPUP:
        return {
            ...state,
            popUpIndex: null
        };
    case ESTABLISH_POSTS:
        return {
            ...state,
            postsShouldRender: true
        };
    case ESTABLISH_TAGGED:
        return {
            ...state,
            postsShouldRender: false
        };
    case CHANGE_POST_INFO:
        return state.postsShouldRender ? { ...state, posts: action.payload } : { ...state, tagged: action.payload };
    default:
        return state;
    }
}
