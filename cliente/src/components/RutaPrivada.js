import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import CacheRoute from 'react-router-cache-route'
import styled from "styled-components";
import {AuthContext} from '../context/Auth/AuthContext';
import { Loading } from './Loading';


const RutaPrivada = ({ component: Component, ...props  }) => {

    

    const {login,cargando} = useContext(AuthContext);
    if(cargando){
      return <Loading/>
    }

    return (
        <StyledRouter props={props} Component={Component} login={login} cargando={cargando} />
     );
}

const CustomRouter=({props,className,Component,login,cargando})=>(
<CacheRoute when='always' className={className} { ...props } render={ props => !login && !cargando ?  (
    <Redirect to="/" />
)  : (
    <Component {...props} />
) } />
)

const StyledRouter=styled(CustomRouter)`
    height: 100vh;
`
 
export default RutaPrivada;