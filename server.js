//set up
var express         = require('express');
var app             = express();
var mongoose        = require('mongoose');
var morgan          = require('morgan');
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');
var port = process.env.PORT || 8080;

//Conexxión con la base de datos
mongoose.connect('mongodb://localhost:27017/mean-todo');

//Configuración
//Localización de los archivos estáticos p.e /public/img --> /img
app.use(express.static(__dirname + '/public'));
//Muestra un log de todos los request en la consola
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':true}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());


//Definición de modelos
var Todo = mongoose.model('Todo', {
  text : String,
  done : Boolean
});

//Routes de la API
  //GET de todos los TODOs
  app.get('/api/todos', function(req, res) {
    Todo.find(function(err, todos) {
      if (err) 
        {
          res.send(err)
        }
        res.json(todos);
    });
  });

// POST que crea un TODO y devuelve todos los TODOs
  app.post('/api/todos', function(req, res) {
    Todo.create({
      text  : req.body.text,
      done  : false
    }, function(err, todo) {
      if (err) 
        {
          res.send(err);
        }
      Todo.find(function(err, todos) {
        if (err) {
          res.send(err);
        }
        res.json(todos);
      });

    });
  });

// DELETE un TODO y devuelve todos los TODOs
  app.delete('/api/todos/:todo_id', function(req, res) {
    Todo.remove({
      _id : req.params.todo_id
    }, function(err, todo) {
      if (err) 
        {
          res.send(err);
        }
      Todo.find(function(err, todos) {
        if (err) 
          {
            res.send(err)
          }
          res.json(todos);
      });
    });
  });

//APP HTML donde irá nuestra SPA: Angular Manejará el Frontend
app.get('*', function(req, res) {
  res.sendfile('./public/index.html');
});

//Escucha en el puerto 8080 y corre el servidor con node server.js
app.listen(port);
console.log('Escuchando en el puerto http://localhost:' + port) 