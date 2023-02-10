const express = require('express');
const app = express();
const router = require('./route')
const expressLayouts = require('express-ejs-layouts');
const PORT = 8008;

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static('./assets'));

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use('/', router)

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(PORT, ()=>{console.log("connected to server : "+ PORT) })