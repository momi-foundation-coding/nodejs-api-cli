import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const port = 8000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());

// Url for homepage
app.get('/', (req, res) => {
    res.status(200).send({
        message: "Welcome to first app"
    });
});

app.listen(port, () => {
    console.log(`The app is listening to port ${port}`)
});

export default app;
