import express from 'express';
require('dotenv').config();
import cors from 'cors';
import taskRoutes from './routes/Task/task.routes';
import userRoutes from './routes/User/user.routes'


const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);

export default app;
