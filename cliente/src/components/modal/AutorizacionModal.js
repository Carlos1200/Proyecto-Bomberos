import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose,faExclamationTriangle,faCheckCircle,faTimes} from '@fortawesome/free-solid-svg-icons';
import { Modal } from '../Modal'

export const AutorizacionModal = ({handleClose,enviarDatos}) => {

    

    return (
      <Modal handleClose={handleClose}>
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
          <Header>
            <Titulo>¿Está seguro de generar el siguiente reporte?</Titulo>
            <Informacion>Enviar el siguiente reporte significa que usted está autorizando con su usuario la creacion de un reporte con la información de las horas extras trabajadas por cada uno de los empleados detallados en la pantalla anterior.</Informacion>
            <Informacion>Dichos minutos digitados serán revisados y autorizados por un superior, el documento generado podrá ser nuevamente visualizado en la pantalla de "Administración de Reportes"</Informacion>
          </Header>
          <ContenedorWarning>
            <FontAwesomeIcon
              icon={faExclamationTriangle}
              style={{
                color: "orange",
                fontSize: "6rem",
              }}
            />
          </ContenedorWarning>

          <ContenedorBotones>
                <ContenedorBoton onClick={enviarDatos}>
                    <FontAwesomeIcon icon={faCheckCircle} style={{fontSize:'2rem', color:'lightgreen', marginRight:'1rem'}}/>
                    <Label>Autorizar</Label>
                </ContenedorBoton>
                <ContenedorBoton onClick={handleClose}>
                    <FontAwesomeIcon icon={faTimes} style={{fontSize:'2rem', color:'red', marginRight:'1rem'}}/>
                    <Label>Cancelar</Label>
                </ContenedorBoton>
          </ContenedorBotones>
        </Contenedor>
      </Modal>
    );
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

const ContenedorWarning=styled.div`
    display: flex;
    justify-content: center;
    margin-top: 2rem;
`

const Label=styled.p`
    font-size: 1.5rem;
    margin-bottom: 1rem;
`

const Informacion=styled.p`
    text-align: justify;
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

