import express from 'express';
import controller from '../controller/gradeController.js';

const app = express();

app.post('grade', controller.create);
app.get('grade', controller.findAll);
app.get('grade', controller.findOne);
app.put('grade', controller.update);
app.delete('grade', controller.removeAll);
app.delete('grade', controller.remove);

export { app as gradeRouter };