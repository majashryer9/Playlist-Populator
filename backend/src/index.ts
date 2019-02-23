import express from 'express';
import { categoryRouter } from './components/category/router';
import { playlistRouter } from './components/playlist/router';
import { songRouter } from './components/song/router';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = 8888;

// temporarily allow all
app.use(cors())
app.use(bodyParser.json());

app.use('/category', categoryRouter)
app.use('/playlist', playlistRouter);
app.use('/song', songRouter);

app.listen(port, () => {
    console.log(`Application is listening on port ${port}`)
});