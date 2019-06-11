import { IUserState } from '.';
import { User } from 'src/models/User';
import { userTypes } from 'src/actions/user/user-types';

const initialState: IUserState = {
    loggedInUser: new User(),
    loggingInToSave: false
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