const cors = require('cors')
const express = require('express');
require('./database/connect.js');
const route = require('./routes/router.js');
const cookieParser = require('cookie-parser');
const app = express();

const corsOption = {
    origin: 'http://localhost:3000', // Replace with your client's origin
    credentials: true, // Allow sending of cookies
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Set-Cookie']
}

app.use(cors(corsOption));
app.use(express.json())
app.use(cookieParser(""));

app.use(route);

app.use("/uploads",express.static("./uploads"));

app.listen(8000, () => {
    console.log("server is running...")
})