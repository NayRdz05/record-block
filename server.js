const { createServer } = require('http');
const next = require('next');

// ==========================================================
// const cors = require('cors');

// app.use((req,res, next)=>{
//     res.setHeader('Access-Control-Allow-Origin',"http://localhost:3000");
//     res.setHeader('Access-Control-Allow-Headers',"*");
//     res.header('Access-Control-Allow-Credentials', true);
//     next();
// });
// ===========================================================
// Esto es necesario para que Next-routes funcione
// Next-routes se usa para enrutar al usuario a las URL especificadas

const app = next({
    //dev: process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
    dev: process.env.NODE_ENV !== 'production'
    // dev: process.env.NEXTAUTH_SITE = "http://localhost:3000"
});

const routes = require('./routes');
const handler = routes.getRequestHandler(app);

app.prepare().then(() => {
    createServer(handler).listen(3000, (err) => {
        if(err) throw err;
        console.log('Ejecutando en localhost:3000');
    });
});

// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// server.js
// const next = require('next')
// const routes = require('./routes').default
// const app = next({dev: process.env.NODE_ENV !== 'production'})
// const handler = routes.getRequestHandler(app)

// // With express
// const express = require('express')
// app.prepare().then(() => {
//   express().use(handler).listen(3000)
// })