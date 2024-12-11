const express = require('express');
const app = express();
const mysql = require('mysql');
const morgan = require('morgan');
const colors = require('colors');
const dotenv = require('dotenv');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser')

//configuring dotenv
dotenv.config();

//middlewares

app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.urlencoded({extended:false}));
app.use(express.json())

app.use(cors({
    origin: 'http://localhost:5173', // Specify the frontend URL
    credentials: true,              // Allow credentials (cookies, headers)
}));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 // 1 day expiry for testing
    }
}));

const db = mysql.createConnection({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE_NAME,
});

db.connect((error)=>{

    if(error){
        console.log(error);
    }else{
        console.log('My Sql connected');
    }
});

app.get("/",(req,res)=>{

    res.send("HELLO WORLD");
})

app.use('/auth',require('./routes/authRoute'))
app.use('/users',require('./routes/users'));
app.listen(process.env.PORT,()=>{
    console.log(`SERVER RUNNING ON PORT ${process.env.PORT}`.bgMagenta.bgRed);
})
