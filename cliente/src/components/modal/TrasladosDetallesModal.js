import React, {useEffect, useState, useRef} from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose,faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "../Modal";
import { EmpleadosSeleccion } from "../EmpleadosSeleccion";
import Api from "../../Api/Api";

export const TrasladosDetallesModal = ({handleClose, traslado, notifiacionError}) =>{

    const [trasladoDetalle, setTrasladoDetalle] = useState();
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        obtenerDetalles();
    }, [])

    const obtenerDetalles = async() => {
        try {
            const formData = new FormData();
            formData.append('idReporteHistorial',traslado.idReporteHistorial);
            const {data} = await Api.post('/traslados/TrasladosDetalle.php',formData);
            setTrasladoDetalle(data[0]);
            setCargando(false);
        } catch (error) {
            notifiacionError("Ocurrio un error");
        }
    }

    return(
        <Modal handleClose={handleClose}>
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