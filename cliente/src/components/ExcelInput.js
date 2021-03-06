import React, { useCallback, useState,useEffect } from "react";
import XLSX from "xlsx";
import { useDropzone } from "react-dropzone";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExcel} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components'
import { UseExcel } from "../hooks/UseExcel";
import { getUbicaciones } from "../services/ubicacionesServices";
import { getPlazas } from "../services/plazasServices";
import { getGrupos } from "../services/gruposServices";
import { getPensiones } from "../services/pensionesServices";

const getColor = (props) => {
  if (props.isDragAccept) {
      return '#1F6E43';
  }
  if (props.isDragReject) {
      return '#ff1744';
  }
  if (props.isDragActive) {
      return '#2196f3';
  }
  return '#000000';
}

export const ExcelInput = ({setEmpleados}) => {
  const [cargando, setCargando] = useState(true);
  const [data, setData] = useState(null);
  const [archivo, setArchivo] = useState(null);
  const [error, setError] = useState(null);
  const [infoEmpleado, setInfoEmpleado] = useState();

  const {verificarEmpleados,procesando,empleadosActualizado}=UseExcel(setError);

  useEffect(() => {
    Promise.all([
      getUbicaciones(),
      getPlazas(),
      getGrupos(),
      getPensiones(),
    ])
      .then(([ubicaciones, plazas, grupos, pensiones]) => {
        setInfoEmpleado({
          ubicaciones,
          plazas,
          grupos,
          pensiones,
        });
      })
      .catch((error) => {
        if (!error.response) {
          setError("Error en el servidor");
        } else {
          setError(error.response.data[0]);
        }
      })
      .finally(() => {
        setCargando(false);
      });
  }, []);


  const onDrop = useCallback((acceptedFiles,fileRejections) => {
    setError(null)
    if(fileRejections.length>0){
      setError("Solo se pueden subir archivos Excel");

      setTimeout(() => {
        setError(null);
      }, 3000);
      return;
    }
    setArchivo({
      nombre:acceptedFiles[0].path,
      size:acceptedFiles[0].size,
    })
    const reader = new FileReader();
    reader.onload = (e) => {
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: "array" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];

      const data = XLSX.utils.sheet_to_json(ws, { header: 0,defval:"" });
      setData(data);

    };
    reader.readAsArrayBuffer(acceptedFiles[0]);
  }, []);

  useEffect(()=>{
    if(data){
      verificarEmpleados(data,infoEmpleado.ubicaciones,infoEmpleado.plazas,infoEmpleado.pensiones,infoEmpleado.grupos);
    }
    // eslint-disable-next-line
  },[data]);

  useEffect(()=>{
    if(empleadosActualizado){
      setEmpleados(empleadosActualizado);
    }
    // eslint-disable-next-line
  },[empleadosActualizado])

  const { getRootProps, getInputProps, isDragActive,isDragAccept,isDragReject } = useDropzone({
    onDrop,
    accept:["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet","application/vnd.ms-excel"]
  });

  
  return (
    <>
    {!cargando&&(

    <Contenedor {...getRootProps({isDragActive,isDragReject,isDragAccept})} activo={isDragActive}>
      <input {...getInputProps()} />
      {error?<TextoError>{error}</TextoError>:null}
      {isDragActive ? (
        <Text>Suelta tu Archivo Aqu??</Text>
      ) : (
        <>
        {procesando?<TextoArchivo>Procesando Archivo ...</TextoArchivo>:
          
          archivo&&!error?(
          <ContenedorArchivo>
              <TextoArchivo>{archivo.nombre} - {archivo.size} bytes</TextoArchivo>
              <FontAwesomeIcon
                  icon={faFileExcel}
                  style={{ fontSize: "23px", color: "1F6E43" }}
                /> 
          </ContenedorArchivo>
        ):<Text>Arrastra tu archivo y sueltalo aqu??</Text>}
        
        </>
        
      )}
    </Contenedor>
    )}
    </>
  );
};

const Contenedor=styled.div`
  padding: 5rem;
  background-color: ${props=>props.activo?"rgba(0,0,0,.3)":"#fff"};
  border-width: 2px;
  border-style: ${props=>props.activo?"dashed":"solid"};
  border-color: ${props => getColor(props)};
  width: 100%;
  margin: 0 5rem;
  border-radius: 2rem;
`
const Text=styled.p`
  text-align: center;
  font-size: 1.5rem;
`

const ContenedorArchivo=styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const TextoArchivo=styled.p`
  font-size: 1.1rem;
  margin-right: 1rem;
`

const TextoError=styled.p`
  font-size: 1.1rem;
  color: red;
  text-align: center;
`