import React, {useEffect, useState, useRef} from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "../Modal";
import { obtenerDetallesReportes } from "../../services/reportesServices";
import { RepEmpSeleccion } from "../RepEmpSeleccion";
import { useAutorizacion } from "../../hooks/useAutorizacion";

export const ReportesDetallesModal = ({handleClose, reporte, mostrarNotificacion}) =>{

    const [reportesDetalle, setReportesDetalle] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [errores, setErrores] = useState([true]);
    const ReportEmplFormulario = useRef();
    const {guardarReporte} = useAutorizacion();
    useEffect(() => {
        obtenerDetalles();
        // eslint-disable-next-line
    }, [])

    const obtenerDetalles = async() => {
            obtenerDetallesReportes(reporte.idReporte).then(res => {
                setReportesDetalle(res);
                ReportEmplFormulario.current = {idReporte: reporte.idReporte, empleados: res};
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
                    <Titulo>Reporte de {reporte.creadorJefe}</Titulo>
                </Header>
                {!cargando ? (
                <>
                <ContenedorEmpleados>
                    {reportesDetalle.map((empleado,index) => (
                    <RepEmpSeleccion
                        key={empleado.idEmpleado}
                        ReportEmplFormulario={ReportEmplFormulario}
                        posicion={index}
                        setErrores={setErrores}
                        erroresArray={errores}
                    />
                    ))}
                </ContenedorEmpleados>
                <Btn
                    type='button'
                    disabled={errores.includes(true)}
                    onClick={() => {
                        guardarReporte(ReportEmplFormulario.current.empleados,ReportEmplFormulario.current.idReporte);
                    }}>
                    <Text>Guardar Reporte</Text>
                    <FontAwesomeIcon
                        icon={faSave}
                        style={{ fontSize: "23px", color: "#fff" }}
                    />
                </Btn>
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

const Btn = styled.button`
  display: flex;
  margin: 0 auto;
  justify-content: space-around;
  align-items: center;
  background-color: #04b99c;
  opacity: ${props => (props.disabled ? 0.5 : 1)};
  border-radius: 1rem;
  margin-top: 1rem;
  padding: 0 1rem;
  border: 0;
  transition: background-color 0.3s ease-in-out;
  &:hover {
    background-color: #028671;
  }
`;

const Text = styled.p`
  color: #fff;
  font-size: 1.5rem;
  margin-right: 0.7rem;
`;
