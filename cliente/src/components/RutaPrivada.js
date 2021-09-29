import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import {AuthContext} from '../context/Auth/AuthContext';
import Api from '../Api/Api';

const RutaPrivada = ({ component: Component, ...props  }) => {

    const {inicioSesion,login,cargando} = useContext(AuthContext);

  useEffect(()=>{
    obtenerSesion();
  },[]);

  const obtenerSesion=async()=>{
    try {
      const {data}= await Api.get('/logverificar',{withCredentials:true});
      const {NombreUsuario,idUsuario,login,tipoUsuario}=data;

      inicioSesion(idUsuario,NombreUsuario,tipoUsuario,login);
    } catch (error) {
      console.log({error});
    }
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