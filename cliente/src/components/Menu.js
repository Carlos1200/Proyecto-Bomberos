import React from "react";
import styled from "styled-components";
import { Sidebar } from "./Sidebar";

const Contenedor = styled.div({
  height: "100%",
  display: "grid",
  alignContent: "stretch",
  justifyContent: "start",
});

const ContSidebar = styled.div({
  gridColumnStart: 1,
  gridColumnEnd: 3,
  height: "100%",
});

const ContContenido = styled.div({
  gridColumnStart: 3,
  gridColumnEnd: 12,
  height: "100%",
  width: "100%",
  backgroundColor:"red",
});

export const Menu = ({ children }) => {
  return (
    <Contenedor>
      <ContSidebar>
        <Sidebar />
      </ContSidebar>
      <ContContenido>{children}</ContContenido>
    </Contenedor>
  );
};
