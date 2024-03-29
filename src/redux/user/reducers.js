import { LOGIN_USER, STORE_USER, LOGOUT_USER, GET_USER } from './constants';

const getUserData = () => {
    if(!localStorage.getItem('user')){
        return null
    }
    const user = localStorage.getItem('user');
    return user ? (typeof (user) == 'object' ? user : JSON.parse(user)) : null;
}

const INITIAL_STATE = {
    user: null,
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