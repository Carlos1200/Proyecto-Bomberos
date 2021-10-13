import React from 'react'
import styled from 'styled-components'
import Select from 'react-select'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose,faSave,} from '@fortawesome/free-solid-svg-icons';
import {useForm} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import { Modal } from '../Modal'
import { UseDatos } from '../../hooks/UseDatos';

const schema=yup.object({
  usuario:yup.string().required("El usuario no debe ir vacío"),
  ubicacion:yup.string().required("La ubicación no debe ir vacía"),
  tipo:yup.string().required("El tipo de usuario no debe ir vacío"),
});

export const UsuarioModal = ({handleClose,usuario}) => {

    const {datos,cargando} = UseDatos('ubicacion');
    const {NombreUsuario,tipoUsuario,UbicacionUsuario}=usuario;

    const { register, handleSubmit,formState: { errors } } = useForm({
      resolver:yupResolver(schema),
      defaultValues:{
        usuario:NombreUsuario
      }
    });

    const Submit=()=>{

    }

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
            <Titulo>Editar Usuario</Titulo>
          </Header>
        {!cargando&&(
            <>
                <Label>Nombre Usuario</Label>
                <Textbox  {...register("usuario")} />
                {errors.usuario&& <TextError>{errors.usuario.message}</TextError>}
                <Label>Ubicacion</Label>
                <Select 
                    options={datos}
                    getOptionLabel={(ubicacion)=>ubicacion.nombreUbicacion}
                    getOptionValue={(ubicacion)=>ubicacion.nombreUbicacion}
                    placeholder="Selecciona una Ubicación"
                    defaultValue={()=>datos.filter((ubicacion)=>ubicacion.nombreUbicacion===UbicacionUsuario)}
                />
                <Label>Tipo de usuario</Label>
                <Select 
                    options={[{value:"Administrador",label:"Administrador"},{value:"Jefe",label:"Jefe"}]}
                    placeholder="Selecciona una Ubicación"
                    defaultValue={{value:tipoUsuario,label:tipoUsuario}}
                />
                <ContenedorBotones>
                  <ContenedorBoton onClick={handleSubmit(Submit)}>
                    <FontAwesomeIcon icon={faSave} style={{fontSize:'2rem', color:'#343f56', marginRight:'1rem'}}/>
                    <Label>Guardar Cambios</Label>
                  </ContenedorBoton>
                  <ContenedorBoton onClick={handleClose}>
                    <FontAwesomeIcon icon={faWindowClose} style={{fontSize:'2rem', color:'red',marginRight:'1rem'}} />
                    <Label>Cancelar</Label>
                  </ContenedorBoton>
                </ContenedorBotones>
            </>
        )}
          
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