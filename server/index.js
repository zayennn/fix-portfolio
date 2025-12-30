import express from 'express';
import cors from 'cors';
import githubRoute from './routes/github.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/github', githubRoute);

app.listen(5000, () => {
    console.log('🚀 Backend running on http://localhost:5000');
});