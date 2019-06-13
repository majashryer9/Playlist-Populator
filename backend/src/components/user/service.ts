import { User } from '../../models/User';
import bcrypt from 'bcryptjs';
import * as userDao from './dao';
// import * as playlistDao from '../playlist/dao';
// import * as songDao from '../song/dao';

export const getUserByUsernameAndPassword = async (username: string, password: string) => {
    const user = await userDao.getUserByUsername(username)
        .catch((err: Error) => { throw new Error('Internal Server Error') });
    if (!user) throw new Error('User not found');
    const passwordsMatch = await bcrypt.compare(password, user.password)
        .catch((err: Error) => { throw new Error('Internal Server Error') });
    if (passwordsMatch) {
        user.password = '';
        // const userPlaylists = await playlistDao.getUserPlaylists(user.id)
        //     .catch((err: Error) => { throw new Error('Internal Server Error') });
        // const userLikedSongs = await songDao.getUserLikedSongs(user.id)
        //     .catch((err: Error) => { throw new Error('Internal Server Error') });
        // user.playlists = userPlaylists;
        // user.likedSongs = userLikedSongs;
        return user;
    }
    else {
        throw new Error('Incorrect password');
    }
}

export const registerUser = async (user: User) => {
    const userAlreadyExists = await userDao.getUserByUsername(user.username)
        .catch((err: Error) => { throw new Error('Internal Server Error') });
    if (userAlreadyExists) throw new Error('Username not unique');
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err: Error, salt: string) => {
            if (err) reject(new Error('Internal Server Error'));
            bcrypt.hash(user.password, salt, async (err: Error, hash: string) => {
                if (err) reject(new Error('Internal Server Error'));
                user.password = hash;
                const id = await userDao.registerUser(user)
                    .catch((err: Error) => { throw new Error('Internal Server Error') });
                user.id = id;
                user.password = '';
                resolve(user);
            });
        });
    })
}

export const verifyUserById = async (id: number) => {
    const userExists = await userDao.verifyUserById(id)
        .catch((err: Error) => { throw new Error('Internal Server Error') });
    if (!userExists) throw new Error('User not found');
    return userExists;
}

export const verifyUsernameUnique = async (username: string) => {
    const isUnique = await userDao.verifyUsernameUnique(username)
        .catch((err: Error) => { throw new Error('Internal Server Error') });
    return isUnique;
}