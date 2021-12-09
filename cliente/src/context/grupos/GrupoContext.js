import React,{createContext, useEffect, useReducer, useState} from 'react';
import GrupoReducer from './GrupoReducer';
import {OBTENER_GRUPOS} from '../../types'
import Api from '../../Api/Api';


export const GrupoContext=createContext();


export const GrupoProvider=({children})=>{
    
    const initialState={
        grupos:[],
        cargando:true,
    }
    const [state, dispatch] = useReducer(GrupoReducer, initialState);
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
            const {data}=await Api.get(`/grupo`);

            dispatch({
                type:OBTENER_GRUPOS,
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
            formData.append('nombreGrupo',nombre);
            const {data}=await Api.post(`/grupoFiltro`,formData);
            dispatch({
                type:OBTENER_GRUPOS,
                payload:data
            });
        } catch (error) {
            setError("Error en el servidor");
        }
    }

    return(
        <GrupoContext.Provider value={{
            grupos:state.grupos,
            cargando:state.cargando,
            error,
            setConsultar,
            buscador
        }}>
            {children}
        </GrupoContext.Provider>
    )
}