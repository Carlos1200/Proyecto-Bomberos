import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Api from "../Api/Api";

const schema = yup.object({
  minDiurno: yup
    .string()
    .matches(RegExp("^[0-9]\\d*$"), {
      message: "Los minutos debe ser un número positivo",
    })
    .required("Los minutos son obligatorios"),
  minNocturno: yup
    .string()
    .matches(RegExp("^[0-9]\\d*$"), {
      message: "Los minutos debe ser un número positivo",
    })
    .required("Los minutos son obligatorios"),
});

export const MinutosSeleccion = ({
  empleado,
  minutosFormulario,
  posicion,
  setErrores,
  erroresArray
}) => {
  const [empleadoDetalle, setEmpleadoDetalle] = useState();
  const [cargando, setCargando] = useState(true);
  const [validacion, setValidacion] = useState({
    validacionDiurno: true,
    validacionNocturno: true,
  })
  const {
    register,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (!cargando) {
      comprobarValidacion();
    }
  }, [
    errors.minDiurno,
    errors.minNocturno,
    validacion.validacionDiurno,
    validacion.validacionNocturno,
  ]);

  useEffect(() => {
    obtenerDetalles();
    const errorCopy=[...erroresArray];
    errorCopy[posicion]=true;
    setErrores(errorCopy);
  }, []);

  const comprobarValidacion = () => {
    if (
      errors.minDiurno ||
      errors.minNocturno ||
      validacion.validacionDiurno ||
      validacion.validacionNocturno
    ) {
      const errorCopy=[...erroresArray];
      errorCopy[posicion]=true;
      setErrores(errorCopy);
    } else {
      const errorCopy=[...erroresArray];
      errorCopy[posicion]=false;
      setErrores(errorCopy);
    }
  };

  const obtenerDetalles = async () => {
    try {
      const formData = new FormData();
      formData.append("idEmpleado", empleado.idEmpleado);

      const { data } = await Api.post("empleadoDetalle", formData);
      const resp=await Api.get('/pension');
      setEmpleadoDetalle(data[0]);
      const empleadoCompleto = {
        ...data[0],
        minutosDiurnos: "0",
        minutosNocturnos: "0",
        salario:Number(data[0].salarioNormal),
        idTipoPension:resp.data.filter(pension=>pension.nombrePension==data[0].nombrePension)[0].idPension,
      };

      minutosFormulario.current[posicion] = empleadoCompleto;
      setCargando(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Contenedor>
      {!cargando ? (
        <>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Nombres style={{ marginRight: "1rem", fontSize: "1.5rem" }}>
              {empleadoDetalle.nombres}
            </Nombres>
            <Nombres style={{ fontSize: "1.5rem" }}>
              {empleadoDetalle.apellidos}
            </Nombres>
          </div>
          <ContenedorColumnas>
            <ContenedorInfo>
              <Nombres>
                Ubicación: <Span>{empleadoDetalle.nombreUbicacion}</Span>
              </Nombres>
              <Nombres>
                Plaza Nominal: <Span>{empleadoDetalle.nombrePlaza}</Span>
              </Nombres>
            </ContenedorInfo>
            <ContenedorInfo>
              <div>
                <Nombres>Minutos Diurnos</Nombres>
                <Textbox
                  {...register("minDiurno")}
                  onChange={(e) => {
                    minutosFormulario.current[posicion].minutosDiurnos =
                      e.target.value;

                      setValidacion({...validacion,validacionDiurno:false});
                  }}
                />
                {errors.minDiurno && (
                  <TextError>{errors.minDiurno.message}</TextError>
                )}
              </div>
              <div>
                <Nombres>Minutos Nocturnos</Nombres>
                <Textbox
                  {...register("minNocturno")}
                  onChange={(e) => {
                    minutosFormulario.current[posicion].minutosNocturnos =
                      e.target.value;
                      setValidacion({...validacion,validacionNocturno:false});
                  }}
                />
                {errors.minNocturno && (
                  <TextError>{errors.minNocturno.message}</TextError>
                )}
              </div>
            </ContenedorInfo>
          </ContenedorColumnas>
        </>
      ) : null}
    </Contenedor>
  );
};

const Contenedor = styled.div`
  border: 1px solid #000;
  border-radius: 1.2rem;
  margin: 0.5rem 1rem;
`;

const ContenedorColumnas = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding: 1rem;
`;

const Nombres = styled.p`
  font-size: 0.9rem;
  font-weight: bold;
  text-align: center;
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
  font-family:sans-serif;
`;

const Span = styled.span`
  color: #717171;
`;

const ContenedorInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  padding: 0 1rem;
`;

const Justificacion = styled.textarea`
  resize: none;
  overflow-y: auto;
  width: 100%;
  height: 6rem;
  &::-webkit-scrollbar {
    width: 12px; /* width of the entire scrollbar */
  }

  &::-webkit-scrollbar-track {
    background: #e2e2e2; /* color of the tracking area */
    border-radius: 2rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #343f56; /* color of the scroll thumb */
    border-radius: 20px; /* roundness of the scroll thumb */
    border: 3px solid #e2e2e2; /* creates padding around scroll thumb */
  }
`;

const Fecha = styled.input`
  margin-bottom: 1rem;
  appearance: none;
  border: 1px solid #cccccc;
  border-radius: 0.2rem;
  padding: 0.5rem 1rem;
`;

const TextError = styled.p`
  margin-top: -13px;
  text-align: center;
  color: #f39c12;
  margin-top: 0.5rem;
  margin-bottom: 0;
`;
