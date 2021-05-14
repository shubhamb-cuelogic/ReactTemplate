import { LOGIN_USER, STORE_USER, LOGOUT_USER, GET_USER } from './constants';

const getUserData = () => {
    if (localStorage.getItem('user')) {
        console.log('getuse redux called')
        return JSON.parse(localStorage.getItem('user'));
    }
    return null
}
const INITIAL_STATE = {
    user: getUserData(),
    //storedUser: null
};

const User = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return { ...state,user: action.payload }
        case STORE_USER:
            return { ...state, storedUser: action.payload }
        case LOGOUT_USER:
            return { ...state,user: null }
        
        default:
            return { ...state }
    }
}

export default User;