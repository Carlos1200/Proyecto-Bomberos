import { useEffect, useState} from 'react'
import styled from 'styled-components'
import Select from 'react-select'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose,faSave,} from '@fortawesome/free-solid-svg-icons';
import {useForm, Controller} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import { useSetRecoilState } from 'recoil';
import { Modal } from '../Modal'
import { actualizarUsuarios, nuevoUsuario } from '../../services/usuariosServices';
import { getUbicaciones } from '../../services/ubicacionesServices';
import { usuariosState } from '../../atom/AtomTablas';



export const UsuarioModal = ({handleClose,usuario,mostrarNotificacion}) => {

  const setUsuario=useSetRecoilState(usuariosState);
    const [ubicaciones, setubicaciones] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [checked, setChecked] = useState(!usuario?true:false);

    useEffect(()=>{
      getUbicaciones().then(res=>{
        setubicaciones(res);
      }).catch(err=>{
        mostrarNotificacion(true,"Error en el servidor");
      }).finally(()=>{
        setCargando(false);
      });
      // eslint-disable-next-line
    },[]);

    const schema=yup.object({
      nombre:yup.string().required("El usuario no debe ir vacío"),
      nick:yup.string().matches(RegExp('^(?=[a-zA-Z0-9._]{6,20}$)(?!.*[_.]{2})[^_.].*[^_.]$'),{message:"Nombre de usuarios con formato incorrecto"}).required("El usuario no debe ir vacío"),
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
        nick:usuario?usuario.nickUsuario:'',
        password:''
      }
    });
    const SubmitEdit=async({nombre,ubicacion,nick,tipo})=>{
      
      const formData=new FormData();
      formData.append('idUsuario',usuario.idUsuario);
      formData.append('NombreUsuario',nombre);
      formData.append('tipoUsuario',tipo.value);
      formData.append('nickUsuario',nick);
      formData.append('UbicacionUsuario',ubicacion.nombreUbicacion);
      actualizarUsuarios(formData).then((res)=>{
        setUsuario((oldValue)=>{
          return oldValue.map(item=>{
            if(item.idUsuario===res.idUsuario){
              return res;
            }else{
              return item;
            }
          });
        })
        handleClose();
        mostrarNotificacion();
      }).catch((error)=>{
        console.log({error});
        if(!error.response){
          mostrarNotificacion(true,"Error en el servidor")
        }else{
          mostrarNotificacion(true,error.response.data[0]);
        }
      });
    }
    const SubmitNuevo=async({nombre,ubicacion,tipo,nick,password})=>{
      
      const formData=new FormData();
      formData.append('NombreUsuario',nombre);
      formData.append('tipoUsuario',tipo.value);
      formData.append('nickUsuario',nick);
      formData.append('UbicacionUsuario',ubicacion.nombreUbicacion);
      formData.append('contra',password);

      nuevoUsuario(formData).then((res)=>{
        setUsuario((oldvalue)=>oldvalue.concat(res[0]));
        handleClose();
        mostrarNotificacion();
      }).catch((error)=>{
        if(!error.response){
          mostrarNotificacion(true,"Error en el servidor")
        }else{
          mostrarNotificacion(true,error.response.data[0]);
        }
      })
    }

    return (
      <Modal handleClose={handleClose}>
        <Contenedor>
          <div style={{width:'100%',display:'flex',justifyContent:'flex-end',margin:"-2rem 0"}}>
          <FontAwesomeIcon
              icon={faWindowClose}
              style={{
                color: "red",
                fontSize: "2.5rem",
                cursor: "pointer",
                marginTop:'2rem'
              }}
              onClick={handleClose}
            />
          </div>
          <Header>
            <Titulo>{usuario?"Editar Usuario":"Nuevo Usuario"}</Titulo>
          </Header>
        {!cargando&&(
            <ContenedorForm>
                <Label>Nombre Jefe</Label>
                <Textbox  {...register("nombre")} />
                {errors.nombre&& <TextError>{errors.nombre.message}</TextError>}
                <Label>Nombre Usuario</Label>
                <Textbox  {...register("nick")} />
                {errors.nick&& <TextError>{errors.nick.message}</TextError>}
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
                      options={ubicaciones}
                      getOptionLabel={(ubicacion)=>ubicacion.nombreUbicacion}
                      getOptionValue={(ubicacion)=>ubicacion.nombreUbicacion}
                      value={value}
                      placeholder="Selecciona una Ubicación"
                      onChange={onChange}
                      menuPlacement="top"
                    />
                    )
                  }
                  name="ubicacion"
                  defaultValue={usuario&&(()=>ubicaciones.find((ubicacion)=>ubicacion.nombreUbicacion===usuario.UbicacionUsuario))}
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
                      menuPlacement="top"
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
            </ContenedorForm>
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

const ContenedorForm=styled.div`
overflow-y: auto;
max-height: 78vh;
  &::-webkit-scrollbar {
    width: 12px;
}

  &::-webkit-scrollbar-track {
  background: #A0A0A0;        /* color of the tracking area */
  border-radius: 2rem;
}

  &::-webkit-scrollbar-thumb {
  background-color: #343F56;    /* color of the scroll thumb */
  border-radius: 20px;       /* roundness of the scroll thumb */
  border: 3px solid #A0A0A0;  /* creates padding around scroll thumb */
}
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