import {useState,useEffect} from 'react'
import Api from '../Api/Api';

export const UsePostDatos = (consulta,body) => {

    const [datos, setDatos] = useState();
    const [error, setError] = useState();

    useEffect(()=>{
        obtenerDatos();
    },[]);
  
    const obtenerDatos=async()=>{
      try {
        const {data}=await Api.post(`/${consulta}`,body);
  
        setDatos(data);
      } catch (error) {
        setError(error.response.data);
      }
    }
    return {
        datos,
        error
    }
}
