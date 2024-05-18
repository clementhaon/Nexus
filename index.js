import dotenv from 'dotenv'
dotenv.config({ silent: true });
import http from 'http';
import middlewares from './app/core/middlewares.js';
import express from 'express';
import cors from 'cors';
import Router from './app/controller/router.js';
const PORT = process.env.port || 3000;



const app = express();

app.use('*', cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(middlewares.cors);
app.use('/', Router);


const httpServer = http.createServer(app);
httpServer.listen(PORT, () => 
    console.log(`http server listening on port ${PORT}`)
);


app.get("/test", (req, res) => {
    res.status(200).send('Hello World');
});
