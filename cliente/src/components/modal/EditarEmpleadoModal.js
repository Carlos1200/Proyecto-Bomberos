import React,{useEffect, useState} from 'react'
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

const schema=yup.object({
  nombres:yup.string().required("Los nombres son obligatorios"),
  apellidos:yup.string().required("Los apellidos son obligatorios"),
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
})

export const EditarEmpleadoModal = ({handleClose,consultarEmpleados}) => {

    const [datosUbicacion,cargandoUbicacion] = UseDatos('ubicacion');
    const [datosPlaza,cargandoPlaza] = UseDatos('plaza');
    const [datosPension,cargandoPension] = UseDatos('pension');
    const [datosGrupo,cargandoGrupo] = UseDatos('grupo');
    const [cargando, setCargando] = useState(true);
    
  useEffect(()=>{
    if(!cargandoUbicacion||!cargandoPlaza||!cargandoPension||!cargandoGrupo){
      setCargando(false);
    }
  },[cargandoUbicacion,cargandoPlaza,cargandoPension,cargandoGrupo])

    const { register, handleSubmit,formState: { errors },control } = useForm({
      resolver:yupResolver(schema),
    });
    return (
      <Modal handleClose={handleClose}>
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
          {!cargando&&(
            <>
              <Label>Nombres</Label>
              <Textbox  {...register("nombres")} />
              {errors.nombres&& <TextError>{errors.nombres.message}</TextError>}
              <Label>Apellidos</Label>
              <Textbox  {...register("apellidos")} />
              {errors.apellidos&& <TextError>{errors.apellidos.message}</TextError>}
              <Label>Ubicacion</Label>
                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) =>(
                      <Select 
                      options={datosUbicacion}
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
                      options={datosPlaza}
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
                      options={datosPension}
                      getOptionLabel={(pension)=>pension.nombrePension}
                      getOptionValue={(pension)=>pension.idPension}
                      value={value}
                      placeholder="Selecciona una Pensión"
                      onChange={onChange}
                      menuPlacement="auto"
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
                      options={datosGrupo}
                      getOptionLabel={(grupo)=>grupo.nombreGrupo}
                      getOptionValue={(grupo)=>grupo.idGrupo}
                      value={value}
                      placeholder="Selecciona un Grupo"
                      onChange={onChange}
                      menuPlacement="auto"
                    />
                    )
                  }
                  name="grupo"
                />
                {errors.grupo&& <TextError>{errors.grupo.nombreGrupo.message}</TextError>}
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
    font-weight: bold;
    margin: 0 auto;
`
const Header=styled.div`
    width:100%;
    display:flex;
    flex-direction: row;
    /* justify-content:space-between; */
    align-items: center;
    margin-top: 2rem;
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