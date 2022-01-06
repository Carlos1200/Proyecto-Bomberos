import React, {useEffect, useState, useRef} from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose,faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "../Modal";
import { EmpleadosSeleccion } from "../EmpleadosSeleccion";
import Api from "../../Api/Api";
import { TrasEmpSeleccion } from "../TrasEmpSeleccion";

export const TrasladosDetallesModal = ({handleClose, traslado, mostrarNotificacion}) =>{

    const [trasladoDetalle, setTrasladoDetalle] = useState();
    const [cargando, setCargando] = useState(true);
    //Comentario de TrasladdosDetallesModal Funcional

    const traslEmplFormulario = useRef();

    useEffect(() => {
        obtenerDetalles();
    }, [])

    const obtenerDetalles = async() => {
        try {
            const formData = new FormData();
            formData.append('idReporteHistorial',traslado.idHistorialTraslados);
            
            const {data} = await Api.post('traslados/TraslEmpDetalle.php', formData);
            setTrasladoDetalle(data);
            
            traslEmplFormulario.current = data;
            setCargando(false);
        } catch (error) {
            console.log({error})
            mostrarNotificacion("Ocurrio un error");
        }
    }

    return(
        <Modal handleClose={handleClose}>
            <Contenedor>
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "flex-end",
                        margin: "-1.3 rem 0",
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
                <Header>
                    <Titulo>Detalle de Empleados del Traslado</Titulo>
                </Header>
                {!cargando ? (
                <>
                <ContenedorEmpleados>
                    {trasladoDetalle.map((empleado,index) => (
                    <TrasEmpSeleccion
                        key={empleado.idEmpleado}
                        empleado={empleado}
                        traslEmplFormulario={traslEmplFormulario}
                        posicion={index}
                    />
                    ))}
                </ContenedorEmpleados>
                <Btn type="button" onClick={()=>{
                    handleClose();
                }}>
                <Label>Agregar</Label>
                <FontAwesomeIcon
                    icon={faSignInAlt}
                    style={{ fontSize: "23px", color: "#fff" }}
                />
                </Btn>
                </>
                ) : null}
            </Contenedor>
            
            <p>Hola Mundo</p>
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
const Header=styled.div`
    
`

const Label=styled.p`
    font-size: 1.5rem;
    margin-bottom: 1rem;
    margin-top: 10px;
`

const Valor=styled.p`
  margin-left: 1rem;
  font-size: 1.1rem;
  font-family:Georgia, 'Times New Roman', Times, serif;
`

const ContValor=styled.div`
  display: flex;
  align-items: center;
`

const ContenedorBotones=styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`
const ContenedorBoton=styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

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
`
;