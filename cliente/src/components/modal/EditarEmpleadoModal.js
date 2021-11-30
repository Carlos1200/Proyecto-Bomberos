import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Modal } from "../Modal";
import { UseDatos } from "../../hooks/UseDatos";
import Api from "../../Api/Api";
import { EmpleadosContext } from "../../context/empleados/EmpleadosContext";

const schema = yup.object({
  nombres: yup.string().required("Los nombres son obligatorios"),
  apellidos: yup.string().required("Los apellidos son obligatorios"),
  salario: yup
    .string()
    .test(
      "validar numero positivo",
      "El salario debe ser positivo",
      function (value) {
        const numero = Number(value);
        return numero > 0;
      }
    )
    .required("El salario Es obligatorio"),
  ubicacion: yup.object({
    idUbicacion: yup.string().required("La ubicación no debe ir vacía"),
    nombreUbicacion: yup.string().required("La ubicación no debe ir vacía"),
  }),
  plaza: yup.object({
    idPlaza: yup.string().required("La plaza no debe ir vacía"),
    nombrePlaza: yup.string().required("La plaza no debe ir vacía"),
  }),
  pension: yup.object({
    idPension: yup.string().required("La pension no debe ir vacía"),
    nombrePension: yup.string().required("La pension no debe ir vacía"),
  }),
  grupo: yup.object({
    idGrupo: yup.string().required("El Grupo no debe ir vacío"),
    nombreGrupo: yup.string().required("El Grupo no debe ir vacío"),
  }),
});

