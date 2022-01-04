import Api from "../Api/Api";

export const getUbicaciones = () =>
  Api.get('/ubicaciones/ObtenerUbicaciones.php').then((res) => res.data);

export const nuevaUbicacion = (ubicacion)=>
  Api.post("/ubicaciones/CrearUbicacion.php",ubicacion)
    .then((res) => res.data);

export const actualizarUbicacion = (ubicacion)=>
    Api.post("/ubicaciones/EditarUbicacion.php",ubicacion)
    .then((res) => res.data);

export const eliminarUbicaciones=(ubicacion)=>
  Api.post("/ubicaciones/EliminarUbicacion.php",ubicacion)
  .then((res) => res.data);

export const buscadorUbicaciones=(nombre)=>Api.post("/ubicaciones/UbicacionesFiltro.php",nombre)
    .then((res) => res.data); 
