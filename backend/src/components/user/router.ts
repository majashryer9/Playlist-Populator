import Router, { Request, Response } from 'express';
import * as userService from './service';
import { User } from '../../models/User';

export const userRouter = Router();

userRouter.post('/register', async (req: Request, resp: Response) => {
    const newUser = new User(req.body);
    if (!newUser.firstName) resp.status(400).send('Must include first name');
    if (!newUser.lastName) resp.status(400).send('Must include last name');
    if (!newUser.password) resp.status(400).send('Must include password');
    if (!newUser.username) resp.status(400).send('Must include username');
    const user = await userService.registerUser(req.body)
        .catch((err: Error) => {
            switch (err.message) {
                case 'duplicate key value violates unique constraint "app_user_username_key"':
                    resp.status(409).send('Username is not unique');
            }
        });
    resp.json(user);
});

userRouter.post('/sign-in', async (req: Request, resp: Response) => {

});