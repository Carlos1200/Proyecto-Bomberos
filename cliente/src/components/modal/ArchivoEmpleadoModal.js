import React,{useContext, useState} from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose} from '@fortawesome/free-solid-svg-icons';
import { ExcelInput } from '../ExcelInput';
import { Modal } from '../Modal';
import Api from '../../Api/Api';
import { EmpleadosContext } from '../../context/empleados/EmpleadosContext';

export const ArchivoEmpleadoModal = ({handleClose,notificacion}) => {

  const [empleado, setEmpleado] = useState(null);
  const [cargando, setCargando] = useState(false);
  const {setConsultar}=useContext(EmpleadosContext);

  const submit=async()=>{
    setConsultar(false);
    setCargando(true);
      const formData=new FormData();
      formData.append('nombres',empleado.nombres);
      formData.append('apellidos',empleado.apellidos)
      formData.append('salarioNominal',empleado.salarioNominal)
      formData.append('idGrupo',empleado.idGrupo)
      formData.append('idPension',empleado.idPension)
      formData.append('idUbicacion',empleado.idUbicacion)
      formData.append('idPlaza',empleado.idPlaza)
      formData.append('fechaCreacionEmpleado',empleado.fechaCreacionEmpleado);

      try {
      await Api.post("/empleado",formData);
      setConsultar(true);
      setCargando(false)
      handleClose();
      notificacion();
      } catch (error) {
        setCargando(false)
        console.log(error.response.data);
      }
  }

    return (
        <Modal handleClose={handleClose}>
            <Contenedor>
              <div style={{width:'100%',display:'flex',justifyContent:'flex-end',margin:"-1.3rem 0"}}>
                <FontAwesomeIcon
                  icon={faWindowClose}
                  style={{
                    color: "red",
                    fontSize: "2.5rem",
                    cursor: "pointer"
                  }}
                  onClick={handleClose}
                />
            </div>
                <Titulo>Suelta tu archivo Excel aquí</Titulo>
                {cargando&&<Error>Subiendo los datos, puede tomar unos minutos</Error>}
                <div style={{display:'flex',justifyContent:'center'}}>
                  <ExcelInput setEmpleados={setEmpleado} />
                </div>
                <div style={{display:'flex',justifyContent:'center'}}>
                  <Btn disabled={empleado?false:true} onClick={()=>submit()} >
                    Guardar Empleados
                  </Btn>
                </div>
            </Contenedor>
        </Modal>
    )
}

const Contenedor=styled.div`
    /* background-color: red; */
    width: 100%;
    height: 100%;
`

const Titulo=styled.h2`
    text-align: center;
    font-weight: bold;
`

const Error=styled.h3`
    text-align: center;
    font-weight: bold;
    color: red;
`

const Btn=styled.button`
  margin-top: 2rem;
  padding: 1rem 2rem;
  border-radius: 2rem;
  font-size: 1.3rem;
  font-weight: bold;
  background-color: #67BB6F;
  border: 0;
  &:hover{
    background-color:#0C9021 ;
  }
`