import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';

import express from 'express'
import path from 'path';

import morgan from 'morgan'; // HTTP REQUEST LOGGER
import bodyParser from 'body-parser'; // PARSE HTML BODY

import mongoose from 'mongoose';
import session from 'express-session';
import router from './routes'

const app = express();
const port = 3000;
const devPort = 4000;

const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => { console.log('Connected to mongodb server'); });
mongoose.connect('mongodb://localhost/node_rest');

/* Use session */
app.use(session({
    secret :'NodeRest$1$234',
    resave : false,
    saveUninitialized : true
}));

app.use('/', express.static(path.join(__dirname, './../public')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/api', router);
app.get('/hello', (req,res) => {
    return res.send('Hello express');
});

app.listen(port, () => {
    console.log('Express is listening on port', port);
});

if(process.env.NODE_ENV == 'development'){
    console.log('Server is running on development mode');
    const config = require('../webpack.dev.config');
    const compiler = webpack(config);
    const devServer = new WebpackDevServer(compiler, config.devServer);
    devServer.listen(
        devPort, () => {
            console.log('webpack-dev-server is listening on port', devPort);
        }
    );
}
