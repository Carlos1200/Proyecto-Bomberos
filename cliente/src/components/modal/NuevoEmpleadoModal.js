import { useEffect, useState} from 'react'
import styled from 'styled-components'
import Select from 'react-select'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose,faUserPlus,faCheck} from '@fortawesome/free-solid-svg-icons';
import {useForm, Controller} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import { Modal } from '../Modal'
import { ListadoEmpleados } from '../ListadoEmpleados';
import { UseEmpleados } from '../../hooks/UseEmpleados';
import { getUbicaciones } from '../../services/ubicacionesServices';
import { getPlazas } from '../../services/plazasServices';
import { getGrupos } from '../../services/gruposServices';
import { getPensiones } from '../../services/pensionesServices';

const schema=yup.object({
  nombres:yup.string().required("Los nombres son obligatorios"),
  apellidos:yup.string().required("Los apellidos son obligatorios"),
  salario: yup
    .string()
    .matches(RegExp("^[0-9.]+$"), {
      message: "El salario debe ser un número positivo",
    })
    .required("El salario Es obligatorio"),
  ubicacion:yup.object({
    idUbicacion:yup.string().required("La ubicación no debe ir vacía"),
    nombreUbicacion:yup.string().required("La ubicación no debe ir vacía"),
  }),
  plaza:yup.object({
    idPlaza:yup.string().required("La plaza no debe ir vacía"),
    nombrePlaza:yup.string().required("La plaza no debe ir vacía"),
  }),
  pension:yup.object({
    idPension:yup.string().required("La pension no debe ir vacía"),
    nombrePension:yup.string().required("La pension no debe ir vacía"),
  }),
  grupo:yup.object({
    idGrupo:yup.string().required("El Grupo no debe ir vacío"),
    nombreGrupo:yup.string().required("El Grupo no debe ir vacío"),
  }),
  creado:yup.string().default(function () {
    const date=new Date();
    const fecha= date.toISOString().slice(0, 10);
    return fecha;
  }),
})

