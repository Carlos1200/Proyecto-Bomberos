import React,{createContext, useEffect, useReducer, useState} from 'react';
import UsuariosReducer from './UsuariosReducer';
import {OBTENER_USUARIOS} from '../../types'
import Api from '../../Api/Api';


export const UsuariosContext=createContext();


export const UsuariosProvider=({children})=>{
    
    const initialState={
        usuarios:[],
        cargando:true,
    }
    const [state, dispatch] = useReducer(UsuariosReducer, initialState);
    const [consultar, setConsultar] = useState(false);
    const [error, setError] = useState(null);
    useEffect(()=>{
        if(consultar){
            consultarDatos();
        }
    },[consultar]);

    useEffect(()=>{
        consultarDatos();
    },[]);

    const consultarDatos=async()=>{
        try {
            const {data}=await Api.get(`/usuarios/ObtenerUsuarios.php`);

            dispatch({
                type:OBTENER_USUARIOS,
                payload:data
            });
            setConsultar(false);
        } catch (error) {
            setError("Error en el servidor");
        }
    }

    const buscador=async(nombre)=>{
        try {
            const formData=new FormData();
            formData.append('NombreUsuario',nombre);
            const {data}=await Api.post(`/usuarios/UsuariosFiltro.php`,formData);
            dispatch({
                type:OBTENER_USUARIOS,
                payload:data
            });
        } catch (error) {
            setError("Error en el servidor");
        }
    }

    return(
        <UsuariosContext.Provider value={{
            usuarios:state.usuarios,
            cargando:state.cargando,
            error,
            setConsultar,
            buscador
        }}>
            {children}
        </UsuariosContext.Provider>
    )
}