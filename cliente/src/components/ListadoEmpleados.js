import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";


export const ListadoEmpleados = ({Empleados,eliminaListado}) => {

    return (
        <Contenedor>
      <ContenedorTabla>
        <Table>
        <HeadTop>
          <ColumTitleBox>
              <ColumnTitle>Nombre del Empleado</ColumnTitle>
              <ColumnTitle>Plaza</ColumnTitle>
              <ColumnTitle>Borrar</ColumnTitle>
          </ColumTitleBox>
        </HeadTop>
        <Body>
            {Empleados.map((empleado,index)=>(
              <ColumInputBox key={index}>
                <ColumInput>{empleado.nombres} {empleado.apellidos}</ColumInput>
                <ColumInput>{empleado.nombrePlaza}</ColumInput>
            <ColumInput>
            <BtnEliminar onClick={()=>eliminaListado(empleado.id?empleado.id:empleado.idEmpleado)}>
              <FontAwesomeIcon
                icon={faTrashAlt}
                style={{ fontSize: "23px", color: "FF0000" }}
              />
            </BtnEliminar>
            </ColumInput>
              </ColumInputBox>
            ))}
        </Body>
      </Table>
      </ContenedorTabla>
    </Contenedor>
    )
}
const Contenedor = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 20px;
`;

const ContenedorTabla=styled.div`
  overflow-y: auto;
  width: 100%;
  height: 100%;
  &::-webkit-scrollbar {
    display: none;
  }
`

const Table = styled.table`
  border-collapse: separate;
  border-spacing: 0 10px;
  width: 100%;
`;

const ColumTitleBox = styled.tr`
  text-align: center;
`;

const ColumnTitle = styled.th`
  font-size: 18px;
  font-weight: bold;
`;
const HeadTop = styled.thead`

`;
const ColumInputBox = styled.tr`
  background-color: #e2e2e2;
  width: 100%;
`;

const Body=styled.tbody`
width: 100%;
`

const ColumInput = styled.td`
  text-align: center;
  padding: 5px 0;
    &:first-child{
        border-radius: 20px 0 0 20px;
    }
    &:last-child{
        border-radius: 0 20px 20px 0;
    }
`;

const BtnEliminar=styled.button`
  border: 0;
  background-color: transparent;
  cursor: pointer;
`