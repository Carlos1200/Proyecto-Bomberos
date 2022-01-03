import { useEffect, useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence } from "framer-motion";
import styled from "styled-components";
import {
  atom,
  useRecoilState,
} from 'recoil';
import { UsuarioModal } from "../modal/UsuarioModal";
import { Eliminar } from "../modal/Eliminar";
import { eliminarUsuarios, getUsuarios } from "../../services/usuariosServices";

export const usuariosState = atom({
  key: 'usuariosState',
  default: [],
});

export const TablaUsuario = ({mostrarNotificacion}) => {

  const [visible, setVisible] = useState(false);
  const [visibleBorrar, setVisibleBorrar] = useState(false);
  const [usuarioBorrar, setUsuarioBorrar] = useState(null);
  const [usuario, setUsuario] = useState();
  const [cargando, setCargando] = useState(true);
  const [usuarios, setUsuarios] = useRecoilState(usuariosState);


    const eliminarUsuario=async()=>{
        const formData=new FormData();
        formData.append("idUsuario",usuarioBorrar);
        eliminarUsuarios(formData)
        .then(()=>{
          setUsuarios((oldValue)=> oldValue.filter(usuario=>usuario.idUsuario!==usuarioBorrar));
          setVisibleBorrar(false);
          mostrarNotificacion();
        }).catch(err=>{
          mostrarNotificacion(true);
        });
    }

    useEffect(()=>{
      getUsuarios().then(res=>{
        setUsuarios(res);
      }).catch(err=>{
        mostrarNotificacion(true);
      }).finally(()=>{
        setCargando(false);
      });
    },[])

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
            {usuarios.map((usuario,index)=>(
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
            {visible&&<UsuarioModal handleClose={()=>setVisible(false)} usuario={usuario}  mostrarNotificacion={mostrarNotificacion}/>}
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
