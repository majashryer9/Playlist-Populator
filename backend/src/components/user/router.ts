import Router, { Request, Response } from 'express';
import * as userService from './service';
import { User } from '../../models/User';
import jwt from 'jsonwebtoken';


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
                case 'Internal Server Error':
                    resp.status(500).send(err.message);
                case 'Username not unique':
                    resp.status(409).send(err.message);
            }
        });
    resp.json(user);
});

userRouter.post('/sign-in', async (req: Request, resp: Response) => {
    const user = new User(req.body);
    if (!user.password) return resp.status(400).json('Must include password');
    if (!user.username) return resp.status(400).json('Must include username');
    userService.getUserByUsernameAndPassword(req.body.username, req.body.password)
        .then((foundUser: User) => {
            const payload = { id: foundUser.id };
            const secretOrKey = process.env.SECRET_OR_KEY;
            if (!secretOrKey) throw new Error('Internal Server Error');
            const token = jwt.sign(payload, secretOrKey);
            resp.set('Authorization', token);
            resp.status(200).json(foundUser);
        })
        .catch((err: Error) => {
            const statusCode = (err.message === 'Internal Server Error') ? 500 : 400;
            resp.status(statusCode).json(err.message);
        });
});