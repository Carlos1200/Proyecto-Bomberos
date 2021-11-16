import React,{useEffect,useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt,faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { AnimatePresence } from "framer-motion";
import Api from '../../Api/Api';
import { UseDatos } from "../../hooks/UseDatos";
import { EditarEmpleadoModal } from "../modal/EditarEmpleadoModal";
import { Eliminar } from "../modal/Eliminar";


export const TablaEmpleado = ({consultar}) => {

  const [visible, setVisible] = useState(false);
  const [visibleBorrar, setVisibleBorrar] = useState(false);
  const [empleadoBorrar, setEmpleadoBorrar] = useState(null);
  const [empleado, setEmpleado] = useState();

  const [datos,cargando,setConsultarEmpleados] = UseDatos('empleado');
  useEffect(()=>{
    if(consultar){
      setConsultarEmpleados(consultar);
    }
    // eslint-disable-next-line
  },[consultar])

  const eliminarEmpleado=async()=>{
    try {
      const formData=new FormData();
      formData.append("idEmpleado",empleadoBorrar);
      await Api.post('/empleadoDelete',formData);
      setConsultarEmpleados(true);
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
              <ColumnTitle>Nombre del Empleado</ColumnTitle>
              <ColumnTitle>Ubicación</ColumnTitle>
              <ColumnTitle>Plaza Nominal</ColumnTitle>
              <ColumnTitle>Detalles</ColumnTitle>
              <ColumnTitle>Editar</ColumnTitle>
              <ColumnTitle>Borrar</ColumnTitle>
          </ColumTitleBox>
        </HeadTop>
        <Body>
            {datos.map((empleado,index)=>(
              <ColumInputBox key={index}>
                <ColumInput>{empleado.nombres} {empleado.apellidos}</ColumInput>
                <ColumInput>{empleado.nombreUbicacion}</ColumInput>
                <ColumInput>{empleado.nombrePlaza}</ColumInput>
            <ColumInput>
            <BtnInfo >
                <FontAwesomeIcon
                  icon={faInfoCircle}
                  style={{ fontSize: "23px", color: "#3896D3" }}
                />
              </BtnInfo>
              </ColumInput>
              <ColumInput>
            <BtnEditar onClick={()=>{
                setVisible(true);
                setEmpleado(empleado.idEmpleado);
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
                setEmpleadoBorrar(empleado.idEmpleado)
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
            {visible&&<EditarEmpleadoModal handleClose={()=>setVisible(false)} empleadoId={empleado} consultarEmpleados={setConsultarEmpleados}/>}
      </AnimatePresence>
      <AnimatePresence
            initial={false}
            exitBeforeEnter={true}
            onExitComplete={() => null}>
            {visibleBorrar&&<Eliminar handleClose={()=>setVisibleBorrar(false)}  eliminar={eliminarEmpleado}/>}
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
  height: 60vh;
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

const BtnInfo=styled.button`
  border: 0;
  background-color: transparent;
  cursor: pointer;
`
