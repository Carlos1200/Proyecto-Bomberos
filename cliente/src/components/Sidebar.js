import React from "react";
import styled from "styled-components";
import { Btn } from "./Btn";
import {
  faUserTie,
  faFileAlt,
  faUser,
  faMapMarkerAlt,
  faWarehouse,
  faFileSignature,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons";

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
  padding: 1rem;
`;

const ContenedorButones = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Sidebar = () => {
  return (
    <Contenedor>
      <ContenedorImagen>
        <Image
          src='https://pbs.twimg.com/profile_images/1196148301231542280/stKHAKiH_400x400.jpg'
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
          titulo='Administrador de Plazas'
          icono={faWarehouse}
          redirect='plazas'
        />
        <Btn
          titulo='Generar un Reporte'
          icono={faFileSignature}
          redirect='generar-reporte'
        />
      </ContenedorButones>
      <div style={{ marginTop: "4rem" }}>
        <Btn titulo='Cerrar Sesión' icono={faPowerOff} />
      </div>
    </Contenedor>
  );
};
