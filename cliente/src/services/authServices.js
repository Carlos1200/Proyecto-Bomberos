import Api from "../Api/Api";

export const iniciarSesion = (credenciales) =>
  Api.post('/login/Login.php', credenciales).then((res) => res.data);

export const verificarSesion =() =>
  Api.get('/login/Verificar.php').then((res) => res.data);

export const CerrarSesion = () =>
  Api.get('/login/Logout.php').then((res) => res.data);