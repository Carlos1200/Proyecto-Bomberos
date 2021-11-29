import React,{useContext, useState} from 'react'
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import toast, { Toaster } from 'react-hot-toast';
import { faSyncAlt} from '@fortawesome/free-solid-svg-icons';
import { AnimatePresence } from 'framer-motion';
import { Menu } from '../Menu'
import {TablaUsuario} from '../tablas/TablaUsuario';
import { Background } from '../Background';
import { UsuarioModal } from '../modal/UsuarioModal';
import { UsuariosContext } from '../../context/usuarios/UsuariosContext';
export const Usuarios = () => {

  const [visible, setVisible] = useState(false);
  const [inputBuscador, setInputBuscador] = useState('')
  const {buscador,setConsultar}=useContext(UsuariosContext);

  const mostrarNotificacion=(error=false)=>{
    if(error){
      toast.error("Ocurrió un error");
    }else{
      toast.success('Operación realizada correctamente');
    }
  }

    return (
      <Menu>
        <Background titulo="Administración de Usuarios" insertar={()=>setVisible(true)}>
          <Toaster position="top-right"/>
          <ReportsBox>
            <FilterBox>
              <FontAwesomeIcon
                onClick={()=>{
                  setConsultar(true);
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
            <TablaUsuario mostrarNotificacion={mostrarNotificacion}/>
            </ContenedorTabla>
          </ReportsBox>
          </Background>
          <AnimatePresence
            initial={false}
            exitBeforeEnter={true}
            onExitComplete={() => null}>
            {visible&&<UsuarioModal handleClose={()=>setVisible(false)} mostrarNotificacion={mostrarNotificacion} />}
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
  height: 60vh;
  &::-webkit-scrollbar {
  width: 12px;               /* width of the entire scrollbar */
}

  &::-webkit-scrollbar-track {
  background: #A0A0A0;        /* color of the tracking area */
  border-radius: 2rem;
}

  &::-webkit-scrollbar-thumb {
  background-color: #343F56;    /* color of the scroll thumb */
  border-radius: 20px;       /* roundness of the scroll thumb */
  border: 3px solid #A0A0A0;  /* creates padding around scroll thumb */
}
`