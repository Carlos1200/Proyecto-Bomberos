import {useState} from 'react'
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import toast, { Toaster } from 'react-hot-toast';
import {  faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { AnimatePresence } from 'framer-motion';
import { useSetRecoilState } from 'recoil';
import { Menu } from '../Menu'
import {Background} from '../Background';
import { empleadosState, TablaEmpleado } from '../tablas/TablaEmpleado';
import { NuevoEmpleadoModal } from '../modal/NuevoEmpleadoModal';
import {useBuscador} from '../../hooks/useBuscador';
import { buscadorEmpleados } from '../../services/empleadosServices';


export const Empleados = () => {
  const setEmpleados=useSetRecoilState(empleadosState);
  const [visible, setVisible] = useState(false);
  const [inputBuscador, setInputBuscador] = useState('')

  const {buscador,reset}=useBuscador({
    promise:buscadorEmpleados,
    setState:setEmpleados,
  })

  const mostrarNotificacion=()=>{
    toast.success('Operación realizada correctamente');
  }

  const mostrarNotificacionError=(error)=>{
    toast.error(error);
  }

    return (
      <Menu>
        <Background titulo="Administración de Empleados" notificacion={mostrarNotificacion} insertar={()=>setVisible(true)} >
          <Toaster position="top-right" toastOptions={{style:{zIndex:9999}}} />
          <ReportsBox>
            <FilterBox>
            <FontAwesomeIcon
                onClick={()=>{
                  reset();
                  setInputBuscador('');
                }}
                icon={faSyncAlt}
                style={{ fontSize: "26px", color: "#000000",cursor:'pointer' }}
              />
              <FilterTextBox placeholder="¿Desea un archivo en específico?" value={inputBuscador} onChange={(e)=>setInputBuscador(e.target.value)}/>
              <BtnFilterSearch onClick={()=>{
                const formData=new FormData();
                formData.append('nombres',inputBuscador);
                buscador(formData);
              }}>Buscar</BtnFilterSearch>
            </FilterBox>
            <ContenedorTabla>

            <TablaEmpleado notificacion={mostrarNotificacion} notificacionError={mostrarNotificacionError} />
            </ContenedorTabla>
          </ReportsBox>
          </Background>
          <AnimatePresence
            initial={false}
            exitBeforeEnter={true}
            onExitComplete={() => null}>
            {visible&&<NuevoEmpleadoModal handleClose={()=>setVisible(false)} />}
        </AnimatePresence>
      </Menu>
    );
}

const ReportsBox = styled.div`
    background-color: #FFFFFF;
    flex: 1;
    border-radius: 20px;
    margin-top: 10px;
    margin-bottom: 30px;
    margin-left: 40px;
    margin-right: 40px;
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 8px;
    flex-direction: column;
`

const FilterBox = styled.div`
    flex-direction: row;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px;
    padding-left: 30px;
    padding-right: 30px;
    margin-top: 20px;
`

const FilterTextBox = styled.input`
    flex: 1;
    appearance: none;
    border: 0;
    padding: 10px 20px 5px 20px;
    margin-left: 50px;
    margin-right: 50px;
    /* text-align: center; */
    font-size: 18px;
    border-bottom: 1px solid #000;
    &:focus-visible{
      outline: 0;
    }
    &::-webkit-input-placeholder {
      text-align: center;
    }
`

const BtnFilterSearch = styled.button`
    text-align: center;
    border: 0;
    background-color: #E8E3E3;
    padding-top: 10px;
    padding-bottom: 12px;
    padding-right: 20px;
    padding-left: 20px;
    font-size: 18px;
    border-radius: 20px;
    &:hover{
      background-color: #a3a2a2;
    }
`
const ContenedorTabla=styled.div`
overflow-y: auto;
height: 60vh;
  &::-webkit-scrollbar {
  width: 12px;               /* width of the entire scrollbar */
}

  &::-webkit-scrollbar-track {
  background: #e2e2e2;        /* color of the tracking area */
  border-radius: 2rem;
}

  &::-webkit-scrollbar-thumb {
  background-color: #343F56;    /* color of the scroll thumb */
  border-radius: 20px;       /* roundness of the scroll thumb */
  border: 3px solid #e2e2e2;  /* creates padding around scroll thumb */
}
`