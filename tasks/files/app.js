import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const port = 8000;
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.listen(port, () => {
    console.log(`The app is listening to port ${port}`)
});
