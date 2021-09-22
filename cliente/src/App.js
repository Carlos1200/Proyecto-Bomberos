import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Login } from './components/Login';
import { NuevaCuenta } from './components/NuevaCuenta';
import { Reportes } from './components/Reportes';
import '../src/index.css';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/nueva-cuenta" component={NuevaCuenta} />
        <Route exact path="/reportes" component={Reportes} />
      </Switch>
    </Router>
  )
}

export default App
