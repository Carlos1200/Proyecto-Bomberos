import Api from "../Api/Api";

export const crearReportes = (reportes)=>
Api.post("/reportes/CrearReporte.php",reportes)
  .then((res) => res.data[0]);

export const obtenerReportes = (tipoUsuario,UbicacionUsuario)=>
Api.get(`/reportes/${tipoUsuario!=="Administrador"?`ObtenerReportesUbicacion.php?nj=${UbicacionUsuario}`:'ObtenerReportes.php'}`)
  .then((res) => res.data);