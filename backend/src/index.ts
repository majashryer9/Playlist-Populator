import express from 'express';
import { playlistRouter } from './routers/playlist-router';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = 8888;

// temporarily allow all
app.use(cors())
app.use(bodyParser.json());

app.use('/playlist', playlistRouter);

app.listen(port, () => {
    console.log(`Application is listening on port ${port}`)
});