import { CHANGE_POST_INFO } from '../types/types';

const changePostInfo = payload => ({
    type: CHANGE_POST_INFO,
    payload
});

export default changePostInfo;