export const NuevoEmpleadoModal = ({handleClose,mostrarNotificacionNuevo}) => {
    const [cargando, setCargando] = useState(true);
    const [empleados, setEmpleados] = useState([]);
    const [infoEmpleado, setInfoEmpleado] = useState({
      ubicaciones:[],
      plazas:[],
      pensiones:[],
      grupos:[]
    });

    
    const {crearString} = UseEmpleados(mostrarNotificacionNuevo,handleClose);


    useEffect(() => {
      Promise.all([
        getUbicaciones(),
        getPlazas(),
        getGrupos(),
        getPensiones(),
      ])
        .then(([ubicaciones, plazas, grupos, pensiones]) => {
          setInfoEmpleado({
            ubicaciones,
            plazas,
            grupos,
            pensiones,
          });
        })
        .catch(() => {
          mostrarNotificacionNuevo(true);
        })
        .finally(() => {
          setCargando(false);
        });
        // eslint-disable-next-line
    }, []);

    const { register, handleSubmit,formState: { errors },control } = useForm({
      resolver:yupResolver(schema),
    });
    const agregarEmpleado=({nombres,apellidos,ubicacion,salario,plaza,pension,grupo,creado})=>{
      const data={
        id:empleados.length+1,
        nombres,
        apellidos,
        salario,
        ubicacion:ubicacion.idUbicacion,
        plaza:plaza.idPlaza,
        pension:pension.idPension,
        grupo:grupo.idGrupo,
        fechaCreacionEmpleado:creado,
        nombrePlaza:plaza.nombrePlaza
      }

      setEmpleados([
        ...empleados,
        data
      ]);
      
    }
    const removerEmpleado=(id)=>{
      const empleado=empleados.filter(empleado=>empleado.id!==id);
      setEmpleados(empleado);
    }

    const insertarEmpleados=async()=>{
      crearString(empleados);
    }

    return (
      <Modal handleClose={handleClose} grande={true}>
        <Contenedor>
        <Header>
            <Titulo>Nuevos Empleados</Titulo>
            <FontAwesomeIcon
              icon={faWindowClose}
              style={{
                color: "red",
                fontSize: "2.5rem",
                cursor: "pointer",
                
              }}
              onClick={handleClose}
            />
          </Header>
          <ContenedorForms>
          {!cargando&&(
            <>
            <Form>
              <Label>Nombres</Label>
              <Textbox  {...register("nombres")} />
              {errors.nombres&& <TextError>{errors.nombres.message}</TextError>}
              <Label>Apellidos</Label>
              <Textbox  {...register("apellidos")} />
              {errors.apellidos&& <TextError>{errors.apellidos.message}</TextError>}
              <Label>Salario</Label>
              <Textbox  {...register("salario")} />
              {errors.salario&& <TextError>{errors.salario.message}</TextError>}
              <Label>Ubicacion</Label>
                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) =>(
                      <Select 
                      options={infoEmpleado.ubicaciones}
                      getOptionLabel={(ubicacion)=>ubicacion.nombreUbicacion}
                      getOptionValue={(ubicacion)=>ubicacion.idUbicacion}
                      value={value}
                      placeholder="Selecciona una Ubicación"
                      onChange={onChange}
                      menuPlacement="auto"
                    />
                    )
                  }
                  name="ubicacion"
                />
                {errors.ubicacion&& <TextError>{errors.ubicacion.nombreUbicacion.message}</TextError>}
              <Label>Plaza</Label>
                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) =>(
                      <Select 
                      options={infoEmpleado.plazas}
                      getOptionLabel={(plaza)=>plaza.nombrePlaza}
                      getOptionValue={(plaza)=>plaza.idPlaza}
                      value={value}
                      placeholder="Selecciona una Plaza"
                      onChange={onChange}
                      menuPlacement="auto"
                    />
                    )
                  }
                  name="plaza"
                />
                {errors.plaza&& <TextError>{errors.plaza.nombrePlaza.message}</TextError>}
              <Label>Pension</Label>
                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) =>(
                      <Select 
                      options={infoEmpleado.pensiones}
                      getOptionLabel={(pension)=>pension.nombrePension}
                      getOptionValue={(pension)=>pension.idPension}
                      value={value}
                      placeholder="Selecciona una Pensión"
                      onChange={onChange}
                      menuPlacement="top"
                    />
                    )
                  }
                  name="pension"
                />
                {errors.pension&& <TextError>{errors.pension.nombrePension.message}</TextError>}
              <Label>Grupo</Label>
                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) =>(
                      <Select 
                      options={infoEmpleado.grupos}
                      getOptionLabel={(grupo)=>grupo.nombreGrupo}
                      getOptionValue={(grupo)=>grupo.idGrupo}
                      value={value}
                      placeholder="Selecciona un Grupo"
                      onChange={onChange}
                      menuPlacement="top"
                    />
                    )
                  }
                  name="grupo"
                />
                {errors.grupo&& <TextError>{errors.grupo.nombreGrupo.message}</TextError>}
                <ContenedorBoton onClick={handleSubmit(agregarEmpleado)}>
                  <FontAwesomeIcon icon={faUserPlus} style={{fontSize:'2rem', color:'#343f56', marginRight:'1rem'}}/>
                  <Label>Agregar Empleado</Label>
                </ContenedorBoton>
            </Form>

                  <div style={{gridArea:'table'}}>
          <ListadoEmpleados Empleados={empleados} eliminaListado={removerEmpleado}/>
                  </div>

            {empleados.length!==0&&(
              <div style={{gridArea:'btn'}}>
              <ContenedorBoton onClick={insertarEmpleados}>
                    <FontAwesomeIcon icon={faCheck} style={{fontSize:'2rem', color:'#67BB6F', marginRight:'1rem'}}/>
                    <Label>Completado</Label>
              </ContenedorBoton>
            </div>
            )}
          </>
          )}
          </ContenedorForms>
        </Contenedor>
      </Modal>
    );
}

const Contenedor=styled.div`
    /* background-color: red; */
    width: 100%;
    height: 100%;
`

const ContenedorForms=styled.div`
  display: grid;
  grid:
    'form table'
    'form table'
    'form table'
    'form table'
    'form table'
    'form table'
    'form table'
    'form table'
    'form table'
    'form table'
    'form table'
    'form table'
    'form table'
    'form table'
    'form table'
    'form table'
    'form table'
    'form btn';
`

const Titulo=styled.h2`
    font-weight: bold;
    margin: 0 auto;
`
const Header=styled.div`
    width:100%;
    display:flex;
    flex-direction: row;
    /* justify-content:space-between; */
    align-items: center;
    margin-bottom: 2rem;
`

const Form=styled.div`
  overflow-y: scroll;
  height: 24rem;
  border-right: 3px solid rgba(0,0,0,0.2);
  padding-right: 2rem;
  grid-area: form;
&::-webkit-scrollbar {
display: none;
} 
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

const ContenedorBoton=styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-top: 1rem;
`
const TextError=styled.p`
  margin-top: -13px;
  text-align: center;
  color: #f39c12;
  margin-top: 0.5rem;
  margin-bottom: 0;
`;
