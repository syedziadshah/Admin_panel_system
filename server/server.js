require('dotenv').config();
const express = require('express');
const cors = require("cors");
const app = express();
const authRouter = require("./router/auth-router")
const contactRouter =require('./router/contact-router')
const serviceRouter =require("./router/service-router");
const adminRouter =require("./router/admin-router");
const connectDB = require('./utils/db');
 // Correct path to your DB connection file
const errorMidleware = require('./middleware/error_midleware');
//let twickle cors
const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
  };
  
  app.use(cors(corsOptions));
app.use(express.json()); // Middleware to parse JSON bodies

app.use('/api/admin', adminRouter)
app.use('/api/auth', authRouter); 
app.use('/api/form', contactRouter);
app.use('/api/data', serviceRouter);
app.use(errorMidleware);

const PORT= 5002
connectDB().then(()=>{
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
});