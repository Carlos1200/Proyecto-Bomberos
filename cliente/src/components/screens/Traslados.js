import React, { useContext,useEffect,useState } from 'react'
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Select from 'react-select'
import { Menu } from './../Menu';
import {Background} from '../Background';
import { AuthContext } from '../../context/Auth/AuthContext';
import Api from '../../Api/Api';
import { EmpleadosSeleccion } from '../EmpleadosSeleccion';



export const Traslados = () => {
  const {NombreUsuario,UbicacionUsuario,tipoUsuario}=useContext(AuthContext);
  const [buscador, setBuscador] = useState('');
  const [cargando, setCargando] = useState(true);
  const [empleados, setEmpleados] = useState([]);
  const [empleadosSeleccionados, setEmpleadosSeleccionados] = useState([]);
  console.log(empleadosSeleccionados);

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

  useEffect(()=>{
    obtenerEmpleados();
  },[])

    return (
      <Menu>
        <Background titulo="Traslados">
          <ReportsBox>
            
            <Title>Selección de Empleados a Trasladar</Title>
            <div style={{display:'flex',justifyContent:'center'}}>
              <Jefe>
              <JefeEstacion>Jefe de Estación:</JefeEstacion>
              <JefeNombre>{NombreUsuario}</JefeNombre>
              </Jefe>
            </div>
            {!cargando?(
              <Contenedor>
              <div>
                <FilterBox>
                  <p style={{margin:0, fontSize:'1.2rem',fontWeight:'bold'}}>Buscador</p>
              <FilterTextBox>

                <Select
                  options={empleados}
                  getOptionLabel={(empleado)=>empleado.nombres}
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
              <div style={{backgroundColor:"red"}}>
                {empleadosSeleccionados.map(empleado=>(
                  <EmpleadosSeleccion key={empleado.idEmpleado} empleado={empleado}/>
                ))}
                </div>
              </div>
            </Contenedor>
            ):null}
          </ReportsBox>
        </Background>
      </Menu>
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
    text-align: center;
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

const Title=styled.h2`
  text-align: center;
  margin-bottom: .5rem;
`;

const Jefe=styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const JefeEstacion=styled.p`
  margin-right: .5rem;
  font-size: 1.2rem;
`

const JefeNombre=styled.p`
  font-size: 1.2rem;
  color: #666666;
  font-weight: bold;
`
const Contenedor=styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`