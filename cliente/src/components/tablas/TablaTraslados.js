import React,{useContext,useEffect,useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderOpen, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { AnimatePresence } from "framer-motion";
import Api from '../../Api/Api';
import { PlazaModal } from "../modal/PlazaModal";
import { Eliminar } from "../modal/Eliminar";
import { PlazasContext } from "../../context/plazas/PlazasContext";


export const TablaTraslados = ({mostrarNotificacion}) => {

  const [acceder, setAcceder] = useState(false); //Boton Acceder
  const [visibleBorrar, setVisibleBorrar] = useState(false); //Confirmacion del Boton Borrar
  const [trasladoBorrar, setTrasladoBorrar] = useState(null);  //Id del traslado a Borrar
  const [traslado, setTraslado] = useState();

  //const {cargando,traslados,error}= useContext(TrasladosContext);
  const [traslados, setTraslados] = useState();
  const [cargando, setCargando] = useState(true);

  const ObtenerTraslados = async () =>{
      try{
        const {data} = await Api.get('/traslados/ObtenerTraslados.php');
        setTraslados(data);

        setCargando(false);

      } catch(error){
        setCargando(false);
        mostrarNotificacion(true);
      }
  }

  const eliminarTraslados = async() => {
    try {
      const formData=new FormData();
      formData.append("idTraslado",trasladoBorrar);
      await Api.post('/traslados/EliminarTraslados.php',formData);
      //setConsultar(true);
      setVisibleBorrar(false);
      mostrarNotificacion()
    } catch (error) {
      mostrarNotificacion(true)
    }
  }

  useEffect(()=>{
    ObtenerTraslados();
  },[])


  return (
    <Contenedor>
      <ContenedorTabla>
      {!cargando&&(
        <Table>
        <HeadTop>
          <ColumTitleBox>
            <ColumnTitle>Titulo del Traslado</ColumnTitle>
            <ColumnTitle>Fecha de Creación</ColumnTitle>
            <ColumnTitle>Acceder</ColumnTitle>
            <ColumnTitle>Borrar</ColumnTitle>
          </ColumTitleBox>
        </HeadTop>
        <Body>
            {traslados.map((traslado,index)=>(
              <ColumInputBox key={index}>
                <ColumInput>{traslado.tituloHistorial}</ColumInput>
                <ColumInput>{traslado.fechaCreacion}</ColumInput>
                <ColumInput>
                <BtnEditar onClick={()=>{
                    setAcceder(true);
                    setTraslado(traslado);
                }}>
                <FontAwesomeIcon
                  icon={faFolderOpen}
                  style={{ fontSize: "23px", color: "0C9021" }}
                />
              </BtnEditar>
            </ColumInput>
            <ColumInput>
            <BtnEliminar onClick={()=>{
                setVisibleBorrar(true)
                setTrasladoBorrar(traslado.idHistorialTraslados)
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
      {/*<AnimatePresence
            initial={false}
            exitBeforeEnter={true}
            onExitComplete={() => null}>
            {visible&&<PlazaModal handleClose={()=>setVisible(false)} plaza={plaza} mostrarNotificacion={mostrarNotificacion}/>}
      </AnimatePresence>*/}
      <AnimatePresence
            initial={false}
            exitBeforeEnter={true}
            onExitComplete={() => null}>
            {visibleBorrar&&<Eliminar handleClose={()=>setVisibleBorrar(false)}  eliminar={eliminarTraslados}/>}
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
