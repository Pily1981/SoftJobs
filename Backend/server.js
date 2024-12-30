import dotenv from "dotenv"; 
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes/user.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(morgan('dev')); 
app.use(routes);


app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

