import { useEffect, useState, useRef, useContext } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "../Modal";
import { MinutosSeleccion } from "../MinutosSeleccion";
import { AnimatePresence } from "framer-motion";
import { AutorizacionModal } from "./AutorizacionModal";
import { UseReportes } from "../../hooks/UseReportes";
import { AuthContext } from "../../context/Auth/AuthContext";
import { detallesEmpleadosLotes } from "../../services/empleadosServices";
import { getPensiones } from "../../services/pensionesServices";

export const ReportesModal = ({
  handleClose,
  empleados,
  limpiarEmpleados,
  mostrarNotificacion,
}) => {
  const { idUsuario, NombreUsuario, UbicacionUsuario } =
    useContext(AuthContext);


  const minutosFormulario = useRef([]);
  const [cantidad, setCantidad] = useState(0);
  const [empleadosDetallados, setEmpleadosDetallados] = useState([]);
  const [pensiones, setPensiones] = useState([]);
  const [errores, setErrores] = useState([true]);
  const [autorizacionModal, setAutorizacionModal] = useState(false);
  const [cargandoDetalles, setCargandoDetalles] = useState(true);
  const [cargando, setCargando] = useState(false);
  const [cargandoProceso, setCargandoProceso] = useState(false);
  const { GenerarReporte } = UseReportes(mostrarNotificacion,
    limpiarEmpleados,
    handleClose,
    setCargandoProceso);
  useEffect(() => {
    setCantidad(empleados.length - 1);
  }, [empleados]);

  useEffect(()=>{
    const idEmpleados=formatearIds();
    const formData=new FormData();
    formData.append('idEmpleado',idEmpleados);
    Promise.all([detallesEmpleadosLotes(formData),getPensiones()]).then(([empleadosLotes,pensiones])=>{
      setEmpleadosDetallados(empleadosLotes);
      setPensiones(pensiones);  
    }).catch((error)=>{
      mostrarNotificacion(true);
    }).finally(()=>{
      setCargandoDetalles(false);
    })
    // eslint-disable-next-line
  },[]);

  const formatearIds=()=>{
    let ids = '';
    empleados.forEach((empleado)=>{
      if(!ids){
        ids = empleado.idEmpleado;
      }else{
        ids = ids + ',' + empleado.idEmpleado;
      }
    });
    return ids;
  }

  return (
    <>
      <Modal handleClose={handleClose}>
        <Contenedor>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              margin: "-1.3rem 0",
            }}>
            <FontAwesomeIcon
              icon={faWindowClose}
              style={{
                color: "red",
                fontSize: "2.5rem",
                cursor: "pointer",
              }}
              onClick={handleClose}
            />
          </div>
          <Titulo>Ingreso de Minutos por empleado</Titulo>
          {cargando?<Error>Subiendo los datos, puede tomar unos minutos</Error>:null}
          <ContenedorMinutos>
            {!cargandoDetalles&&empleadosDetallados.map((empleado, index) => (
              <MinutosSeleccion
                key={empleado.idEmpleado}
                posicion={index}
                empleado={empleado}
                minutosFormulario={minutosFormulario}
                ultimo={cantidad}
                setErrores={setErrores}
                pensiones={pensiones}
                erroresArray={errores}
              />
            ))}
          </ContenedorMinutos>
          <Btn
            type='button'
            disabled={errores.includes(true) || cargandoProceso}
            onClick={() => {
              setAutorizacionModal(true);
            }}>
            <Text>Agregar</Text>
            <FontAwesomeIcon
              icon={faSignInAlt}
              style={{ fontSize: "23px", color: "#fff" }}
            />
          </Btn>
        </Contenedor>
      </Modal>
      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}>
        {autorizacionModal && (
          <AutorizacionModal
            handleClose={() => setAutorizacionModal(false)}
            enviarDatos={() => {
              setCargandoProceso(true);
              const horasDiurnas = minutosFormulario.current.reduce(
                (acumulador, minutos) => {
                  return acumulador + Number(minutos.minutosDiurnos);
                },
                0
              );

              const horasNocturnas = minutosFormulario.current.reduce(
                (acumulador, minutos) => {
                  return acumulador + Number(minutos.minutosNocturnos);
                },
                0
              );

              const horasTotales = horasDiurnas + horasNocturnas;

              GenerarReporte(
                minutosFormulario.current,
                idUsuario,
                NombreUsuario,
                UbicacionUsuario,
                horasDiurnas,
                horasNocturnas,
                horasTotales,
                setCargando
              );
              setAutorizacionModal(false);
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
};

const Contenedor = styled.div`
  width: 100%;
  height: 100%;
`;

const Titulo = styled.h2`
  text-align: center;
  font-weight: bold;
`;

const ContenedorMinutos = styled.div`
  overflow-y: auto;
  height: 55vh;
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

const Btn = styled.button`
  display: flex;
  margin: 0 auto;
  justify-content: space-around;
  align-items: center;
  background-color: #04b99c;
  border-radius: 1rem;
  margin-top: 1rem;
  padding: 0 1rem;
  border: 0;
  transition: background-color 0.3s ease-in-out;
  opacity:${props=>props.disabled?'0.5':'1'};
  &:hover {
    background-color: #028671;
  }
`;

const Text = styled.p`
  color: #fff;
  font-size: 1.5rem;
  margin-right: 0.7rem;
`;

const Error=styled.h3`
    text-align: center;
    font-weight: bold;
    color: red;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
`