import {useEffect, useState} from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose,faDoorOpen} from '@fortawesome/free-solid-svg-icons';
import { Modal } from '../Modal'
import { detallesEmpleados } from '../../services/empleadosServices';

export const VerDetallesEmpleadosModal = ({handleClose,empleado,notificacionError}) => {

  const [empleadoDetalle, setEmpleadoDetalle] = useState();
  const [cargando, setCargando] = useState(true);

  useEffect(()=>{
    const formData=new FormData();
      formData.append('idEmpleado',empleado.idEmpleado);
    detallesEmpleados(formData).then((res)=>{
      setEmpleadoDetalle(res);
    }).catch(error=>{
      notificacionError("Ocurrió un error")
    }).finally(()=>{
      setCargando(false);
    })
    // eslint-disable-next-line
  },[]); 
    return (
      <Modal handleClose={handleClose}>
        <Contenedor>
          <div style={{width:'100%',display:'flex',justifyContent:'flex-end',margin:"-1.3rem 0"}}>
          <FontAwesomeIcon
              icon={faWindowClose}
              style={{
                color: "red",
                fontSize: "2.5rem",
                cursor: "pointer"
              }}
              onClick={handleClose}
            />
          </div>
          <Header>
            <Titulo>Detalles de Empleado</Titulo>
          </Header>
          {!cargando?(
            <div style={{marginLeft:'2rem',marginRight:'2rem'}}>
              <ContValor>
                <Label>Nombre Empleado:</Label>
                <Valor>{`${empleadoDetalle.nombres} ${empleadoDetalle.apellidos}`}</Valor>
              </ContValor>
              <ContValor>
                <Label>Plaza:</Label>
                <Valor>{empleadoDetalle.nombrePlaza}</Valor>
              </ContValor>
              <ContValor>
                <Label>Ubicación:</Label>
                <Valor>{empleadoDetalle.nombreUbicacion}</Valor>
              </ContValor>
              <ContValor>
                <Label>Grupo:</Label>
                <Valor>{empleadoDetalle.nombreGrupo}</Valor>
              </ContValor>
              <ContValor>
                <Label>Pensión:</Label>
                <Valor>{empleadoDetalle.nombrePension}</Valor>
              </ContValor>
              <ContValor>
                <Label>Salario:</Label>
                <Valor>{Number(empleadoDetalle.salarioNominal).toFixed(2)}</Valor>
              </ContValor>
              <ContValor>
                <Label>Fecha de Creación:</Label>
                <Valor>{empleadoDetalle.fechaCreacionEmpleado}</Valor>
              </ContValor>
                <ContenedorBotones>
                  <ContenedorBoton onClick={handleClose}>
                    <FontAwesomeIcon icon={faDoorOpen} style={{fontSize:'2rem', color:'red',marginRight:'1rem'}} />
                    <Label>Cerrar</Label>
                  </ContenedorBoton>
                </ContenedorBotones>
            </div>
          ):null}
                
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