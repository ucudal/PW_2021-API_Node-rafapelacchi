var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
const fs = require('fs')
const path = require('path'); 
const cvs = require('csv-parser');
var validator = require('validator');
var createCsvWriter = require('csv-writer').createObjectCsvWriter;
const experiencia_laboral = [];
const usuariosDB = [];
getUsers();
getExperiencia();

var app = express();

app.use(cors({
  origin: '*'
}));

app.use(express.urlencoded({
  extended: true
}));

function obtenerCookie(laCookie){
  var valor = ""

  laCookie && laCookie.split(';').forEach(function( cookie ) { 
    if(cookie.startsWith(" PW_2021-CV_Contacto"))
    {
      var contenido = cookie.split('%7B%22');
      valor = contenido[1].split('%22%3A%22')[1].split('%22%7D')[0] 
    }
  });

  return valor;
}

var jsonParser = bodyParser.json();

app.get('/obtener',cors(), function(req, res) { 
  var valor = obtenerCookie(req.headers.cookie);
  var retorno = { nombre: valor}
  res.send(retorno);
});

app.get('/borrar', function(req, res) { 
  res.clearCookie("PW_2021-CV_Contacto");
  res.send('OK') 
});

app.get('/experiencia-laboral',cors(), function(req, res) {
  res.send({
    "experiencia-laboral": experiencia_laboral
  });
});

app.post('/enviar-formulario', jsonParser, function(req, res) { 
    var nombre = req.body.nombreContacto;
    var mail = req.body.mail;

    if(!nombre){
      res.status(400).send('Falta el nombre de contacto');
    }
    if(!mail){
      res.status(303);
      res.send("Usted no ha ingresado un mail.") 
    }
    else if(mail.indexOf("@") < 0 || mail.indexOf(".") < 0){
      res.status(303);
      res.send("El mail ingresado no es correcto.") 
    }
    else{
      logearRegistro(nombre, mail);   
      res.cookie('PW_2021-CV_Contacto', nombre,
        { 
          domain: 'https://PW2021-APINode-rafapelacchi.rp33.repl.co',
          secure:true
        })
      res.send(nombre)
    }
  } 
);
 
app.get('/generar', function(req, res) {
  var nombre = "Rafael"

  res.cookie('PW_2021-CV_Contacto', 
    JSON.stringify({
    nombreContacto: nombre}),
    {
      secure:true
    })

    res.send(req.cookies)

});

app.post("/*", jsonParser, function(req, res) {
  res.status(404).send("404 - No fue encontrado");
});

app.listen((a) => {
  console.log("Servidor disponible en http://localhost:3000")
});

 function getExperiencia(){   
  fs.createReadStream(path.join(__dirname,'./files/experiencia.csv')).pipe(cvs({}))
  .on('data', (data) => experiencia_laboral.push(data))
}

function logearRegistro(nombre, mail){ 
  usuariosDB.push({nombre: nombre,  mail: mail});
  
  const csvWriter = createCsvWriter({
      path: path.join(__dirname,'./files/registrosFormulario.csv'),
      header: [
          {id: 'nombre', title: 'nombre'},
          {id: 'mail', title: 'mail'}, 
      ]
  });
 
  csvWriter.writeRecords(usuariosDB)
}

app.post("/*", jsonParser, function(req, res) {
  res.status(404).send("404 - No fue encontrado");
});

function getUsers(){
  fs.createReadStream(path.join(__dirname,'./files/registrosFormulario.csv')).pipe(cvs({}))
  .on('data', (data) => usuariosDB.push(data)) 
}

module.exports = app;