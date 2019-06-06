import { User } from '../../models/User';
import { connectionPool } from '../../util/connection-util';

export const registerUser = async (user: User) => {
    const client = await connectionPool.connect();
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