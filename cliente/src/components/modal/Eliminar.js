import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose,faExclamationTriangle,faCheckCircle,faTimes} from '@fortawesome/free-solid-svg-icons';
import { Modal } from '../Modal'

export const Eliminar = ({handleClose,eliminar}) => {

    

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
            <Titulo>¿Está seguro que lo quiere eliminar?</Titulo>
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
                <ContenedorBoton onClick={eliminar}>
                    <FontAwesomeIcon icon={faCheckCircle} style={{fontSize:'2rem', color:'lightgreen', marginRight:'1rem'}}/>
                    <Label>Si, Eliminalo</Label>
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

const Textbox = styled.input`
  background-color: #ffffff;
  border: 1px solid rgba(0,0,0,0.2);
  height: 32px;
  padding-left: 20px;
  font-size: 5mm;
  margin: 0;
  width: 100%;
  border-radius: 0.2rem;
`;

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
const TextError=styled.p`
  margin-top: -13px;
  text-align: center;
  color: #f39c12;

`;
