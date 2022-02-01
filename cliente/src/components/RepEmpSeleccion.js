import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import * as yup from "yup";

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
export const RepEmpSeleccion = ({ ReportEmplFormulario, posicion,setErrores,erroresArray,pensiones,isAdmin }) => {
  const [empleado, setEmpleado] = useState();
  const [cargando, setCargando] = useState(true);
  const [validacion, setValidacion] = useState({
    validacionDiurno: true,
    validacionNocturno: true,
  });

  const {
    register,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    const empleadoArreglado=detallesEmpleado();
    setEmpleado(empleadoArreglado);
    setCargando(false);
    const errorCopy=[...erroresArray];
    errorCopy[posicion]=true;
    setErrores(errorCopy);
    // eslint-disable-next-line
  }, []);

  const detallesEmpleado=()=>{
    const pension=pensiones.find(pension=>pension.idPension===ReportEmplFormulario.current.empleados[posicion].idPensionActual).nombrePension;
    ReportEmplFormulario.current.empleados[posicion].nombrePension=pension
    return ReportEmplFormulario.current.empleados[posicion];
  }

  useEffect(() => {
    if (!cargando) {
      comprobarValidacion();
    }
    // eslint-disable-next-line
  }, [errors.minDiurno,errors.minNocturno,validacion.validacionDiurno,validacion.validacionNocturno]);

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


  return (
    <Contenedor>
      <ContenedorColumnas>
        {!cargando ? (
          <>
            <Padre>
              <Title>Información</Title>
              <ContenedorInputs>
                <Columna>
                  <Nombres>Nombre del Empleado:</Nombres>
                  <Span>
                    {empleado.nombres} {empleado.apellidos}
                  </Span>
                </Columna>
                <Columna>
                  <Nombres>Salario Nominal:</Nombres>
                  <Span>
                    $ {Number.parseFloat(empleado.salarioActual).toFixed(2)}
                  </Span>
                </Columna>
              </ContenedorInputs>

              <ContenedorInputs>
                <Columna>
                  <Nombres>Liquido:</Nombres>
                  <Span>
                    $ {Number.parseFloat(empleado.liquido).toFixed(2)}
                  </Span>
                </Columna>
                <Columna>
                  <Nombres>Tipo de Pensión:</Nombres>
                  <Span>{empleado.nombrePension}</Span>
                </Columna>
              </ContenedorInputs>
            </Padre>
            <Padre>
              <Title>Descuentos</Title>
              <ContenedorInfo>
                <div>
                  <Columna>
                    <Nombres>Sueldos Para ISSS:</Nombres>
                    <Span>
                      ${Number.parseFloat(empleado.sueldoISSS).toFixed(2)}
                    </Span>
                  </Columna>
                  <Columna>
                    <Nombres>ISSS:</Nombres>
                    <Span>
                      ${Number.parseFloat(empleado.isssDescuento).toFixed(2)}
                    </Span>
                  </Columna>
                </div>
                <div>
                  <Columna>
                    <Nombres>Retención de Renta:</Nombres>
                    <Span>
                      ${Number.parseFloat(empleado.retencionRenta).toFixed(2)}
                    </Span>
                  </Columna>
                  <Columna>
                    <Nombres>IPSFA:</Nombres>
                    <Span>
                      ${Number.parseFloat(empleado.ipsfaDescuento).toFixed(2)}
                    </Span>
                  </Columna>
                </div>
                <div>
                  <Columna>
                    <Nombres>AFP Crecer:</Nombres>
                    <Span>
                      $
                      {Number.parseFloat(empleado.afpCrecerDescuento).toFixed(
                        2
                      )}
                    </Span>
                  </Columna>
                  <Columna>
                    <Nombres>AFP Confía:</Nombres>
                    <Span>
                      $
                      {Number.parseFloat(empleado.afpConfiaDescuento).toFixed(
                        2
                      )}
                    </Span>
                  </Columna>
                </div>
              </ContenedorInfo>
            </Padre>
            <div>
              <Title>Minutos</Title>
              <ContenedorInputs>
                <Columna>
                  <Nombres>Minutos Normales Diurnos:</Nombres>
                  <Span>{empleado.minutosDiurnosNormales}</Span>
                </Columna>
                <Columna>
                  <Nombres>Minutos Normales Nocturnos:</Nombres>
                  <Span>{empleado.minutosNocturnosNormales}</Span>
                </Columna>
              </ContenedorInputs>
              <ContenedorInputs>
                <Columna>
                  <Nombres>Minutos Autorizados Diurnos:</Nombres>
                  <Textbox
                  disabled={!isAdmin}
                        {...register("minDiurno")}
                        placeholder={empleado.minutosDiurnosAutorizados}
                        onChange={(e) => {
                            ReportEmplFormulario.current.empleados[posicion].minutosDiurnosAutorizados =
                            e.target.value;

                            setValidacion({...validacion,validacionDiurno:false});
                        }}
                    />
                {errors.minDiurno && (
                  <TextError>{errors.minDiurno.message}</TextError>
                )}
                </Columna>
                <Columna>
                  <Nombres>Minutos Autorizados Nocturnos:</Nombres>
                  <Textbox
                  disabled={!isAdmin}
                  {...register("minNocturno")}
                  placeholder={empleado.minutosNocturnosAutorizados}
                  onChange={(e) => {
                    ReportEmplFormulario.current.empleados[posicion].minutosNocturnosAutorizados =
                      e.target.value;
                      setValidacion({...validacion,validacionNocturno:false});
                  }}
                    />
                    {errors.minNocturno && (
                    <TextError>{errors.minNocturno.message}</TextError>
                    )}
                </Columna>
              </ContenedorInputs>
            </div>
          </>
        ) : null}
      </ContenedorColumnas>
    </Contenedor>
  );
};

const Contenedor = styled.div`
  border: 1px solid #717171;
  border-radius: 1.2rem;
  margin: 0.5rem 1rem;
`;

const ContenedorColumnas = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 1rem;
`;

const ContenedorInputs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1rem;
`;

const Padre = styled.div`
    border-right: 2px dashed #717171;
`; 

const Columna = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
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
  width: 50%;
  border-radius: 0.2rem;
  font-family: sans-serif;
`;

const Span = styled.span`
  color:#717171;
  width: 100%;
  text-align: center;
  font-family:sans-serif, 'Times New Roman', Times, serif;
`;

const ContenedorInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  padding: 0 1rem;
`;

const TextError = styled.p`
  margin-top: -13px;
  text-align: center;
  color: #f39c12;
  margin-top: 0.5rem;
  margin-bottom: 0;
`;
