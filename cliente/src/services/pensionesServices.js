import Api from "../Api/Api";

export const getPensiones = () =>
  Api.get('pensiones/ObtenerPensiones.php').then((res) => res.data);