import { SqlUser } from '../../dtos/User';
import { User } from '../../models/User';

export const userConverter = (user: SqlUser) => {
    return new User({
        bucketKey: user.buckey_key,
        firstName: user.first_name,
        id: user.user_id,
        lastName: user.last_name,
        password: user.password,
        username: user.username
    })
}