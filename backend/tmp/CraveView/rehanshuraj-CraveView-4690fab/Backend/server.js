require('dotenv').config(); //to use .env file
const app = require('./src/app');


//FOR DATABASE CONNECTION
const connectDB = require('./src/db/db');
connectDB();

app.listen(3000,()=>{
    console.log("server is running on port 3000");
})