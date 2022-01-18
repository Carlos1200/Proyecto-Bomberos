import React, { useEffect,useState,useRef } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose,faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "../Modal";
import { EmpleadosSeleccion } from "../EmpleadosSeleccion";
import { UseTraslados } from "../../hooks/UseTraslados";
import { getUbicaciones } from "../../services/ubicacionesServices";
import { getPlazas } from "../../services/plazasServices";
import { getGrupos } from "../../services/gruposServices";

export const TrasladosModal = ({ handleClose, empleados,mostrarNotificacion,limpiarEmpleados }) => {
  
  const [tituloDetalle, setTituloDetalle] = useState("");

  const [cargando, setCargando] = useState(true);
  const empleadosFormulario = useRef([]);
  const [cantidad, setCantidad] = useState(0);
  const [error, setError] = useState(false);
  const [infoEmpleado, setInfoEmpleado] = useState({
    ubicaciones:[],
    plazas:[],
    grupos:[]
  });

  const {PrepararDatos}=UseTraslados(mostrarNotificacion,limpiarEmpleados,handleClose);
  

  useEffect(()=>{
    setCantidad(empleados.length-1);
  },[empleados])
  
  useEffect(() => {
    Promise.all([
      getUbicaciones(),
      getPlazas(),
      getGrupos(),
    ])
      .then(([ubicaciones, plazas, grupos]) => {
        setInfoEmpleado({
          ubicaciones,
          plazas,
          grupos,
        });
      })
      .catch((error) => {
        mostrarNotificacion(true);
      })
      .finally(() => {
        setCargando(false);
      });
      // eslint-disable-next-line
  }, []);

  return (
    <Modal handleClose={handleClose} grande={true}>
      <Contenedor>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            margin: "0 0 -3rem 0",
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
        <InputDiv>
          <Input value={tituloDetalle} placeholder="Título para el Traslado" onChange={(e)=>{
            setTituloDetalle(e.target.value);
            setError(false);
          }}/>
        </InputDiv>
        {error && <TextError>El titulo es obligatorio</TextError>}
        
        {!cargando ? (
            <>
          <ContenedorEmpleados>
            {empleados.map((empleado,index) => (
              <EmpleadosSeleccion
                key={empleado.idEmpleado}
                posicion={index}
                empleado={empleado}
                ubicaciones={infoEmpleado.ubicaciones}
                plazas={infoEmpleado.plazas}
                grupos={infoEmpleado.grupos}
                empleadosFormulario={empleadosFormulario}
                ultimo={cantidad}
                titulo={tituloDetalle}
              />
            ))}
          </ContenedorEmpleados>
          <Btn type="button" onClick={()=>{
            if(!tituloDetalle){
              setError(true);
            }else{

              PrepararDatos(empleadosFormulario.current)
            }
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
const InputDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Input = styled.input`
  margin-bottom: 1rem;
  appearance: none;
  border: 1px solid #CCCCCC;
  border-radius: .2rem;
  padding: .5rem 1rem;
  width: 50%;
`

const TextError = styled.p`
  margin-top: -13px;
  text-align: center;
  color: #f39c12;
  margin-bottom: 0;
`;