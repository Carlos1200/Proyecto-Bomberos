import { useCallback, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {
  RecoilRoot,
} from 'recoil';
import env from 'react-dotenv'
import { Login } from './components/screens/Login';
import { NuevaCuenta } from './components/screens/NuevaCuenta';
import { Reportes } from './components/screens/Reportes';
import { Usuarios } from './components/screens/Usuarios';
import { Empleados} from './components/screens/Empleados';
import { Ubicaciones } from './components/screens/Ubicaciones';
import { Plazas } from './components/screens/Plazas';
import { GenerarReporte } from './components/screens/GenerarReporte';
import RutaPrivada from './components/RutaPrivada';
import { Grupos } from './components/screens/Grupos';
import { Traslados } from './components/screens/Traslados';
import { AuthProvider } from './context/Auth/AuthContext';
import { AdminTraslados } from './components/screens/AdminTraslados';
import { verificarTraslados, verificarTrasladosEmpleado } from './services/trasladosServices';

import '../src/index.css';
import { Page404 } from './components/screens/Page404';

const App = () => {

  const ValidarTraslados = useCallback(
    async () => {
      const date=new Date();
      const fecha= date.toISOString().slice(0, 10);
      
      const formData = new FormData();
      formData.append("fechaActual", fecha);
      verificarTraslados(formData).then(()=>{
        verificarTrasladosEmpleado(formData);
      });
    },
    [],
  );

  useEffect(() => {
    ValidarTraslados();
    // eslint-disable-next-line 
  }, [])

  return (
    <AppState>
      <Router basename={env.SUB_HOST}>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route exact path='/nueva-cuenta' component={NuevaCuenta} />
          <RutaPrivada exact path='/reportes' component={Reportes} />
          <RutaPrivada exact path='/usuarios' component={Usuarios} />
          <RutaPrivada exact path='/empleados' component={Empleados} />
          <RutaPrivada exact path='/ubicaciones' component={Ubicaciones} />
          <RutaPrivada exact path='/grupos' component={Grupos} />
          <RutaPrivada exact path='/plazas' component={Plazas} />
          <RutaPrivada exact path='/admin-traslados' component={AdminTraslados} />
          <RutaPrivada exact path='/traslados' component={Traslados} />
          <RutaPrivada exact path='/generar-reporte' component={GenerarReporte} />
          <Route path='*' component={Page404}/>
        </Switch>
      </Router>
    </AppState>
  );
}

const AppState=({children})=>{
  return(
    <RecoilRoot>
      <AuthProvider>
          {children}
      </AuthProvider>
    </RecoilRoot>
  )
}

export default App
