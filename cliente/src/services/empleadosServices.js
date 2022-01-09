import Api from "../Api/Api";

export const getEmpleados = () =>
  Api.get('/empleados/ObtenerEmpleados.php').then((res) => res.data);

export const nuevosEmpleados = (empleados) =>
  Api.post('/empleados/CrearEmpleados.php', empleados).then((res) => res.data);

export const editarEmpleados = (empleados) =>
  Api.post('/empleados/EditarEmpleado.php', empleados).then((res) => res.data[0]);

export const eliminarEmpleados = (idEmpleado) =>
  Api.post('/empleados/EliminarEmpleado.php',  idEmpleado ).then((res) => res.data);

export const buscadorEmpleados=(nombre)=>Api.post("/empleados/EmpleadosFiltro.php",nombre)
.then((res) => res.data);

export const ObtenerEmpleadosFiltrados=(ubicacion)=>Api.post("/empleados/ObtenerEmpleadosFiltrados.php",ubicacion)
.then((res) => res.data);

export const detallesEmpleados=(id)=>Api.post("/empleados/EmpleadosDetalle.php",id)
.then((res) => res.data[0]); 