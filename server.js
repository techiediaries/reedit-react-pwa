import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import template from './template';

const server = express();

server.use('/static', express.static('static'));

server.get('/', (req, res) => {
  const appString = renderToString(<App />);

  res.send(template({
    body: appString,
    title: 'Hello World from the server'
  }));
});

server.listen(8080);
