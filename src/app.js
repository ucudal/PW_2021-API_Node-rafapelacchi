var express = require('express');

var app = express();

var experiencia_laboral = [
  {
    empresa: "Urudata",
    puesto: "Developer",
    descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nost                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nost                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nost                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nost                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nost                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nost                                                   Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nost                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nost                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, or incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nost.",
    fechaInicio: new Date("2019-5-19"),
    fechaFin: new Date("2021-12-03"),
  },
  {
    empresa: "Datasec",
    puesto: "Developer",
    descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nost                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nost                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nost                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nost                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nost                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nost                                                   Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nost                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nost                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, or incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nost.",
    fechaInicio: new Date("2016-6-20"),
    fechaFin: new Date("2019-5-19"),
  }
]

app.get('/experiencia-laboral', function(req, res) {
  res.send(experiencia_laboral);
});

app.get('/hacer-cookie', function(req, res) {
  res.cookie('PW_2021-CV_Contacto', 'Algun Valor')
  res.send("¡Hola mundo!")
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
  var valor = ""

  var laCookie = req.headers.cookie;

  laCookie && laCookie.split(';').forEach(function( cookie ) { 
    if(cookie.startsWith(" PW_2021-CV_Contacto"))
    {
      var contenido = cookie.split('%7B%22');
      valor = contenido[1].split('%22%3A%22')[1].split('%22%7D')[0] 
    }
  });

    res.send(valor);
});

app.get('/borrar', function(req, res) { 
  res.clearCookie("PW_2021-CV_Contacto");
  res.send('OK') 
});

app.listen(process.env.PORT || 3000, (a) => {
  console.log("Servidor disponible en http://localhost:3000")
});
 
module.exports = app;