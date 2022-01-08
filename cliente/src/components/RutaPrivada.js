import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import {AuthContext} from '../context/Auth/AuthContext';
import { Loading } from './Loading';


const RutaPrivada = ({ component: Component, ...props  }) => {

    

    const {login,cargando} = useContext(AuthContext);
    if(cargando){
      return <Loading/>
    }

    return ( 
        <Route { ...props } render={ props => !login && !cargando ?  (
            <Redirect to="/" />
        )  : (
            <Component {...props} />
        ) } />

     );
}
 
export default RutaPrivada;