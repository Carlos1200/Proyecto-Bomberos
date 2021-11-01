import {useState,useEffect} from 'react'
import Api from '../Api/Api';

export const UseDatos = (consulta) => {

    const [datos, setDatos] = useState();
    const [cargando, setCargando] = useState(true);
    const [consultarDB, setConsultarDB] = useState(false)

    useEffect(()=>{
        obtenerDatos();
        // eslint-disable-next-line
    },[consultarDB]);
  
    const obtenerDatos=async()=>{

        try {
            const {data}=await Api.get(`/${consulta}`);
            setDatos(data);
            setCargando(false);
            setConsultarDB(false);
        } catch (error) {
            console.log(error.response.data||"Error en el servidor");
        }
    }
    return [
        datos,
        cargando,
        setConsultarDB
    ]
}
