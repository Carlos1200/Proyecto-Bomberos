import Api from "../Api/Api";

export const crearReportes = (reportes)=>
Api.post("/reportes/CrearReporte.php",reportes)
  .then((res) => res.data[0]);

export const obtenerReportes = (tipoUsuario,UbicacionUsuario)=>
Api.get(`/reportes/${tipoUsuario!=="Administrador"?`ObtenerReportesUbicacion.php?nj=${UbicacionUsuario}`:'ObtenerReportes.php'}`)
  .then((res) => res.data);

export const obtenerDetallesReportes= (idReporte)=>
Api.get(`/reportes/ObtenerDetallesReporte.php?nj=${idReporte}`)
  .then((res) => res.data);

export const obtenerReportesFiltrados= (nombre='')=>
Api.get(`/reportes/ObtenerReportesFiltrados.php?nj=${nombre}`).then((res) => res.data);

export const mostrarAutorizacion= (idReporte)=>
Api.get(`/pdf/VerPdf.php?id=${idReporte}`,{
  responseType:'blob'
}).then((res) => {
  const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Autorizacion.pdf'); //or any other extension
    document.body.appendChild(link);
    link.click();
});