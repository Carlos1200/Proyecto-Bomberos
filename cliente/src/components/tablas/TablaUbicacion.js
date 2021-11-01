import React,{useEffect, useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence } from "framer-motion";
import styled from "styled-components";
import {UbicacionModal} from '../modal/UbicacionModal'
import { Eliminar } from "../modal/Eliminar";
import { UseDatos } from "../../hooks/UseDatos";
import Api from "../../Api/Api";


export const TablaUbicacion = ({consultar}) => {

  const [visible, setVisible] = useState(false);
  const [visibleBorrar, setVisibleBorrar] = useState(false);
  const [ubicacionBorrar, setUbicacionBorrar] = useState(null);
  const [ubicacion, setUbicacion] = useState();

  const [datos,cargando,setConsultarUsarios] = UseDatos('ubicacion');

  useEffect(()=>{
    if(consultar){
      setConsultarUsarios(consultar);
    }
    // eslint-disable-next-line
  },[consultar])
  
  const eliminarUbicacion=async()=>{
    try {
      const formData=new FormData();
      formData.append("idUbicacion",ubicacionBorrar);
      const resp=await Api.post('/ubicacionDelete',formData);
      console.log(resp);
      setConsultarUsarios(true);
      setVisibleBorrar(false);
    } catch (error) {
      console.log(error.response.data);
    }
  }

  return (
    <Contenedor>
      <ContenedorTabla>
      {!cargando&&(
        <Table>
        <HeadTop>
          <ColumTitleBox>
              <ColumnTitle>Nombre de las Ubicaciones</ColumnTitle>
              <ColumnTitle>Editar</ColumnTitle>
              <ColumnTitle>Borrar</ColumnTitle>
          </ColumTitleBox>
        </HeadTop>
        <Body>
            {datos.map((ubicacion,index)=>(
              <ColumInputBox key={index}>
                <ColumInput>{ubicacion.nombreUbicacion}</ColumInput>
                <ColumInput>
              <BtnEditar onClick={()=>{
                setVisible(true);
                setUbicacion(ubicacion);
              }}>
                <FontAwesomeIcon
                  icon={faEdit}
                  style={{ fontSize: "23px", color: "0C9021" }}
                />
              </BtnEditar>
            </ColumInput>
            <ColumInput>
              <BtnEliminar onClick={()=>{
                setVisibleBorrar(true)
                setUbicacionBorrar(ubicacion.idUbicacion)
              }}>
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
      )}
      </ContenedorTabla>
      <AnimatePresence
            initial={false}
            exitBeforeEnter={true}
            onExitComplete={() => null}>
            {visible&&<UbicacionModal handleClose={()=>setVisible(false)} ubicacion={ubicacion} consultarUbicacion={setConsultarUsarios}/>}
      </AnimatePresence>
      <AnimatePresence
            initial={false}
            exitBeforeEnter={true}
            onExitComplete={() => null}>
            {visibleBorrar&&<Eliminar handleClose={()=>setVisibleBorrar(false)}  eliminar={eliminarUbicacion}/>}
      </AnimatePresence>
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
  max-height: 26rem;
  &::-webkit-scrollbar {
    display: none;
  }
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

const BtnEditar=styled.button`
  border: 0;
  background-color: transparent;
  cursor: pointer;
`
const BtnEliminar=styled.button`
  border: 0;
  background-color: transparent;
  cursor: pointer;
`

