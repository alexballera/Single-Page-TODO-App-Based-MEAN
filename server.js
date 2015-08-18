//set up
var express         = require('express');
var app             = express();
var mongoose        = require('mongoose');
var morgan          = require('morgan');
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');

//Conexxión con la base de datos
mongoose.connect('mongodb://localhost:27027/mean-todo');

//Configuración
//Localización de los archivos estáticos p.e /public/img --> /img
app.use(express.static(__dirname + '/public'));
//Muestra un log de todos los request en la consola
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':true}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride);


//Definición de modelos
var Todo = mongoose.model('Todo', {
  text: String
});

//Escucha en el puerto 8080 y corre el servidor con node server.js
app.listen(8080);
console.log('Escuchando en el puerto http://localhost:8080') 