import React,{createContext, useEffect, useReducer, useState} from 'react';
import PlazasReducer from './PlazasReducer';
import {OBTENER_PLAZAS} from '../../types'
import Api from '../../Api/Api';


export const PlazasContext=createContext();


export const PlazasProvider=({children})=>{
    
    const initialState={
        plazas:[],
        cargando:true,
    }
    const [state, dispatch] = useReducer(PlazasReducer, initialState);
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
            const {data}=await Api.get(`/plazas/ObtenerPlazas.php`);

            dispatch({
                type:OBTENER_PLAZAS,
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
            formData.append('nombrePlaza',nombre);
            const {data}=await Api.post(`/plazas/PlazasFiltro.php`,formData);
            dispatch({
                type:OBTENER_PLAZAS,
                payload:data
            });
        } catch (error) {
            setError("Error en el servidor");
        }
    }

    return(
        <PlazasContext.Provider value={{
            plazas:state.plazas,
            cargando:state.cargando,
            error,
            setConsultar,
            buscador
        }}>
            {children}
        </PlazasContext.Provider>
    )
}