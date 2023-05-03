import express from 'express';
import httpServer from 'http';
import bodyParser from 'body-parser';
import recipeRouter from './routes/recipe';
import { connect } from './storage/connect';

const app = express();
const recipeApp = httpServer.createServer(app)

const appPort = '9090';

app.use(bodyParser.json());
app.use(connect);
app.use(recipeRouter);

app.on('ready', () => {
    recipeApp.listen(appPort)
    console.log(`App is listening on port ${appPort}`);
})

app.emit('ready');