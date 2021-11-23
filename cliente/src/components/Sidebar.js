import React, { useContext } from "react";
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
  faObjectGroup
} from "@fortawesome/free-solid-svg-icons";
import { Btn } from "./Btn";
import Logo from '../assets/LogoBomberos.png';
import { AuthContext } from "../context/Auth/AuthContext";
import Api from "../Api/Api";


export const Sidebar = () => {

  const {cerrarSesion}=useContext(AuthContext);

  const cerrar=async()=>{
    try {
      await Api.get('/logout');
      cerrarSesion();
    } catch (error) {
      console.log({error});
    }
  }

  return (
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
          titulo='Traslados'
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
          redirect="" 
          onpress={cerrar}
        />
      </ContenedorButones>
    </Contenedor>
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
