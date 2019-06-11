import { userTypes } from './user-types';
import { environment } from 'src/environment';
import { playlistTypes } from '../playlist/playlist-types';

export const setLoggingInToSave = (loggingIn: boolean) => {
    return {
        payload: {
            loggingIn
        },
        type: userTypes.SET_LOGGING_IN_TO_SAVE
    }
}

export const setPassword = (password: string) => {
    return {
        payload: {
            password
        },
        type: userTypes.SET_PASSWORD
    }
}

export const setUsername = (username: string) => {
    return {
        payload: {
            username
        },
        type: userTypes.SET_USERNAME
    }
}

export const signIn = () => (dispatch: any, getState: any) => {
    const { username, password } = getState().user.loggedInUser;
    const url = `${environment.context}user/sign-in`;
    fetch(url, {
        body: JSON.stringify({
            password,
            username
        }),
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST'
    })
        .then(async resp => {
            const userOrMessage = await resp.json();
            if (resp.ok) {
                const token = resp.headers.get('Authorization');
                if (token) { localStorage.setItem('token', token) };
                const user = userOrMessage;
                dispatch({
                    payload: {
                        user
                    },
                    type: userTypes.SET_LOGGED_IN_USER
                });
                dispatch({
                    payload: {
                        userId: user.id
                    },
                    type: playlistTypes.SET_USER_ID
                });
            }
            else {
                console.log(userOrMessage);
            }
        })
        .catch((err: Error) => console.log(err));
}