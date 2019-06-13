import { User } from '../../models/User';
import { connectionPool } from '../../util/connection-util';
import { userConverter } from './converter';

export const getUserByUsername = async (username: string) => {
    const client = await connectionPool.connect()
        .catch((err: Error) => { throw err });
    try {
        const resp = await client.query(
            `SELECT * FROM playlist_populator.app_user
            WHERE username=$1`, [username]
        );
        return (resp && resp.rows && resp.rows.length) ? userConverter(resp.rows[0]) : null;
    } catch (error) {
        throw error;
    } finally {
        client.release();
    }
}

export const registerUser = async (user: User) => {
    const client = await connectionPool.connect()
        .catch((err: Error) => { throw err });
    try {
        const resp = await client.query(
            `INSERT INTO playlist_populator.app_user(first_name, last_name, password, username)
            VALUES($1, $2, $3, $4)
            RETURNING user_id`,
            [user.firstName, user.lastName, user.password, user.username]
        );
        return (resp && resp.rows && resp.rows.length) ? resp.rows[0].user_id : 0;
    } catch (error) {
        throw error;
    } finally {
        client.release();
    }
}

export const verifyUserById = async (id: number) => {
    const client = await connectionPool.connect()
        .catch((err: Error) => { throw err });
    try {
        const resp = await client.query(
            `SELECT * FROM playlist_populator.app_user
            WHERE user_id=$1`, [id]
        );
        return (resp && resp.rows && resp.rows.length) ? true : false;
    } catch (error) {
        throw error;
    } finally {
        client.release();
    }
}

export const verifyUsernameUnique = async (username: string) => {
    const client = await connectionPool.connect()
        .catch((err: Error) => { throw err });
    try {
        const resp = await client.query(
            `SELECT * FROM playlist_populator.app_user
            WHERE username=$1`, [username]
        );
        return (resp && resp.rows && resp.rows.length) ? false : true;
    } catch (error) {
        throw error;
    } finally {
        client.release();
    }
}