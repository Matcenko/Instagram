const initialState = {
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

export default function (state = initialState, action) {
    switch (action.type) {
    case 'CHANGE_POPUP':
        return {
            ...state,
            renderPopUp: action.payload
        };
    case 'CLOSE_POPUP':
        return {
            ...state,
            renderPopUp: undefined
        };
    case 'POSTSTYPE_POSTS':
        return {
            ...state,
            postsType: true
        };
    case 'POSTSTYPE_TAGGED':
        return {
            ...state,
            postsType: false
        };
    case 'ADD_LIKE':
        if (action.payload[state.renderPopUp].liked) {
            return state;
        }
        const posts = action.payload.map((post, index) => {
            if (index === state.renderPopUp) {
                const { url, likes, comments } = post;
                return { url, likes: likes + 1, comments, liked: true };
            } else return post;
        });
        return state.postsType ? { ...state, posts: posts } : { ...state, tagged: posts };
    default:
        return state;
    }
}
