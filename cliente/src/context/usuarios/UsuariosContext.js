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
            const {data}=await Api.get(`/usuarios`);

            dispatch({
                type:OBTENER_USUARIOS,
                payload:data
            });
            setConsultar(false);
        } catch (error) {
            console.log(error.response.data||"Error en el servidor");
        }
    }

    const buscador=async(nombre)=>{
        try {
            const formData=new FormData();
            formData.append('NombreUsuario',nombre);
            const {data}=await Api.post(`/usuariosFiltro`,formData);
            dispatch({
                type:OBTENER_USUARIOS,
                payload:data
            });
        } catch (error) {
            console.log(error.response.data||"Error en el servidor");
        }
    }

    return(
        <UsuariosContext.Provider value={{
            usuarios:state.usuarios,
            cargando:state.cargando,
            setConsultar,
            buscador
        }}>
            {children}
        </UsuariosContext.Provider>
    )
}