import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { categoryRouter } from './components/category/router';
import { playlistRouter } from './components/playlist/router';
import { songRouter } from './components/song/router';
import { artistRouter } from './components/artist/router';
import { userRouter } from './components/user/router';
import { auth } from './util/auth';


const app = express();
const port = process.env.PORT || 8888;

// temporarily allow all cors
app.use(cors({
    exposedHeaders: ['Authorization'],
}));
app.use(bodyParser.json());
app.use(auth);

app.use('/category', categoryRouter)
app.use('/playlist', playlistRouter);
app.use('/song', songRouter);
app.use('/artist', artistRouter);
app.use('/user', userRouter);

app.listen(port, () => {
    console.log(`Application is listening on port ${port}`)
});