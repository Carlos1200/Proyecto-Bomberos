import {useEffect,useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { atom, useRecoilState } from "recoil";
import { Eliminar } from "../modal/Eliminar";
import { GrupoModal } from "../modal/GrupoModal";
import { eliminarGrupos, getGrupos } from "../../services/gruposServices";
import { grupoState } from "../../atom/AtomTablas";


export const TablaGroup = ({mostrarNotificacion}) => {

  const [grupos, setGrupos] = useRecoilState(grupoState);
  const [cargando, setCargando] = useState(true)
  const [grupo, setGrupo] = useState();
  const [visible, setVisible] = useState(false);
  const [visibleBorrar, setVisibleBorrar] = useState(false);
  const [grupoBorrar, setGrupoBorrar] = useState(null);



  const eliminarGrupo=async()=>{
    const formData=new FormData();
    formData.append("idGrupo",grupoBorrar);
    eliminarGrupos(formData).then(()=>{
      setGrupos((oldValue)=> oldValue.filter(grupo=>grupo.idGrupo!==grupoBorrar));
      setVisibleBorrar(false);
      mostrarNotificacion();
    }).catch(err=>{
      mostrarNotificacion(true);
    });
  
  }

  useEffect(()=>{
    getGrupos().then(res=>{
      setGrupos(res);
    }).catch(err=>{
      mostrarNotificacion(true);
    }).finally(()=>{
      setCargando(false);
    })
  },[])

  return (
    <Contenedor>
      <ContenedorTabla>
      {!cargando&&(
        <Table>
        <HeadTop>
          <ColumTitleBox>
              <ColumnTitle>Nombre del Grupo</ColumnTitle>
              <ColumnTitle>Editar</ColumnTitle>
              <ColumnTitle>Borrar</ColumnTitle>
          </ColumTitleBox>
        </HeadTop>
        <Body>
            {grupos.map((grupo,index)=>(
              <ColumInputBox key={index}>
                <ColumInput>{grupo.nombreGrupo}</ColumInput>
            <ColumInput>
            <BtnEditar onClick={()=>{
              setGrupo(grupo)
              setVisible(true);
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
              setGrupoBorrar(grupo.idGrupo)
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
            {visible&&<GrupoModal handleClose={()=>setVisible(false)} grupo={grupo} mostrarNotificacion={mostrarNotificacion}/>}
      </AnimatePresence>
      <AnimatePresence
            initial={false}
            exitBeforeEnter={true}
            onExitComplete={() => null}>
            {visibleBorrar&&<Eliminar handleClose={()=>setVisibleBorrar(false)}  eliminar={eliminarGrupo}/>}
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
