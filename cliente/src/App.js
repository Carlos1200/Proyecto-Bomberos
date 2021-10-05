import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Login } from './components/screens/Login';
import { NuevaCuenta } from './components/screens/NuevaCuenta';
import { Reportes } from './components/screens/Reportes';
import { Usuarios } from './components/screens/Usuarios';
import { Empleados} from './components/screens/Empleados';
import { Ubicaciones } from './components/screens/Ubicaciones';
import { Plazas } from './components/screens/Plazas';
import { AuthProvider } from './context/Auth/AuthContext';
import { GenerarReporte } from './components/screens/GenerarReporte';
import RutaPrivada from './components/RutaPrivada';
import '../src/index.css';

const App = () => {
  
  return (
    <AppState>
      <Router>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route exact path='/nueva-cuenta' component={NuevaCuenta} />
          <RutaPrivada exact path='/reportes' component={Reportes} />
          <RutaPrivada exact path='/usuarios' component={Usuarios} />
          <RutaPrivada exact path='/empleados' component={Empleados} />
          <RutaPrivada exact path='/ubicaciones' component={Ubicaciones} />
          <RutaPrivada exact path='/plazas' component={Plazas} />
          <RutaPrivada exact path='/generar-reporte' component={GenerarReporte} />
        </Switch>
      </Router>
    </AppState>
  );
}

const AppState=({children})=>{
  return(
    <AuthProvider>
      {children}
    </AuthProvider>

  )
}

export default App
