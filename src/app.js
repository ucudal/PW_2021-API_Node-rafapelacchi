var express = require('express');
const cvs = require('csv-parser');
var app = express();
const fs = require('fs')
const path = require('path'); 
var csvWriter = require('csv-write-stream') 
var bodyParser = require('body-parser')
var createCsvWriter = require('csv-writer').createObjectCsvWriter;
const experiencia_laboral = [];
const usuariosDB = [];
getExperiencia();
getUsers();
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/experiencia-laboral', function(req, res) {
  res.send(experiencia_laboral);
});

app.get('/hacer-cookie', function(req, res) {
  res.cookie('PW_2021-CV_Contacto', 'Algun Valor')
});

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

app.get('/obtener', function(req, res) { 
  res.send(obtenerCookie(req.headers.cookie));
});

app.get('/borrar', function(req, res) { 
  res.clearCookie("PW_2021-CV_Contacto");
  res.send('OK') 
});

app.post('/enviar-formulario',urlencodedParser, function(req, res) { 
  var valor = obtenerCookie(req.headers.cookie);
  if(valor){
    var nombre = req.body.nombre
    var mail = req.body.mail

    if(!nombre){
      res.status(303);
      res.send("Usted no ha ingresado un nombre.") 
    }
    if(!mail){
      res.status(400);
      res.send("Usted no ha ingresado un mail.") 
    }
    else if(mail.indexOf("@") < 0 || mail.indexOf(".") < 0){
      res.status(400);
      res.send("El mail ingresado no es correcto.") 
    }
    else{
      logearRegistro(nombre, mail); 
      res.send("El registro se hizo correctamente") 
    }
  }
  else{
    res.status(400);
    res.send("alta el nombre de contacto.") 
  }
});

app.use((req, res, next) => {
    res.status(404);
    res.send("Error 404") 
  }
);

app.listen(process.env.PORT || 3000, (a) => {
  console.log("Servidor disponible en http://localhost:3000")
});
 
module.exports = app;
app.use(bodyParser);


function getExperiencia(){   
  fs.createReadStream(path.join(__dirname,'./files/experiencia.csv')).pipe(cvs({}))
  .on('data', (data) => experiencia_laboral.push(data))
}

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

function getUsers(){
  fs.createReadStream(path.join(__dirname,'./files/registrosFormulario.csv')).pipe(cvs({}))
  .on('data', (data) => usuariosDB.push(data)) 
}