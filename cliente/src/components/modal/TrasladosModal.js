import React, { useEffect,useState,useRef } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose,faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "../Modal";
import { EmpleadosSeleccion } from "../EmpleadosSeleccion";
import { UseDatos } from "../../hooks/UseDatos";
import { UseTraslados } from "../../hooks/UseTraslados";

export const TrasladosModal = ({ handleClose, empleados,mostrarNotificacion,limpiarEmpleados }) => {
  const [datosUbicacion, cargandoUbicacion] = UseDatos("ubicaciones/ObtenerUbicaciones.php");
  const [datosPlaza, cargandoPlaza] = UseDatos("plazas/ObtenerPlazas.php");
  const [datosGrupo, cargandoGrupo] = UseDatos("grupos/ObtenerGrupos.php");
  
  const [cargando, setCargando] = useState(true);
  const empleadosFormulario = useRef([]);
  const [cantidad, setCantidad] = useState(0);

  const {PrepararDatos}=UseTraslados();

  useEffect(()=>{
    setCantidad(empleados.length-1);
  },[empleados])
  
  useEffect(() => {
    if (!cargandoUbicacion && !cargandoPlaza&&!cargandoGrupo) {
      setCargando(false);
    }
  }, [cargandoUbicacion, cargandoPlaza,cargandoGrupo]);
  return (
    <Modal handleClose={handleClose} grande={true}>
      <Contenedor>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            margin: "-1.3rem 0",
          }}>
          <FontAwesomeIcon
            icon={faWindowClose}
            style={{
              color: "red",
              fontSize: "2.5rem",
              cursor: "pointer",
            }}
            onClick={handleClose}
          />
        </div>
        <Titulo>Traslado de Empleados</Titulo>
        {!cargando ? (
            <>
          <ContenedorEmpleados>
            {empleados.map((empleado,index) => (
              <EmpleadosSeleccion
                key={empleado.idEmpleado}
                posicion={index}
                empleado={empleado}
                ubicaciones={datosUbicacion}
                plazas={datosPlaza}
                grupos={datosGrupo}
                empleadosFormulario={empleadosFormulario}
                ultimo={cantidad}
              />
            ))}
          </ContenedorEmpleados>
          <Btn type="button" onClick={()=>{
            PrepararDatos(empleadosFormulario.current)
            limpiarEmpleados();
            handleClose();  
            mostrarNotificacion();
          }}>
          <Text>Agregar</Text>
          <FontAwesomeIcon
            icon={faSignInAlt}
            style={{ fontSize: "23px", color: "#fff" }}
          />
        </Btn>
        </>
        ) : null}
      </Contenedor>
    </Modal>
  );
};
const Contenedor = styled.div`
  width: 100%;
  height: 100%;
`;

const Titulo = styled.h2`
  text-align: center;
  font-weight: bold;
`;

const ContenedorEmpleados = styled.div`
  overflow-y: auto;
  height: 55vh;
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

const Btn=styled.button`
    display: flex;
    margin: 0 auto;
    justify-content: space-around;
    align-items: center;
    background-color: #04B99C;
    border-radius: 1rem;
    margin-top: 1rem;
    padding: 0 1rem;
    border: 0;
    transition: background-color .3s ease-in-out;
    &:hover{
      background-color: #028671;

    }
`

const Text=styled.p`
  color: #fff;
  font-size: 1.5rem;
  margin-right: .7rem;
`