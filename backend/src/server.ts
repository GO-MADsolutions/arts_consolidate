import express from 'express';
import mongoose from 'mongoose';
import { json } from 'body-parser';
import { createPostIfNotAvailalbe } from './bootstrap';
import postsRouter from "../src/router/postRouter";
const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );
  next();
});
app.use(json());

app.use(postsRouter);

const start = async () => {
  app.listen(4505, () => {
    console.info('Server started');
  });
  
  try {
    await mongoose.connect('mongodb+srv://test:LDoPWs27sIt5QOvj@cluster0.7pymi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    await createPostIfNotAvailalbe();
  } catch (e) {
    console.error(e);
  }
};
start();
