import {useState} from 'react'
import styled from 'styled-components'
import XLSX from "xlsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose} from '@fortawesome/free-solid-svg-icons';
import { useSetRecoilState } from 'recoil';
import { ExcelInput } from '../ExcelInput';
import { Modal } from '../Modal';
import { nuevosEmpleados } from '../../services/empleadosServices';
import { empleadosState } from '../../atom/AtomTablas';

export const ArchivoEmpleadoModal = ({handleClose,notificacion}) => {

  const [empleado, setEmpleado] = useState(null);
  const [cargando, setCargando] = useState(false);
  const setEmpleados=useSetRecoilState(empleadosState);

  const exportFile = () => {
		/* convert state to workbook */
		const ws = XLSX.utils.aoa_to_sheet([['nombre','apellido','salario','ubicacion','plaza','pension','grupo']]);
		const wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, "Plantilla");
		/* generate XLSX file and send to client */
		XLSX.writeFile(wb, "Plantilla.xlsx")
	};


  const submit=async()=>{
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
      formData.append('selectTop',empleado.selectTop);
      nuevosEmpleados(formData).then((res)=>{
        setEmpleados((oldValue)=>[...oldValue,...res]);
        handleClose();
        notificacion();
      }).catch(error=>{
        notificacion(true,"Error al cargar los empleados");
      }).finally(()=>{
        setCargando(false);
      })
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
                  <Btn onClick={exportFile} style={{marginRight:'2rem'}}>
                    Plantilla
                  </Btn>
                  <Btn disabled={empleado?false:true||cargando} onClick={()=>submit()} >
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
  opacity:${props=>props.disabled?'0.5':'1'};
  &:hover{
    background-color:#0C9021 ;
  }
`