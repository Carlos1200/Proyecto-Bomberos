import React, {useEffect, useState, useRef} from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "../Modal";
import { TrasEmpSeleccion } from "../TrasEmpSeleccion";
import { detallesTraslados } from "../../services/trasladosServices";

export const TrasladosDetallesModal = ({handleClose, traslado, mostrarNotificacion}) =>{

    const [trasladoDetalle, setTrasladoDetalle] = useState([]);
    const [cargando, setCargando] = useState(true);

    const traslEmplFormulario = useRef();

    useEffect(() => {
        obtenerDetalles();
        // eslint-disable-next-line
    }, [])

    const obtenerDetalles = async() => {
            const formData = new FormData();
            formData.append('idReporteHistorial',traslado.idReporteHistorial);
            
            detallesTraslados(formData).then(res => {
                setTrasladoDetalle(res);
                traslEmplFormulario.current = res;

            }).catch(err => {
                console.log({err});
                mostrarNotificacion("Ocurrio un error");
            }).finally(() => {
                setCargando(false);
            })
    }

    return(
        <Modal handleClose={handleClose} grande>
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
                        traslEmplFormulario={traslEmplFormulario}
                        posicion={index}
                    />
                    ))}
                </ContenedorEmpleados>
                </>
                ) : null}
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
const Header=styled.div`
    
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