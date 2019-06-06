import { User } from '../../models/User';
import bcrypt from 'bcryptjs';
import * as userDao from './dao';

export const registerUser = (user: User) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err: Error, salt: string) => {
            if (err) reject(err);
            bcrypt.hash(user.password, salt, async (err: Error, hash: string) => {
                if (err) reject(err);
                user.password = hash;
                const id = await userDao.registerUser(user)
                    .catch((err: Error) => reject(err));
                user.id = id;
                user.password = '';
                resolve(user);
            });
        });
    })
}