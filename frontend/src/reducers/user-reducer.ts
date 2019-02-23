import { IUserState } from '.';

const initialState: IUserState = {
    username: ''
}

export const userReducer = (state = initialState, action: any) => {
    return state;
}