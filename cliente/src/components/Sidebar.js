import React, { useContext,useState } from "react";
import styled from "styled-components";
import {
  faUserTie,
  faFileAlt,
  faUser,
  faMapMarkerAlt,
  faWarehouse,
  faFileSignature,
  faPowerOff,
  faExchangeAlt,
  faObjectGroup,
  faRandom
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Btn } from "./Btn";
import Logo from '../assets/LogoBomberos.png';
import { AuthContext } from "../context/Auth/AuthContext";
import Api from "../Api/Api";
import { CerrarSesion } from "./modal/CerrarSesion";
import { AnimatePresence } from "framer-motion";


export const Sidebar = () => {

  const {cerrarSesion}=useContext(AuthContext);
  const [visible, setVisible] = useState(false);

  const cerrar=async()=>{
    try {
      await Api.get('/logout');
      cerrarSesion();
    } catch (error) {
      console.log({error});
    }
  }

  return (
    <>
    <Contenedor>
      <ContenedorImagen>
        <Image
          src={Logo}
          alt='Logo'
        />
        <p>
          Administrador de Horas Extras <br /> Cuerpo de Bomberos
        </p>
      </ContenedorImagen>
      <ContenedorButones>
        <Btn
          titulo='Administrador Usuarios'
          icono={faUserTie}
          redirect='usuarios'
        />
        <Btn
          titulo='Administrador Reportes'
          icono={faFileAlt}
          redirect='reportes'
        />
        <Btn
          titulo='Administrador Empleados'
          icono={faUser}
          redirect='empleados'
        />
        <Btn
          titulo='Administrador de Ubicaciones'
          icono={faMapMarkerAlt}
          size={true}
          redirect='ubicaciones'
        />
        <Btn
          titulo='Administrador de Grupos'
          icono={faObjectGroup}
          size={true}
          redirect='grupos'
        />
        <Btn
          titulo='Administrador de Plazas'
          icono={faWarehouse}
          redirect='plazas'
        />
        <Btn
          titulo='Administrador de Traslados'
          icono={faRandom}
          redirect='admin-traslados'
        />
        <Btn
          titulo='Traslados'
          icono={faExchangeAlt}
          redirect='traslados'
        />
        <Btn
          titulo='Generar un Reporte'
          icono={faFileSignature}
          redirect='generar-reporte'
        />
        <Boton
          onClick={()=>{
            setVisible(true);
          }}
        >
          <FontAwesomeIcon icon={faPowerOff} style={{ fontSize: "20px",marginLeft:'4rem',marginRight:'2rem' }} />
          Cerrar Sesión
        </Boton>
      </ContenedorButones>
    </Contenedor>
    <AnimatePresence
            initial={false}
            exitBeforeEnter={true}
            onExitComplete={() => null}>
            {visible&&<CerrarSesion handleClose={()=>setVisible(false)}  cerrarSesion={cerrar}/>}
    </AnimatePresence>
    </>
  );
};

const Contenedor = styled.div`
  background-color: #343f56;
  height: 100%;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
`;

const ContenedorImagen = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  text-align: center;
  /* padding: 0.5rem; */
`;

const ContenedorButones = styled.div`
  display: flex;
  flex-direction: column;
  height: 70vh;
  overflow-y: auto;
  &::-webkit-scrollbar {
  width: 12px;               /* width of the entire scrollbar */
}

  &::-webkit-scrollbar-track {
  background: #343F56;        /* color of the tracking area */
  border-radius: 2rem;
}

  &::-webkit-scrollbar-thumb {
  background-color: #e2e2e2 ;    /* color of the scroll thumb */
  border-radius: 20px;       /* roundness of the scroll thumb */
  border: 3px solid #343F56;  /* creates padding around scroll thumb */
}
`;

const Boton = styled.button`
  width: 100%;
  border: 0;
  border-bottom: 2px solid rgba(255, 255, 255, 0.8);
  background-color: transparent;
  color: white;
  font-size: 18px;
  padding: 15px 0;
  display: flex;
  justify-content: flex-start;
  transition: background-color .3s ease-in-out;
  &:hover {
    background-color: #222938;
  }
`;