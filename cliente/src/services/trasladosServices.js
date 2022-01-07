import Api from "../Api/Api";

export const getTraslados=()=>Api.get("/traslados/ObtenerTraslados.php")
.then((res) => res.data);

export const DeleteTraslados=(id)=>Api.post("/traslados/EliminarTraslados.php",id)
.then((res) => res.data);

export const crearTraslados=(traslado)=>Api.post("/traslados/CrearTraslado.php",traslado)
.then((res) => res.data[0]);