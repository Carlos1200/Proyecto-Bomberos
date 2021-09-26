import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Login } from './components/screens/Login';
import { NuevaCuenta } from './components/screens/NuevaCuenta';
import { Reportes } from './components/screens/Reportes';
import { Usuarios } from './components/screens/Usuarios';
import { Empleados} from './components/screens/Empleados';
import { Ubicaciones } from './components/screens/Ubicaciones';
import { Plazas } from './components/screens/Plazas';

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
