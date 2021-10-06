import React,{useEffect,useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import Api from '../../Api/Api';


export const TablaPlaza = () => {

  const [plazacol, setPlaza] = useState();
  useEffect(()=>{
    obtenerUsuarios();
  },[]);

  const obtenerUsuarios=async()=>{
    const {data}=await Api.get(`/plaza`);

    setPlaza(data);
  }

  return (
    <Contenedor>
      <ContenedorTabla>
      {plazacol&&(
        <Table>
        <HeadTop>
          <ColumTitleBox>
              <ColumnTitle>Nombre de las Plazas Nominales</ColumnTitle>
              <ColumnTitle>Editar</ColumnTitle>
              <ColumnTitle>Borrar</ColumnTitle>
          </ColumTitleBox>
        </HeadTop>
        <Body>
            {plazacol.map((plaza,index)=>(
              <ColumInputBox key={index}>
                <ColumInput>{plaza.nombrePlaza}</ColumInput>
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
            ))}
        </Body>
      </Table>
      )}
      </ContenedorTabla>
    </Contenedor>
  );
};

const Contenedor = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 20px;
`;

const ContenedorTabla=styled.div`
  overflow-y: auto;
  width: 100%;
  max-height: 28rem;
`

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
