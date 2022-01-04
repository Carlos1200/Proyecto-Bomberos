import { useEffect, useState } from "react";
import styled from "styled-components";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSetRecoilState } from "recoil";
import { Modal } from "../Modal";
import { empleadosState } from "../tablas/TablaEmpleado";
import { detallesEmpleados, editarEmpleados } from "../../services/empleadosServices";
import { getUbicaciones } from "../../services/ubicacionesServices";
import { getPlazas } from "../../services/plazasServices";
import { getGrupos } from "../../services/gruposServices";
import { getPensiones } from "../../services/pensionesServices";

const schema = yup.object({
  nombres: yup.string().required("Los nombres son obligatorios"),
  apellidos: yup.string().required("Los apellidos son obligatorios"),
  salario: yup
    .string()
    .matches(RegExp("^[0-9]\\d*$"), {
      message: "El salario debe ser un número positivo",
    })
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
  const [infoEmpleado, setInfoEmpleado] = useState();
  const [cargando, setCargando] = useState(true);
  const [detalles, setDetalles] = useState();
  const setEmpleados=useSetRecoilState(empleadosState);

  useEffect(()=>{
    const formData = new FormData();
    formData.append("idEmpleado", empleadoId);
    Promise.all([getUbicaciones(),getPlazas(),getGrupos(),getPensiones(),detallesEmpleados(formData)]).then(([ubicaciones,plazas,grupos,pensiones,detalles])=>{
      setInfoEmpleado({
        ubicaciones,
        plazas,
        grupos,
        pensiones
      });
      setDetalles(detalles);
    }).catch(error=>{
      if(!error.response){
        notificacionError("Error en el servidor")
      }else{
        notificacionError(error.response.data[0]);
      }
    }).finally(()=>{
      setCargando(false);
    });
  },[])

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

    editarEmpleados(formData).then(()=>{
      setEmpleados((oldValue)=>{
        return oldValue.map((empleado)=>{
          if(empleado.idEmpleado===empleadoId){
            empleado.nombres=nombres;
            empleado.apellidos=apellidos;
            empleado.salarioNominal=salario;
            empleado.idGrupo=grupo.idGrupo;
            empleado.idPension=pension.idPension;
            empleado.idUbicacion=ubicacion.idUbicacion;
            empleado.idPlaza=plaza.idPlaza;
          }
          return empleado;
        });
      })
      handleClose();
      notificacion();
    }).catch(error=>{
      if(!error.response){
        notificacionError("Error en el servidor")
      }else{
        notificacionError(error.response.data[0]);
      }
    })
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
                  type='text'
                />
              )}
              name='salario'
              defaultValue={detalles.salarioNominal}
            />
            {errors.salario && <TextError>{errors.salario.message}</TextError>}
            <Label>Ubicacion</Label>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select
                  options={infoEmpleado.ubicaciones}
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
                infoEmpleado.ubicaciones.find(
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
                  options={infoEmpleado.plazas}
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
                infoEmpleado.plazas.find(
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
                  options={infoEmpleado.pensiones}
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
                infoEmpleado.pensiones.find(
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
                  options={infoEmpleado.grupos}
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
                infoEmpleado.grupos.find(
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
  font-family:Georgia, 'Times New Roman', Times, serif;
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
