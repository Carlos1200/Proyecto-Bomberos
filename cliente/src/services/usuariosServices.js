import Api from "../Api/Api";

export const getUsuarios = () =>
  Api.get('/usuarios/ObtenerUsuarios.php').then((res) => res.data);

export const nuevoUsuario = (ubicacion)=>
  Api.post("/usuarios/CrearUsuario.php",ubicacion)
    .then((res) => res.data);

export const actualizarUsuarios = (ubicacion)=>
    Api.post("/usuarios/EditarUsuario.php",ubicacion)
    .then((res) => res.data);

export const eliminarUsuarios=(ubicacion)=>
  Api.post("/usuarios/EliminarUsuario.php",ubicacion)
  .then((res) => res.data);

export const buscadorUsuarios=(nombre)=>
    Api.post("/usuarios/UsuariosFiltro.php",nombre)
    .then((res) => res.data); 
