import {useState,useEffect} from 'react'
import Api from '../Api/Api';

export const UseDatos = (consulta) => {

    const [datos, setDatos] = useState();
    const [cargando, setCargando] = useState(true);
    const [consultarUsarios, setConsultarUsarios] = useState(false)

    useEffect(()=>{
        obtenerDatos();
        setConsultarUsarios(false);
    },[consultarUsarios]);
  
    const obtenerDatos=async()=>{
      const {data}=await Api.get(`/${consulta}`);
  
      setDatos(data);
      setCargando(false);
    }
    return {
        datos,
        cargando,
        setConsultarUsarios
    }
}