export const EditarEmpleadoModal = ({
  handleClose,
  empleadoId,
  notificacion,
  notificacionError
}) => {
  const [datosUbicacion, cargandoUbicacion] = UseDatos("ubicacion");
  const [datosPlaza, cargandoPlaza] = UseDatos("plaza");
  const [datosPension, cargandoPension] = UseDatos("pension");
  const [datosGrupo, cargandoGrupo] = UseDatos("grupo");
  const [cargando, setCargando] = useState(true);
  const [detalles, setDetalles] = useState();

  const {setConsultar}=useContext(EmpleadosContext);
  useEffect(() => {
    obtenerDetalles();
    // eslint-disable-next-line
  }, []);

  const obtenerDetalles = async () => {
    const formData = new FormData();
    formData.append("idEmpleado", empleadoId);
    const { data } = await Api.post("/empleadoDetalle", formData);
    setDetalles(data[0]);
  };

  useEffect(() => {
    if (
      !cargandoUbicacion &&
      !cargandoPlaza &&
      !cargandoPension &&
      !cargandoGrupo &&
      detalles
    ) {
      setCargando(false);
    }
  }, [
    cargandoUbicacion,
    cargandoPlaza,
    cargandoPension,
    cargandoGrupo,
    detalles,
    notificacionError
  ]);

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const editarEmpleado = async({nombres,apellidos,salario,ubicacion,plaza,pension,grupo}) => {
    const formData=new FormData();
    formData.append('idEmpleado',empleadoId);
    formData.append('nombres',nombres);
    formData.append('apellidos',apellidos)
    formData.append('salarioNominal',salario)
    formData.append('idGrupo',grupo.idGrupo)
    formData.append('idPension',pension.idPension)
    formData.append('idUbicacion',ubicacion.idUbicacion)
    formData.append('idPlaza',plaza.idPlaza)

    try {
      setConsultar(false);
      await Api.post("/empleadoEdit",formData);
      setConsultar(true);
      handleClose();
      notificacion();
    } catch (error) {
      if(!error.response){
        notificacionError("Error en el servidor")
      }else{
        notificacionError(error.response.data[0]);
      }
    }

  };
  return (
    <Modal handleClose={handleClose}>
      <Contenedor>
        <Header>
          <Titulo>Editar Empleados</Titulo>
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
        {!cargando && (
          <Form>
            <Label>Nombres</Label>
            <Controller
              control={control}
              render={({ field: { onChange, value, onBlur } }) => (
                <Textbox onChange={onChange} value={value} onBlur={onBlur} />
              )}
              name='nombres'
              defaultValue={detalles.nombres}
            />
            {errors.nombres && <TextError>{errors.nombres.message}</TextError>}
            <Label>Apellidos</Label>
            <Controller
              control={control}
              render={({ field: { onChange, value, onBlur } }) => (
                <Textbox onChange={onChange} value={value} onBlur={onBlur} />
              )}
              name='apellidos'
              defaultValue={detalles.apellidos}
            />
            {errors.apellidos && (
              <TextError>{errors.apellidos.message}</TextError>
            )}
            <Label>Salario</Label>
            <Controller
              control={control}
              render={({ field: { onChange, value, onBlur } }) => (
                <Textbox
                  onChange={onChange}
                  value={value}
                  onBlur={onBlur}
                  type='number'
                />
              )}
              name='salario'
              defaultValue={detalles.salarioNormal}
            />
            {errors.salario && <TextError>{errors.salario.message}</TextError>}
            <Label>Ubicacion</Label>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select
                  options={datosUbicacion}
                  getOptionLabel={(ubicacion) => ubicacion.nombreUbicacion}
                  getOptionValue={(ubicacion) => ubicacion.idUbicacion}
                  value={value}
                  placeholder='Selecciona una Ubicación'
                  onChange={onChange}
                  menuPlacement='auto'
                />
              )}
              name='ubicacion'
              defaultValue={() =>
                datosUbicacion.find(
                  (ubicacion) =>
                    ubicacion.nombreUbicacion === detalles.nombreUbicacion
                )
              }
            />
            {errors.ubicacion && (
              <TextError>{errors.ubicacion.nombreUbicacion.message}</TextError>
            )}
            <Label>Plaza</Label>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select
                  options={datosPlaza}
                  getOptionLabel={(plaza) => plaza.nombrePlaza}
                  getOptionValue={(plaza) => plaza.idPlaza}
                  value={value}
                  placeholder='Selecciona una Plaza'
                  onChange={onChange}
                  menuPlacement='auto'
                />
              )}
              name='plaza'
              defaultValue={() =>
                datosPlaza.find(
                  (plaza) => plaza.nombrePlaza === detalles.nombrePlaza
                )
              }
            />
            {errors.plaza && (
              <TextError>{errors.plaza.nombrePlaza.message}</TextError>
            )}
            <Label>Pension</Label>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select
                  options={datosPension}
                  getOptionLabel={(pension) => pension.nombrePension}
                  getOptionValue={(pension) => pension.idPension}
                  value={value}
                  placeholder='Selecciona una Pensión'
                  onChange={onChange}
                  menuPlacement='top'
                />
              )}
              name='pension'
              defaultValue={() =>
                datosPension.find(
                  (pension) => pension.nombrePension === detalles.nombrePension
                )
              }
            />
            {errors.pension && (
              <TextError>{errors.pension.nombrePension.message}</TextError>
            )}
            <Label>Grupo</Label>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select
                  options={datosGrupo}
                  getOptionLabel={(grupo) => grupo.nombreGrupo}
                  getOptionValue={(grupo) => grupo.idGrupo}
                  value={value}
                  placeholder='Selecciona un Grupo'
                  onChange={onChange}
                  menuPlacement='top'
                />
              )}
              name='grupo'
              defaultValue={() =>
                datosGrupo.find(
                  (grupo) => grupo.nombreGrupo === detalles.nombreGrupo
                )
              }
            />
            {errors.grupo && (
              <TextError>{errors.grupo.nombreGrupo.message}</TextError>
            )}
            <ContenedorBoton onClick={handleSubmit(editarEmpleado)}>
              <FontAwesomeIcon
                icon={faUserEdit}
                style={{
                  fontSize: "2rem",
                  color: "#343f56",
                  marginRight: "1rem",
                }}
              />
              <Label>Agregar Empleado</Label>
            </ContenedorBoton>
          </Form>
        )}
      </Contenedor>
    </Modal>
  );
};

const Contenedor = styled.div`
  /* background-color: red; */
  width: 100%;
  height: 100%;
`;

const Titulo = styled.h2`
  font-weight: bold;
  margin: 0 auto;
`;
const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  /* justify-content:space-between; */
  align-items: center;
  margin-top: 2rem;
`;

const Label = styled.p`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  margin-top: 10px;
`;

const Textbox = styled.input`
  background-color: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.2);
  height: 32px;
  padding-left: 20px;
  font-size: 5mm;
  margin: 0;
  width: 100%;
  border-radius: 0.2rem;
`;

const Form = styled.div`
  overflow-y: scroll;
  height: 24rem;
  grid-area: form;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ContenedorBoton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
const TextError = styled.p`
  margin-top: -13px;
  text-align: center;
  color: #f39c12;
  margin-top: 0.5rem;
  margin-bottom: 0;
`;
