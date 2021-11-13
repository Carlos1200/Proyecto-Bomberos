import React,{createContext, useEffect,useState} from "react";
import Api from "../../Api/Api";


export const EmpleadoContext=createContext();

export const EmpleadoProvider=({children})=>{
    const [empleados, setEmpleados] = useState([]);
    const [errores, setErrores] = useState([]);
    const [cargando, setCargando] = useState(true)
    // const [consultar, setConsultar] = useState(false);
    useEffect(()=>{
        obtenerEmpleados();
    },[])

    const obtenerEmpleados=async()=>{
        try {
            const {data}=await Api.get('/empleado');
            setEmpleados(data);
            setCargando(false);
        } catch (error) {
            if(!error.response){
                setErrores(["Error en el servidor"])
              }else{
                setErrores(error.response.data);
              }
              setTimeout(() => {
                setErrores(null);
              }, 3000);
        }
    }

    return(
        <EmpleadoContext.Provider value={{
            empleados,
            errores,
            cargando
        }}>
            {children}
        </EmpleadoContext.Provider>
    )
}