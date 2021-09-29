import React,{createContext,useReducer} from 'react';
import AuthReducer from './AuthReducer';
import {INICIO_SESION,CERRAR_SESION} from '../../types'

export const AuthContext=createContext();



export const AuthProvider=({children})=>{

    const initialState={
        idUsuario:'',
        NombreUsuario:'',
        tipoUsuario:'',
        login:false,
        cargando:true,
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    const inicioSesion=(idUsuario,NombreUsuario,tipoUsuario,login)=>{
        dispatch({
            type:INICIO_SESION,
            payload:{
                idUsuario,
                NombreUsuario,
                tipoUsuario,
                login
            }
        })
    }

    const cerrarSesion=()=>{
        dispatch({
            type:CERRAR_SESION
        })
    }

    return(
        <AuthContext.Provider value={{
            idUsuario:state.idUsuario,
            NombreUsuario:state.NombreUsuario,
            tipoUsuario:state.tipoUsuario,
            login:state.login,
            cargando:state.cargando,
            inicioSesion,
            cerrarSesion
        }}>
            {children}
        </AuthContext.Provider>
    )
}