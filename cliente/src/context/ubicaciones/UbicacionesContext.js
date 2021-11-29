import React,{createContext, useEffect, useReducer, useState} from 'react';
import UbicacionesReducer from './UbicacionesReducer';
import {OBTENER_UBICACIONES} from '../../types'
import Api from '../../Api/Api';


export const UbicacionesContext=createContext();


export const UbicacionesProvider=({children})=>{
    
    const initialState={
        ubicaciones:[],
        cargando:true,
    }
    const [state, dispatch] = useReducer(UbicacionesReducer, initialState);
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
            const {data}=await Api.get(`/ubicacion`);

            dispatch({
                type:OBTENER_UBICACIONES,
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
            formData.append('nombreUbicacion',nombre);
            const {data}=await Api.post(`/ubicacionFiltro`,formData);
            dispatch({
                type:OBTENER_UBICACIONES,
                payload:data
            });
        } catch (error) {
            console.log(error.response.data||"Error en el servidor");
        }
    }

    return(
        <UbicacionesContext.Provider value={{
            ubicaciones:state.ubicaciones,
            cargando:state.cargando,
            setConsultar,
            buscador
        }}>
            {children}
        </UbicacionesContext.Provider>
    )
}