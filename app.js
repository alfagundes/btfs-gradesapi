import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { gradeRouter } from "./routes/gradeRouter.js";
import { db } from './models/index.js';


(async () => {
  try {
    await db.mongoose.connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    process.exit();
  }
})();

const app = express();

//define o dominio de origem para consumo do servico
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    //origin: 'http://localhost:3131',
    origin: 'https://btfs-gradesapp.herokuapp.com',
    //origin: process.env.CORS_URL,
  })
);

app.get('/', (req, res) => {
  res.send('API em execução');
});

app.use(gradeRouter);

const PORT = process.env.PORT || 8081;

app.listen(process.env.PORT || 8081, () => { });
