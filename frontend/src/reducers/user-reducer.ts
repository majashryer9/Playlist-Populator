import { IUserState } from '.';
import { User } from 'src/models/User';
import { userTypes } from 'src/actions/user/user-types';

const initialState: IUserState = {
    loggedInUser: new User(),
    loggingInToSave: false,
    registrationPassword: '',
    registrationUsername: ''
}

export const userReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case userTypes.ADD_USER_PLAYLIST:
            return {
                ...state,
                loggedInUser: {
                    ...state.loggedInUser,
                    playlists: [...state.loggedInUser.playlists, action.payload.playlist]
                }
            }
        case userTypes.SET_LOGGED_IN_USER:
            return {
                ...state,
                loggedInUser: action.payload.user
            }
        case userTypes.SET_LOGGING_IN_TO_SAVE:
            return {
                ...state,
                loggingInToSave: action.payload.loggingIn
            }
        case userTypes.SET_PASSWORD:
            return {
                ...state,
                loggedInUser: {
                    ...state.loggedInUser,
                    password: action.payload.password
                }
            }
        case userTypes.SET_REGISTRATION_PASSWORD:
            return {
                ...state,
                registrationPassword: action.payload.registrationPassword
            }
        case userTypes.SET_REGISTRATION_USERNAME:
            return {
                ...state,
                registrationUsername: action.payload.registrationUsername
            }
        case userTypes.SET_USERNAME:
            return {
                ...state,
                loggedInUser: {
                    ...state.loggedInUser,
                    username: action.payload.username
                }
            }
    }
    return state;
}