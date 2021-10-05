import React,{useEffect,useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import Api from '../../Api/Api';
import env from 'react-dotenv'

const APIKEY=env.API_KEY;

export const TablaReportes = () => {

//   const [usuarioscol, setusuarios] = useState();
//   console.log(usuarioscol);
//   useEffect(()=>{
//     obtenerUsuarios();
//   },[]);

//   const obtenerUsuarios=async()=>{
//     const {data}=await Api.get(`/usuarios?token=${APIKEY}`);

//     setusuarios(data);
//   }

  return (
    <Contenedor>
      <Table>
        <HeadTop>
          <ColumTitleBox>
              <ColumnTitle>Jefe de Estacion</ColumnTitle>
              <ColumnTitle>Fecha de Creación <br/> del Reporte</ColumnTitle>
              <ColumnTitle>Minutos <br/> Verificados</ColumnTitle>
              <ColumnTitle>Acceder</ColumnTitle>
              <ColumnTitle>Borrar</ColumnTitle>
          </ColumTitleBox>
        </HeadTop>
        <tbody>
            {/* {usuarioscol.map((usuario,index)=>(
              <ColumInputBox key={index}>
                <ColumInput>{usuario.NombreUsuario}</ColumInput>
                <ColumInput>{usuario.tipoUsuario}</ColumInput>
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
            ))} */}
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
  padding: 5px 0;
    &:first-child{
        border-radius: 20px 0 0 20px;
    }
    &:last-child{
        border-radius: 0 20px 20px 0;
    }
`;
