import Api from "../Api/Api";

export const getGrupos = () =>
  Api.get('/grupos/ObtenerGrupos.php').then((res) => res.data);

export const nuevoGrupo = (grupo) =>
  Api.post('/grupos/CrearGrupo.php', grupo).then((res) => res.data);

export const editarGrupo = (grupo) =>
  Api.post('/grupos/EditarGrupo.php', grupo).then((res) => res.data);

export const eliminarGrupos = (idGrupo) =>
  Api.post('/grupos/EliminarGrupo.php',  idGrupo ).then((res) => res.data);

export const buscadorGrupos=(nombre)=>Api.post("/grupos/GruposFiltro.php",nombre)
.then((res) => res.data); 
