import React,{createContext, useEffect, useReducer, useState} from 'react';
import Api from '../../Api/Api';
import {OBTENER_EMPLEADOS} from '../../types';
import EmpleadosReducer from './EmpleadosReducer';

export const EmpleadosContext=createContext();

export const EmpleadosProvider=({children})=>{

    const initialState={
        empleados:[],
        cargando:true,
    }

    const [state, dispatch] = useReducer(EmpleadosReducer, initialState);
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
            const {data}=await Api.get(`/empleado`);

            dispatch({
                type:OBTENER_EMPLEADOS,
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
            formData.append('nombres',nombre);
            const {data}=await Api.post(`/empleadosFiltrados`,formData);
            dispatch({
                type:OBTENER_EMPLEADOS,
                payload:data
            });
        } catch (error) {
            setError("Error en el servidor");
        }
    }

    return(
        <EmpleadosContext.Provider value={{
            empleados:state.empleados,
            cargando:state.cargando,
            error,
            setConsultar,
            buscador
        }}>
            {children}
        </EmpleadosContext.Provider>
    )
}