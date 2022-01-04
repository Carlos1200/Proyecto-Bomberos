import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose,faSave,} from '@fortawesome/free-solid-svg-icons';
import {useForm} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import {useSetRecoilState} from 'recoil'
import * as yup from 'yup'
import { Modal } from '../Modal'
import { actualizarUbicacion, nuevaUbicacion } from '../../services/ubicacionesServices';
import { ubicacionesState } from '../tablas/TablaUbicacion';

const schema=yup.object({
  ubicacionNombre:yup.string().required("La ubicación no debe ir vacía"),
});

export const UbicacionModal = ({handleClose,ubicacion,mostrarNotificacion}) => {

    const setUbicacionesState=useSetRecoilState(ubicacionesState);

    const { register, handleSubmit,formState: { errors } } = useForm({
      resolver:yupResolver(schema),
      defaultValues:{
        ubicacionNombre:ubicacion?ubicacion.nombreUbicacion:'',
      }
    });
    const SubmitEditar=async({ubicacionNombre})=>{
      const formData=new FormData();
      formData.append('idUbicacion',ubicacion.idUbicacion);
      formData.append('nombreUbicacion',ubicacionNombre);

      actualizarUbicacion(formData)
      .then(()=>{
        setUbicacionesState(oldValue=>{
          const newValue=oldValue.map(item=>{
            if(item.idUbicacion===ubicacion.idUbicacion){
              item.nombreUbicacion=ubicacionNombre;
            }
            return item;
          })
          return newValue;
        })
        handleClose();
        mostrarNotificacion();
      })
      .catch(err=>{
        console.log({err});
        if(!err.response){
          mostrarNotificacion(true,"Error en el servidor")
        }else{
          mostrarNotificacion(true,err.response.data[0]);
        }
      })
    }

    const SubmitNuevo=async({ubicacionNombre})=>{
      
      const formData=new FormData();
      formData.append('nombreUbicacion',ubicacionNombre);

      nuevaUbicacion(formData).then((res)=>{
        setUbicacionesState((oldValue)=> oldValue.concat(res[0]));
        handleClose();
        mostrarNotificacion()
      }).catch(err=>{
        if(!err.response){
          mostrarNotificacion(true,"Error en el servidor")
        }else{
          mostrarNotificacion(true,err.response.data[0]);
        }
      })
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
            <Titulo>{ubicacion?'Editar Ubicación':'Nueva ubicacion'}</Titulo>
          </Header>
                <Label>Nombre Ubicación</Label>
                <Textbox  {...register("ubicacionNombre")} />
                {errors.ubicacionNombre&& <TextError>{errors.ubicacionNombre.message}</TextError>} 
                <ContenedorBotones>
                  <ContenedorBoton onClick={handleSubmit(ubicacion?SubmitEditar:SubmitNuevo)}>
                    <FontAwesomeIcon icon={faSave} style={{fontSize:'2rem', color:'#343f56', marginRight:'1rem'}}/>
                    <Label>Guardar Cambios</Label>
                  </ContenedorBoton>
                  <ContenedorBoton onClick={handleClose}>
                    <FontAwesomeIcon icon={faWindowClose} style={{fontSize:'2rem', color:'red',marginRight:'1rem'}} />
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
