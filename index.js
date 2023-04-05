const express = require('express');
const port =4000;
// db connection
const db = require('./config/mongoose');
// for layouts
const expressLayout = require('express-ejs-layouts');
// starting the server
const app = express();
const sassMiddleware = require('node-sass-middleware');
app.use(sassMiddleware({
    /* Options */
    src: './assets/scss'
  , dest: './assets/styles'
  , debug: true
  , outputStyle: 'extended'
  , prefix: '/styles'
}));
// to parse the request body
app.use(express.urlencoded());
// to access all static files
app.use(express.static('./assets'));
app.use(expressLayout);
// to incorporate all styles and scripts together
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// setting up view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// routes
app.use('/', require('./routes/index'));
app.listen(port, err => {
    if(err){ console.log('Error in running the server'); return;}
    console.log(`Server is up and running on port: ${port}`);
});