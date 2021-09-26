import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Login } from './components/Login';
import { NuevaCuenta } from './components/NuevaCuenta';
import { Reportes } from './components/Reportes';
import { Usuarios } from './components/Usuarios';
import { Empleados} from './components/Empleados';
import { Ubicaciones } from './components/Ubicaciones';
import { Plazas } from './components/Plazas';

import '../src/index.css';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/nueva-cuenta" component={NuevaCuenta} />
        <Route exact path="/reportes" component={Reportes} />
        <Route exact path="/usuarios" component={Usuarios} />
        <Route exact path="/empleados" component={Empleados} />
        <Route exact path="/ubicaciones" component={Ubicaciones} />
        <Route exact path="/plazas" component={Plazas} />
      </Switch>
    </Router>
  )
}





export default App
