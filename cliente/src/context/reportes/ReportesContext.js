import React,{createContext, useEffect, useReducer, useState} from 'react';
import ReportesReducer from './ReportesReducer';
import {OBTENER_REPORTE} from '../../types'
import Api from '../../Api/Api';


export const ReportesContext=createContext();


export const ReportesProvider=({children})=>{
    
    const initialState={
        reportes:[],
        cargando:true,
    }
    const [state, dispatch] = useReducer(ReportesReducer, initialState);
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
            const {data}=await Api.get(`/reportes/ObtenerReportes.php`);

            dispatch({
                type:OBTENER_REPORTE,
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
            const {data}=await Api.get(`/reportes/ObtenerReportesFiltrados.php?nj=${nombre}`);
            dispatch({
                type:OBTENER_REPORTE,
                payload:data
            });
        } catch (error) {
            setError("Error en el servidor");
        }
    }

    return(
        <ReportesContext.Provider value={{
            reportes:state.reportes,
            cargando:state.cargando,
            error,
            setConsultar,
            buscador
        }}>
            {children}
        </ReportesContext.Provider>
    )
}