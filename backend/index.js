const express = require('express');
const app = express();
const mysql = require('mysql');
const morgan = require('morgan');
const colors = require('colors');
const dotenv = require('dotenv');
const cors = require('cors')

//configuring dotenv
dotenv.config();

//middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({extended:false}));
app.use(express.json())

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

app.listen(process.env.PORT,()=>{
    console.log(`SERVER RUNNING ON PORT ${process.env.PORT}`.bgMagenta.bgRed);
})