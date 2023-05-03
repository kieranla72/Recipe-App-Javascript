import express from 'express';
import httpServer from 'http';

const app = express();
const recipeApp = httpServer.createServer(app)

const appPort = '9090';

app.on('ready', () => {
    recipeApp.listen(appPort)
})