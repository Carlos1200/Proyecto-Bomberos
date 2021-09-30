import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import data from '../assets/encabezados.json';

export const Tabla = () => {
  return (
    <Contenedor>
      <Table>
        <HeadTop>
          <ColumTitleBox>
            <ColumnTitle>Jefe de Estacion</ColumnTitle>
            <ColumnTitle>
              Fecha de Creación <br /> del Reporte
            </ColumnTitle>
            <ColumnTitle>Minutos <br /> Verificados</ColumnTitle>
            <ColumnTitle>Acceder</ColumnTitle>
            <ColumnTitle>Borrar</ColumnTitle>
          </ColumTitleBox>
        </HeadTop>
        <tbody>
          <ColumInputBox>
            <ColumInput>Diego Abrego</ColumInput>
            <ColumInput>Octubre 2020</ColumInput>
            <ColumInput>
              <FontAwesomeIcon
                icon={faCheck}
                style={{ fontSize: "23px", color: "FF0000" }}
              />
            </ColumInput>
            <ColumInput>
              <FontAwesomeIcon
                icon={faEdit}
                style={{ fontSize: "23px", color: "0C9021" }}
              />
            </ColumInput>
            <ColumInput>
              <FontAwesomeIcon
                icon={faTrashAlt}
                style={{ fontSize: "23px", color: "FF0000" }}
              />
            </ColumInput>
          </ColumInputBox>
            <ColumInputBox>
                <ColumInput>Diego Abrego</ColumInput>
                <ColumInput>Octubre 2020</ColumInput>
                <ColumInput>
                <FontAwesomeIcon
                    icon={faCheck}
                    style={{ fontSize: "23px", color: "FF0000" }}
                />
                </ColumInput>
                <ColumInput>
                <FontAwesomeIcon
                    icon={faEdit}
                    style={{ fontSize: "23px", color: "0C9021" }}
                />
                </ColumInput>
                <ColumInput>
                <FontAwesomeIcon
                    icon={faTrashAlt}
                    style={{ fontSize: "23px", color: "FF0000" }}
                />
                </ColumInput>
            </ColumInputBox>
        </tbody>
      </Table>
    </Contenedor>
  );
};

const Contenedor = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 20px;
`;

const Table = styled.table`
  border-collapse: separate;
  border-spacing: 0 10px;
  width: 100%;
  height: 100%;
`;

const ColumTitleBox = styled.tr`
  text-align: center;
`;

const ColumnTitle = styled.th`
  font-size: 18px;
  font-weight: bold;
`;
const HeadTop = styled.thead`
  /* border-bottom: 20px solid white; */
`;
const ColumInputBox = styled.tr`
  background-color: #e2e2e2;
`;
const ColumInput = styled.td`
  text-align: center;
  padding: 10px 0;
    &:first-child{
        border-radius: 10px 0 0 10px;
    }
    &:last-child{
        border-radius: 0 10px 10px 0;
    }
`;
