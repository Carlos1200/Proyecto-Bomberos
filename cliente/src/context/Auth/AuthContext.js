import React,{createContext,useEffect,useReducer} from 'react';
import AuthReducer from './AuthReducer';
import {INICIO_SESION,CERRAR_SESION} from '../../types'
import { verificarSesion } from '../../services/authServices';

export const AuthContext=createContext();

export const AuthProvider=({children})=>{

    const initialState={
        idUsuario:'',
        NombreUsuario:'',
        tipoUsuario:'',
        UbicacionUsuario:"",
        login:false,
        cargando:true,
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    useEffect(()=>{
        verificarSesion().then(res=>{
            const {NombreUsuario,idUsuario,login,tipoUsuario,UbicacionUsuario}=res;
            dispatch({
                type:INICIO_SESION,
                payload:{
                  idUsuario,
                  NombreUsuario,
                  tipoUsuario,
                  UbicacionUsuario,
                  login
                }
            });
        }).catch(error=>{
            console.log({error});
            dispatch({
                type:CERRAR_SESION
            })
        });
    },[]);
    
    const inicioSesion=(idUsuario,NombreUsuario,tipoUsuario,UbicacionUsuario,login)=>{
        dispatch({
            type:INICIO_SESION,
            payload:{
                idUsuario,
                NombreUsuario,
                tipoUsuario,
                UbicacionUsuario,
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
            UbicacionUsuario:state.UbicacionUsuario,
            login:state.login,
            cargando:state.cargando,
            inicioSesion,
            cerrarSesion
        }}>
            {children}
        </AuthContext.Provider>
    )
}