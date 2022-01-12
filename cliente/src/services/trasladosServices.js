import Api from "../Api/Api";

export const getTraslados=()=>Api.get("/traslados/ObtenerTraslados.php")
.then((res) => res.data);

export const getTrasladosFiltrados=(nombre='')=>Api.get(`/traslados/TrasladosFiltrados.php?nj=${nombre}`)
.then((res) => res.data);

export const DeleteTraslados=(id)=>Api.post("/traslados/EliminarTraslados.php",id)
.then((res) => res.data);

export const crearTraslados=(traslado)=>Api.post("/traslados/CrearTraslado.php",traslado)
.then((res) => res.data[0]);

export const verificarTraslados=(fecha)=>Api.post("/traslados/VerificarTraslados.php",fecha)
.then((res) => res.data);

export const verificarTrasladosEmpleado=(fecha)=>Api.post("/traslados/verificarEmpTraslados.php",fecha)
.then((res) => res.data);

export const detallesTraslados=(id)=>Api.post("traslados/TraslEmpDetalle.php",id)
.then((res) => res.data);