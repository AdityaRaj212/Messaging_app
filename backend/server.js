import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';
import cors from 'cors';
import path from 'path';
import http from 'http';
import { connectUsingMongoose } from './config/mongoose.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import userRouter from './features/user/user.routes.js';
import messageRouter from './features/message/message.routes.js';
import groupRouter from './features/group/group.routes.js';
import { initSocket } from './config/socket.js';

const server = express();

server.use(express.urlencoded({extended: true}));
server.use(cors());
server.use(bodyParser.json());
server.use(cookieParser());
server.use(session({
    secret: 'aditya_message_app',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

const buildPath = path.resolve(__dirname, '../frontend/build');
console.log(`Serving static files from ${buildPath}`);
server.use(express.static(buildPath));

server.use('/api/user', userRouter);
server.use('/api/message', messageRouter);
server.use('/api/group', groupRouter);

const socketServer = http.createServer(server);
const io = initSocket(socketServer);

socketServer.listen(3400, ()=>{
    console.log('Server is up and running at 3400');
    connectUsingMongoose();
})