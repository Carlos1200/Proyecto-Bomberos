import React from "react";
import styled from "styled-components";
import { Sidebar } from "./Sidebar";

const Contenedor = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns:3fr 9fr;
  align-content: stretch;
  justify-content: start;
  overflow-y: hidden;
`

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
