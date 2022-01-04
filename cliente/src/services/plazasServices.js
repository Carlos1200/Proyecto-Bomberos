import Api from "../Api/Api";

export const getPlazas = () =>
  Api.get('/plazas/ObtenerPlazas.php').then((res) => res.data);

export const nuevaPlaza = (plaza) =>
  Api.post('/plazas/CrearPlaza.php', plaza).then((res) => res.data);

export const editarPlaza = (plaza) =>
  Api.post('/plazas/EditarPlaza.php', plaza).then((res) => res.data);

export const eliminarPlazas = (idPlaza) =>
  Api.post('/plazas/EliminarPlaza.php',  idPlaza ).then((res) => res.data);

export const buscadorPlazas=(nombre)=>Api.post("/plazas/PlazasFiltro.php",nombre)
.then((res) => res.data); 
