import React,{useState} from 'react'
import styled from 'styled-components'
import Select from 'react-select'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose,faSave,} from '@fortawesome/free-solid-svg-icons';
import {useForm, Controller} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import { Modal } from '../Modal'
import { UseDatos } from '../../hooks/UseDatos';
import Api from '../../Api/Api';



export const UsuarioModal = ({handleClose,usuario,consultarUsuarios}) => {

    const {datos,cargando} = UseDatos('ubicacion');
    const [checked, setChecked] = useState(!usuario?true:false);
    const schema=yup.object({
      nombre:yup.string().required("El usuario no debe ir vacío"),
      password:checked?yup.string().min(6,"Ingrese como mínimo 6 carácteres").required("La contraseña es obligatoria"):null,
      ubicacion:yup.object({
        idUbicacion:yup.string().required("La ubicación no debe ir vacía"),
        nombreUbicacion:yup.string().required("La ubicación no debe ir vacía"),
      }),
      tipo:yup.object({
        value:yup.string().required("El tipo de usuario no debe ir vacío"),
        label:yup.string().required("El tipo de usuario no debe ir vacío")
      }),
    });

    const { register, handleSubmit,formState: { errors },control } = useForm({
      resolver:yupResolver(schema),
      defaultValues:{
        nombre:usuario?usuario.NombreUsuario:'',
        password:''
      }
    });
    const SubmitEdit=async({nombre,ubicacion,tipo})=>{
      try {
        const formData=new FormData();
        formData.append('idUsuario',usuario.idUsuario);
        formData.append('NombreUsuario',nombre);
        formData.append('tipoUsuario',tipo.value);
        formData.append('UbicacionUsuario',ubicacion.nombreUbicacion);

        await Api.post("/usuariosEdit",formData);
        consultarUsuarios(true);
        handleClose();

      } catch (error) {
        console.log({error});
      }
    }
    const SubmitNuevo=async({nombre,ubicacion,tipo,password})=>{
      try {
        const formData=new FormData();
        formData.append('NombreUsuario',nombre);
        formData.append('tipoUsuario',tipo.value);
        formData.append('UbicacionUsuario',ubicacion.nombreUbicacion);
        formData.append('contra',password);

        await Api.post("/usuarios",formData);
        consultarUsuarios(true);
        handleClose();

      } catch (error) {
        console.log({error});
      }
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
            <Titulo>{usuario?"Editar Usuario":"Nuevo Usuario"}</Titulo>
          </Header>
        {!cargando&&(
            <>
                <Label>Nombre Usuario</Label>
                <Textbox  {...register("nombre")} />
                {errors.nombre&& <TextError>{errors.nombre.message}</TextError>}
                <ContenedorContra>
                <Label>Contraseña</Label> 
                {usuario&&<Check type="checkbox" onChange={()=>setChecked(!checked)}/>}
                </ContenedorContra>
                <Textbox {...register("password")} type="password" disabled={!checked} />
                {errors.password&& <TextError>{errors.password.message}</TextError>}
                <Label>Ubicacion</Label>
                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) =>(
                      <Select 
                      options={datos}
                      getOptionLabel={(ubicacion)=>ubicacion.nombreUbicacion}
                      getOptionValue={(ubicacion)=>ubicacion.nombreUbicacion}
                      value={value}
                      placeholder="Selecciona una Ubicación"
                      onChange={onChange}
                    />
                    )
                  }
                  name="ubicacion"
                  defaultValue={usuario&&(()=>datos.find((ubicacion)=>ubicacion.nombreUbicacion===usuario.UbicacionUsuario))}
                />
                {errors.ubicacion&& <TextError>{errors.ubicacion.nombreUbicacion.message}</TextError>}
                <Label>Tipo de usuario</Label>

                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select 
                      options={[{value:"Administrador",label:"Administrador"},{value:"Jefe",label:"Jefe"}]}
                      placeholder="Selecciona un Tipo de usuario"
                      value={value}
                      onChange={onChange}
                    />
                  )}
                  name="tipo"
                  defaultValue={usuario&&{value:usuario.tipoUsuario,label:usuario.tipoUsuario}}
                />
                {errors.tipo&& <TextError>{errors.tipo.value.message}</TextError>}
                
                <ContenedorBotones>
                  <ContenedorBoton onClick={handleSubmit(usuario?SubmitEdit:SubmitNuevo)}>
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
    margin-top: 10px;
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

const Check=styled.input`
  margin-left: 1rem;
  transform: scale(2);
  -ms-transform: scale(2);
  -webkit-transform: scale(2);
  padding: 10px;
  margin-top: 10px;
`

const ContenedorContra=styled.div`
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
const TextError=styled.p`
  margin-top: -13px;
  text-align: center;
  color: #f39c12;
  margin-top: 0.5rem;
  margin-bottom: 0;
`;