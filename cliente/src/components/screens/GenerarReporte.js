import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Select from "react-select";
import toast, { Toaster } from 'react-hot-toast';
import { ListadoEmpleados } from "../ListadoEmpleados";
import { AuthContext } from "../../context/Auth/AuthContext";
import { AnimatePresence } from "framer-motion";
import { Background } from "../Background";
import { Menu } from "../Menu";
import {ReportesModal} from '../modal/ReportesModal'
import { getEmpleados, ObtenerEmpleadosFiltrados } from "../../services/empleadosServices";

export const GenerarReporte = () => {
  const { NombreUsuario, UbicacionUsuario, tipoUsuario } =
    useContext(AuthContext);
  const [cargando, setCargando] = useState(true);
  const [empleados, setEmpleados] = useState([]);
  const [empleadosSeleccionados, setEmpleadosSeleccionados] = useState([]);
  const [visible, setVisible] = useState(false);
  const [disable, setDisable] = useState(false);

 

  const obtenerEmpleados = async () => {
    try {
      if (tipoUsuario !== "Administrador") {
        const formData = new FormData();
        formData.append("nombreUbicacion", UbicacionUsuario);
        ObtenerEmpleadosFiltrados(formData).then((res) => {
          setEmpleados(res);
        });
      } else {
        getEmpleados().then((data) => {
          setEmpleados(data);
        });
      }

      setCargando(false);
    } catch (error) {
      console.log(error);
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerEmpleados();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if(empleados.length===0){
      setDisable(true);
    }else{
      setDisable(false);
    }
  }, [empleados]);

  const eliminarEmpleado = (id) => {
    const empleadoEliminado = empleadosSeleccionados.find(
      (empleado) => empleado.idEmpleado === id
    );
    setEmpleados([...empleados, empleadoEliminado]);
    const seleccionar = empleadosSeleccionados.filter(
      (empleado) => empleado.idEmpleado !== id
    );

    setEmpleadosSeleccionados(seleccionar);
  };

  const limpiarEmpleados=()=>{

    setEmpleados([...empleados,...empleadosSeleccionados]);

    setEmpleadosSeleccionados([]);
    
  }

  const seleccionarTodos = () => {
    setEmpleadosSeleccionados([...empleadosSeleccionados,...empleados]);
    setEmpleados([]);
    setDisable(true);
  };

  const mostrarNotificacion=(error=false)=>{
    if(error){
      toast.error("Ocurrió un error");
    }else{
      toast.success('Operación realizada correctamente');
    }
  }

  return (
    <>
      <Menu>
        <Background titulo='Generar Reporte'>
          <Toaster position="top-right"/>
          <ReportsBox>
            <TextBoxTitle>
              Reporte de Planilla para Tiempo Extraordinario
            </TextBoxTitle>
            <TextBoxSubtitle>
              <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                <Jefe>Jefe de Estación:</Jefe>
                <JefeNombre>{NombreUsuario}</JefeNombre>
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}></div>
              {!cargando ? (
                <div>
                  <div>
                    <FilterBox>
                      <FilterTextBox>
                        <Select
                          options={empleados}
                          noOptionsMessage={() => "No hay empleados"}
                          getOptionLabel={(empleado) =>
                            `${empleado.nombres} ${empleado.apellidos}`
                          }
                          getOptionValue={(empleado) => empleado.idEmpleado}
                          placeholder='Selecciona un empleado'
                          onChange={(value) => {
                            setEmpleadosSeleccionados([
                              ...empleadosSeleccionados,
                              value,
                            ]);
                            const nuevoArreglo = empleados.filter(
                              (empleado) =>
                                empleado.idEmpleado !== value.idEmpleado
                            );
                            setEmpleados(nuevoArreglo);
                          }}
                          menuPlacement='bottom'
                        />
                      </FilterTextBox>
                      <BotonSearch disabled={disable} onClick={seleccionarTodos}>Seleccionar Todos</BotonSearch>
                    </FilterBox>
                    <ContenedorEnvio>
                      <ListadoEmpleados
                        Empleados={empleadosSeleccionados}
                        eliminaListado={eliminarEmpleado}
                      />
                    </ContenedorEnvio>
                    <Boton
                      onClick={() => setVisible(true)}
                      disabled={
                        empleadosSeleccionados.length > 0 ? false : true
                      }>
                      Agregar
                    </Boton>
                  </div>
                </div>
              ) : null}
            </TextBoxSubtitle>
          </ReportsBox>
        </Background>
      </Menu>
      <AnimatePresence
            initial={false}
            exitBeforeEnter={true}
            onExitComplete={() => null}>
            {visible&&<ReportesModal handleClose={()=>setVisible(false)} empleados={empleadosSeleccionados} limpiarEmpleados={limpiarEmpleados} mostrarNotificacion={mostrarNotificacion}/>}
      </AnimatePresence>
    </>
  );
};

const ReportsBox = styled.div`
  background-color: #ffffff;
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
`;

const TextBoxTitle = styled.div`
  flex: 1;
  padding-top: 10px;
  padding-bottom: 5px;
  margin-left: 50px;
  margin-right: 50px;
  text-align: center;
  font-size: 24px;
  border-bottom: 1px solid #000;
`;

const TextBoxSubtitle = styled.div`
  flex: 1;
  padding-top: 10px;
  padding-bottom: 5px;
  margin-left: 50px;
  margin-right: 50px;
  text-align: center;
`;

const Jefe = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
`;
const JefeNombre = styled.p`
  font-size: 1.2rem;
  color: #666666;
  font-weight: bold;
  margin-left: 1rem;
`;

const FilterBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FilterTextBox = styled.div`
  flex: 1;
  padding-top: 10px;
  padding-bottom: 5px;
  margin: 0 0.5rem;
  text-align: center;
  font-size: 18px;
`;

const ContenedorEnvio = styled.div`
  overflow-y: auto;
  height: 35vh;
  margin-top: 1rem;

  &::-webkit-scrollbar {
    width: 12px; /* width of the entire scrollbar */
  }

  &::-webkit-scrollbar-track {
    background: #e2e2e2; /* color of the tracking area */
    border-radius: 2rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #343f56; /* color of the scroll thumb */
    border-radius: 20px; /* roundness of the scroll thumb */
    border: 3px solid #e2e2e2; /* creates padding around scroll thumb */
  }
`;

const Boton = styled.button`
  padding: 1rem 3rem;
  border-radius: 2rem;
  margin-top: 0.5rem;
  font-size: 1.2rem;
  font-weight: bold;
  border: 0;
  background-color: #ffe459;
  opacity: ${props => (props.disabled ? 0.5 : 1)};
  transition: background-color 0.3s ease-in-out;
  &:hover {
    background-color: #e8c410;
  }
`;

const BotonSearch = styled.button`
  padding: 1rem 3rem;
  border-radius: 2rem;
  margin-top: 0.5rem;
  font-size: 1.2rem;
  font-weight: bold;
  border: 0;
  background-color: #343f56;
  opacity: ${props => (props.disabled ? 0.5 : 1)};
  color: white;
  transition: background-color 0.3s ease-in-out;
  &:hover {
    background-color: #151c2b;
  }
`;
