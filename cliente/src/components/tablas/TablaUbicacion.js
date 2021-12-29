import React,{useContext, useEffect, useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence } from "framer-motion";
import styled from "styled-components";
import {UbicacionModal} from '../modal/UbicacionModal'
import { Eliminar } from "../modal/Eliminar";
import Api from "../../Api/Api";
import { UbicacionesContext } from "../../context/ubicaciones/UbicacionesContext";


export const TablaUbicacion = ({mostrarNotificacion}) => {

  const [visible, setVisible] = useState(false);
  const [visibleBorrar, setVisibleBorrar] = useState(false);
  const [ubicacionBorrar, setUbicacionBorrar] = useState(null);
  const [ubicacion, setUbicacion] = useState();
  const {ubicaciones,setConsultar,cargando,error}=useContext(UbicacionesContext);

  
  const eliminarUbicacion=async()=>{
    try {
      const formData=new FormData();
      formData.append("idUbicacion",ubicacionBorrar);
      const resp=await Api.post('/ubicaciones/EliminarUbicacion.php',formData);
      console.log(resp);
      setConsultar(true);
      setVisibleBorrar(false);
      mostrarNotificacion()
    } catch (error) {
      mostrarNotificacion(false);
    }
  }

  useEffect(()=>{
    if(error){
      mostrarNotificacion(true)
    }
    // eslint-disable-next-line
  },[error])

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
            {ubicaciones.map((ubicacion,index)=>(
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
            {visible&&<UbicacionModal handleClose={()=>setVisible(false)} ubicacion={ubicacion} mostrarNotificacion={mostrarNotificacion}/>}
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
  width: 100%;
`

const Table = styled.table`
  border-collapse: separate;
  border-spacing: 0 10px;
  width: 100%;
  height: 100%;
  padding-right: 10px;
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

