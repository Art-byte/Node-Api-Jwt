const express = require('express');
const app = express();

app.use(express.json());//con esto el servidor entiende los json
app.use(express.urlencoded({extended: false})); //con esto comprende los datos de un formulario 

app.use(require('./controllers/authController'))

module.exports = app; 