require("dotenv").config();
const express=require("express");
const expressLayout=require("express-ejs-layouts")
const connectDB = require('./server/config/db')
const app = express();
const cookieParser = require('cookie-parser');
const cors = require("cors")

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))
const PORT = 3001 

connectDB();
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 
app.use(cookieParser())

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.use(expressLayout);
app.set('layout', './layouts/main')
app.set('view engine', 'ejs');

app.use('/', require('./server/routes/main'));

app.listen(PORT,()=>{
    console.log(`App listening on port ${PORT}`)
})