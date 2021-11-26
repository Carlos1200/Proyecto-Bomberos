import React, { useContext, useEffect, useState } from 'react'
import styled from "styled-components";
import { ListadoEmpleados } from '../ListadoEmpleados';
import { AuthContext } from '../../context/Auth/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch} from '@fortawesome/free-solid-svg-icons';
import { AnimatePresence } from 'framer-motion';
import { Background } from '../Background'
import { Menu } from '../Menu'
import Api from '../../Api/Api';
import Select from 'react-select';

export const GenerarReporte = () => {

    const {NombreUsuario,UbicacionUsuario,tipoUsuario}=useContext(AuthContext);
    const [cargando, setCargando] = useState(true);
    const [empleados, setEmpleados] = useState([]);
    const [empleadosSeleccionados, setEmpleadosSeleccionados] = useState([]);
    const [visible, setVisible] = useState(false);
  
  
    const obtenerEmpleados=async()=>{
      try {
        if(tipoUsuario!=="Administrador"){
          const formData=new FormData();
          formData.append('nombreUbicacion',UbicacionUsuario);
          const {data}=await Api.post('empleadoFiltro',formData);
          setEmpleados(data);
        }else{
          const {data}=await Api.get('empleado');
          setEmpleados(data);
        }
        setCargando(false);
      } catch (error) {
        console.log(error);
        setCargando(false);
      }
    }
  
    useEffect(() => {
        obtenerEmpleados();
    }, [])

    const eliminarEmpleado=(id)=>{
        const empleadoEliminado=empleadosSeleccionados.find(empleado=>empleado.idEmpleado===id);
        setEmpleados([...empleados,empleadoEliminado]);
        const seleccionar=empleadosSeleccionados.filter(empleado=>empleado.idEmpleado!==id);
    
        setEmpleadosSeleccionados(seleccionar);
      }

  
    return (
      <>
        <Menu>
            <Background titulo="Generar Reporte">
                <ReportsBox>
                    <TextBoxTitle>Reporte de Planilla para Tiempo Extraordinario</TextBoxTitle>
                            <TextBoxSubtitle>
                                <Jefe>Jefe de Estación:</Jefe>
                                <JefeNombre>{NombreUsuario}</JefeNombre>
                                <Jefe>Empleado:</Jefe>
            <div style={{display:'flex',justifyContent:'center'}}>
            </div>
            {!cargando?(
              <div>
              <div>
                <FilterBox>
              <FilterTextBox>
                  <Select
                  options={empleados}
                  getOptionLabel={(empleado)=>`${empleado.nombres} ${empleado.apellidos}`}
                  getOptionValue={(empleado)=>empleado.idEmpleado}
                  placeholder="Selecciona un empleado"
                  onChange={(value)=>{
                    setEmpleadosSeleccionados([...empleadosSeleccionados,value])
                    const nuevoArreglo=empleados.filter(empleado=>empleado.idEmpleado!==value.idEmpleado);
                    setEmpleados(nuevoArreglo);
                  }}
                  menuPlacement="bottom"
                  />
              </FilterTextBox>
              </FilterBox>
              <ContenedorEnvio >
                <ListadoEmpleados Empleados={empleadosSeleccionados} eliminaListado={eliminarEmpleado}/>
              </ContenedorEnvio>
                <Boton onClick={()=>setVisible(true)} disabled={empleadosSeleccionados.length>0?false:true}>
                  Agregar
                </Boton>
              </div>
            </div>
            ):null}
                            </TextBoxSubtitle>
                </ReportsBox>
            </Background>
        </Menu>

      </>
    );
}

const ReportsBox = styled.div`
    background-color: #FFFFFF;
    flex: 1;
    border-radius: 20px;
    margin-top: 10px;
    margin-bottom: 30px;
    margin-left: 40px;
    margin-right: 40px;
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 8px;
    flex-direction: column;
`

const TextBoxTitle = styled.div`
    flex: 1;
    padding-top: 10px;
    padding-bottom: 5px;
    margin-left: 50px;
    margin-right: 50px;
    text-align: center;
    font-size: 24px;
    border-bottom: 1px solid #000;
`

const TextBoxSubtitle = styled.div`
    flex: 1;
    padding-top: 10px;
    padding-bottom: 5px;
    margin-left: 50px;
    margin-right: 50px;
    text-align: center;
    font-size: 24px;
`
const ContenedorGrid = styled.div`
display:grid;
grid-template-columns: 1fr 1fr;
grid-template-rows:auto;
padding-top:40px;
`

const Jefe=styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const JefeNombre=styled.p`
  font-size: 1.2rem;
  color: #666666;
  font-weight: bold;
`
const LeftGrid=styled.div`
grid-column: 1;
`

const Title=styled.h2`
  text-align: center;
  margin-bottom: .5rem;
`;

const JefeEstacion=styled.p`
  margin-right: .5rem;
  font-size: 1.2rem;
`

const FilterBox = styled.div`
`

const FilterTextBox = styled.div`
    flex: 1;
    padding-top: 10px;
    padding-bottom: 5px;
    margin: 0 .5rem;
    text-align: center;
    font-size: 18px;
`

const ContenedorEnvio=styled.div`
  overflow-y: auto;
  height: 35vh;
  margin-top: 1rem;

  &::-webkit-scrollbar {
  width: 12px;               /* width of the entire scrollbar */
}

  &::-webkit-scrollbar-track {
  background: #e2e2e2;        /* color of the tracking area */
  border-radius: 2rem;
}

  &::-webkit-scrollbar-thumb {
  background-color: #343F56;    /* color of the scroll thumb */
  border-radius: 20px;       /* roundness of the scroll thumb */
  border: 3px solid #e2e2e2;  /* creates padding around scroll thumb */
}
`

const Boton=styled.button`
  padding: 1rem 3rem;
  border-radius: 2rem;
  margin-top: .5rem;
  font-size: 1.2rem;
  font-weight: bold;
  border: 0;
  background-color: #FFE459;
  transition: background-color .3s ease-in-out;
  &:hover{
    background-color: #E8C410;
  }
`