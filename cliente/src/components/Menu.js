import React from "react";
import styled from "styled-components";
import { Sidebar } from "./Sidebar";

const Contenedor = styled.div({
  height: "100%",
  width: "100%",
  display: "grid",
  gridTemplateColumns:"3fr 9fr",
  alignContent: "stretch",
  justifyContent: "start",
});

const ContSidebar = styled.div({
  height: "100%",
});

const ContContenido = styled.div({
  height: "100%",
  width: "100%",
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
