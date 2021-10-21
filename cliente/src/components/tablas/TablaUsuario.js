import React,{ useEffect, useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { UsuarioModal } from "../modal/UsuarioModal";
import { UseDatos } from "../../hooks/UseDatos";
import { Eliminar } from "../modal/Eliminar";
import Api from "../../Api/Api";


export const TablaUsuario = ({consultar}) => {

  const [visible, setVisible] = useState(false);
  const [visibleBorrar, setVisibleBorrar] = useState(false);
  const [usuarioBorrar, setUsuarioBorrar] = useState(null);
  const [usuario, setUsuario] = useState();
 
  const {datos,cargando,setConsultarUsarios} = UseDatos('usuarios');

  useEffect(()=>{
    if(consultar){
      setConsultarUsarios(consultar);
    }
  },[consultar])

    const eliminarUsuario=async()=>{
      try {
        const formData=new FormData();
        formData.append("idUsuario",usuarioBorrar);
        const resp=await Api.post('/usuariosDelete',formData);
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
              <ColumnTitle>Nombre del Usuario</ColumnTitle>
              <ColumnTitle>Tipo de Usuario</ColumnTitle>
              <ColumnTitle>Ubicación</ColumnTitle>
              <ColumnTitle>Editar</ColumnTitle>
              <ColumnTitle>Borrar</ColumnTitle>
          </ColumTitleBox>
        </HeadTop>
        <Body>
            {datos.map((usuario,index)=>(
              <ColumInputBox key={index}>
                <ColumInput>{usuario.NombreUsuario}</ColumInput>
                <ColumInput>{usuario.tipoUsuario}</ColumInput>
                <ColumInput>{usuario.UbicacionUsuario}</ColumInput>
            <ColumInput>
              <BtnEditar onClick={()=>{
                setVisible(true);
                setUsuario(usuario);
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
                setUsuarioBorrar(usuario.idUsuario)
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
            {visible&&<UsuarioModal handleClose={()=>setVisible(false)} usuario={usuario} consultarUsuarios={setConsultarUsarios}/>}
      </AnimatePresence>
      <AnimatePresence
            initial={false}
            exitBeforeEnter={true}
            onExitComplete={() => null}>
            {visibleBorrar&&<Eliminar handleClose={()=>setVisibleBorrar(false)}  eliminar={eliminarUsuario}/>}
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
  max-height: 100%;
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
  padding: 7px 0;
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
