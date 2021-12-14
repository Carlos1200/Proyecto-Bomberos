import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
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
import {UsuariosProvider} from './context/usuarios/UsuariosContext';
import { AdminTraslados } from './components/screens/AdminTraslados';
import { EmpleadosProvider } from './context/empleados/EmpleadosContext';
import { UbicacionesProvider } from './context/ubicaciones/UbicacionesContext';
import { PlazasProvider } from './context/plazas/PlazasContext';
import { GrupoProvider } from './context/grupos/GrupoContext';
import { ReportesProvider } from './context/reportes/ReportesContext';

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
          <RutaPrivada exact path='/grupos' component={Grupos} />
          <RutaPrivada exact path='/plazas' component={Plazas} />
          <RutaPrivada exact path='/admin-traslados' component={AdminTraslados} />
          <RutaPrivada exact path='/traslados' component={Traslados} />
          <RutaPrivada exact path='/generar-reporte' component={GenerarReporte} />
        </Switch>
      </Router>
    </AppState>
  );
}

const AppState=({children})=>{
  return(
    <AuthProvider>
      <UsuariosProvider>
        <EmpleadosProvider>
          <UbicacionesProvider>
            <PlazasProvider>
              <GrupoProvider>
                <ReportesProvider>
                  {children}
                </ReportesProvider>
              </GrupoProvider>
            </PlazasProvider>
          </UbicacionesProvider>
        </EmpleadosProvider>
      </UsuariosProvider>
    </AuthProvider>

  )
}

export default App
