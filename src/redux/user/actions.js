import { LOGIN_USER, STORE_USER, LOGOUT_USER, GET_USER } from './constants';

export const loginUser = (user) => ({
    type: LOGIN_USER,
    payload: user
})

 

export const logOutUser = (user) => ({
    
    type: LOGOUT_USER,
    payload: user
})

export const storeUser = (user) => ({
    type: STORE_USER,
    payload: user
})