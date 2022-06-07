/* eslint-disable no-undef */

console.log('server running ');
const express = require("express");
const { errors} = require("celebrate");
const app = express();
const loaderExpress = require('./src/loader/express');
const loaderIndex = require('./src/loader/index');
const initLoader = require('./src/loader/init');
const routerAuth = require('./src/routers/authRouter');
const db = require('./src/db/index');
const PORT = 3000;
const startServer= async()=>{
   await loaderExpress(app,PORT);
   await loaderIndex(app);
   await initLoader(app);
   routerAuth(app);
   await db.createtables();
   const server = require("http").Server(app);
   server.listen(PORT);
   app.use(errors());
};

startServer();