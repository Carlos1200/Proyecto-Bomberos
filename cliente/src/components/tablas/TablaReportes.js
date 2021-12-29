import React,{useState,useContext} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderOpen, faTrashAlt,faCheck,faLink } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import env from 'react-dotenv'
import { ReportesContext } from "../../context/reportes/ReportesContext";

const BaseURL=env.BASE_URL;

export const TablaReportes = ({mostrarNotificacion}) => {

  const [visible, setVisible] = useState(false);
  const [visibleBorrar, setVisibleBorrar] = useState(false);
  const [reporteBorrar, setReporteBorrar] = useState(null);
  const [reporte, setReporte] = useState();

  const {cargando,reportes,setConsultar,error}=useContext(ReportesContext);

  return (
    <Contenedor>
      <ContenedorTabla>
      {!cargando&&(
        <Table>
        <HeadTop>
          <ColumTitleBox>
            <ColumnTitle>Jefe de Estacion</ColumnTitle>
            <ColumnTitle>Fecha del Reporte</ColumnTitle>
            <ColumnTitle>Autorizaciones</ColumnTitle>
            <ColumnTitle>Acceder</ColumnTitle>
            <ColumnTitle>Borrar</ColumnTitle>
            <ColumnTitle>Verificado</ColumnTitle>
          </ColumTitleBox>
        </HeadTop>
        <Body>
            {reportes.map((reporteCol,index)=>(
              <ColumInputBox key={index}>
                <ColumInput>{reporteCol.creadorJefe}</ColumInput>
                <ColumInput>{reporteCol.fechaCreado.split(" ")[0]}</ColumInput>
                <ColumInput>
                <a href={`${BaseURL}/pdf/VerPdf.php?id=${reporteCol.idAutorizaciones}`} target="_blank">
                  <FontAwesomeIcon
                    icon={faLink}
                    style={{ fontSize: "23px", color: "#0801BF" }}
                    />
                </a>

              </ColumInput>
              <ColumInput>
              <BtnAcceder onClick={()=>{
                  setVisible(true);
                  setReporte(reporteCol);
                }}>
                  <FontAwesomeIcon
                    icon={faFolderOpen}
                    style={{ fontSize: "23px", color: "0C9021" }}
                  />
                </BtnAcceder>
              </ColumInput>
              <ColumInput>
              <BtnEliminar onClick={()=>{
                  setVisibleBorrar(true)
                  setReporteBorrar(reporteCol.idReporte)
                }}>
                  <FontAwesomeIcon
                    icon={faTrashAlt}
                    style={{ fontSize: "23px", color: "FF0000" }}
                  />
                </BtnEliminar>
              </ColumInput>
              <ColumInput><FontAwesomeIcon
                    icon={faCheck}
                    style={{ fontSize: "23px", color: reporteCol.verificacion==="0"?"#FF0000":"#0C9021" }}
                  /></ColumInput>
                </ColumInputBox>
            ))}
        </Body>
      </Table>
      )}
      </ContenedorTabla>
      {/* <AnimatePresence
            initial={false}
            exitBeforeEnter={true}
            onExitComplete={() => null}>
            {visible&&<PlazaModal handleClose={()=>setVisible(false)} plaza={plaza} mostrarNotificacion={mostrarNotificacion}/>}
      </AnimatePresence>
      <AnimatePresence
            initial={false}
            exitBeforeEnter={true}
            onExitComplete={() => null}>
            {visibleBorrar&&<Eliminar handleClose={()=>setVisibleBorrar(false)}  eliminar={eliminarPlaza}/>}
      </AnimatePresence> */}
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

const BtnAcceder=styled.button`
  border: 0;
  background-color: transparent;
  cursor: pointer;
`
const BtnEliminar=styled.button`
  border: 0;
  background-color: transparent;
  cursor: pointer;
`
