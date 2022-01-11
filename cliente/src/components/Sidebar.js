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
import { Btn } from "./Btn";
import Logo from '../assets/LogoBomberos.png';
import { AuthContext } from "../context/Auth/AuthContext";
import { AnimatePresence } from "framer-motion";
import {CerrarSesion} from './modal/CerrarSesion'
import { CerrarSesion as Logout } from "../services/authServices";


export const Sidebar = () => {

  const {cerrarSesion,tipoUsuario}=useContext(AuthContext);
  const [visible, setVisible] = useState(false);

  const cerrar=async()=>{
    Logout().then(()=>{
      cerrarSesion();
    }).catch(err=>{
      console.log(err);
    })
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
        {tipoUsuario==="Administrador"&&(
            <Btn
              titulo='Administrador Usuarios'
              icono={faUserTie}
              redirect='usuarios'
            />
          )}
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
        {tipoUsuario==="Administrador"&&(
          <>
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
          </>
        )}
        {<Btn
          titulo='Administrador de Traslados'
          icono={faRandom}
          redirect='admin-traslados'
        />}
        <Btn
          titulo='Generar un Traslado'
          icono={faExchangeAlt}
          redirect='traslados'
        />
        <Btn
          titulo='Generar un Reporte'
          icono={faFileSignature}
          redirect='generar-reporte'
        />
        <Btn
          titulo='Cerrar Sesión'
          icono={faPowerOff}
          onpress={()=>setVisible(true)}
        />
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
  width: 100%;
  height: 100%;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    margin: 1rem 0;
  }
`;

const ContenedorImagen = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  text-align: center;
  @media (max-width: 768px) {
    p{
      display: none;
    }
  }
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