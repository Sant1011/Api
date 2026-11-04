const http = require('http');
const PUERTO = 80;
const NOTA_MINIMA_APROBACION = 3.0;

// DATOS
function obtenerNotas() {
  return [4.5, 3.5, 2.5, 4.0];
}
function obtenerEquipo() {
  return {
    equipo: 'Equipo 00',
    integrantes: ['Yhaisell', 'Joshua', 'Santiago']};
}
// LÓGICA 
function calcularPromedio(notas) {
  let suma = 0;
  for (let i = 0; i < notas.length; i++) {
    suma = suma + notas[i];
  }
  return suma / notas.length;
}
function evaluarNotas(notas) {
  const promedio = calcularPromedio(notas);
  return {
    promedio: promedio,
    aprobado: promedio >= NOTA_MINIMA_APROBACION};
}
// PRESENTACIÓN 
function responder(res, codigo, datos) {
  res.writeHead(codigo, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(datos));
}
const servidor = http.createServer((req, res) => {
  if (req.url === '/salud') {
    responder(res, 200, { estado: 'ok' });
    return;
  }

  if (req.url === '/equipo') {
    responder(res, 200, obtenerEquipo());
    return;
  }

  if (req.url === '/notas') {
    responder(res, 200, evaluarNotas(obtenerNotas()));
    return;
  }

  responder(res, 404, { error: 'Ruta no encontrada' });
});
servidor.listen(PUERTO); //Santiago Zambrano
// FUNCIONES QUE HACEN DEMACIADO CORREGIDO POR JOSHUA WERMINSKY
