import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimatePresence } from 'framer-motion';
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { trasladosState } from '../../atom/AtomTablas';
import { useBuscador } from '../../hooks/useBuscador';
import { getTrasladosFiltrados } from '../../services/trasladosServices';
import { Background } from '../Background';
import { Menu } from '../Menu';
import { PlazaModal } from '../modal/PlazaModal';
import { TablaTraslados } from '../tablas/TablaTraslados';


export const AdminTraslados = () => {
  const setTraslados=useSetRecoilState(trasladosState);
  const [visible, setVisible] = useState(false);
  const [consultar, setConsultar] = useState(false);
  const [inputBuscador, setInputBuscador] = useState('')
  const {buscador,reset}=useBuscador({
    promise:getTrasladosFiltrados,
    setState:setTraslados,
  })


  const mostrarNotificacion=(error=false)=>{
    if(error){
      toast.error("Ocurrió un error");
    }else{
      toast.success('Operación realizada correctamente');
    }
  }

    return (
      <Menu>
        <Background titulo="Administración de Traslados">
          <Toaster position="top-right"/>
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
                buscador(inputBuscador);
              }}>Buscar</BtnFilterSearch>
            </FilterBox>
            <ContenedorTabla>
              <TablaTraslados consultar={consultar} mostrarNotificacion={mostrarNotificacion}/>
            </ContenedorTabla>
          </ReportsBox>
        </Background>
        <AnimatePresence
            initial={false}
            exitBeforeEnter={true}
            onExitComplete={() => null}>
            {visible&&<PlazaModal handleClose={()=>setVisible(false)} consultarPlaza={setConsultar} mostrarNotificacion={mostrarNotificacion}/>}
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