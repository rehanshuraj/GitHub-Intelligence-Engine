// Main Express app setup (imports routes, middleware,
//  and database connection).

import express from 'express';
import morgan from 'morgan';
import connect from './db/db.js';
import userRoutes from './routes/user.routes.js';
import projectRoutes from './routes/project.routes.js';
import cors from 'cors'
connect();
const app = express();
// ✅ Allowed origins (both deployed & local)
const allowedOrigins = [
  'https://aivora-jp7z.onrender.com', // your deployed frontend
  'http://localhost:5173' // for local dev (Vite default port)
];
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));
app.use(morgan('dev')); //morgan is used to log the requests made to the server
app.use(express.json());
app.use(express.urlencoded({extended: true})); //it is used to parse the incoming requests with urlencoded payloads
app.use('/users', userRoutes); //user routes

// app.use('/users', userRoutes);
app.use('/projects', projectRoutes);

app.get('/',(req,res)=>{
    res.send("hello rehanshu")
})

export default app;