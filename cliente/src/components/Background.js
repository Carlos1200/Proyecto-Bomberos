import React,{useContext,useState} from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire,faHardHat,faFileExcel} from '@fortawesome/free-solid-svg-icons';
import { AnimatePresence } from "framer-motion";
import {AuthContext} from '../context/Auth/AuthContext';
import { ArchivoEmpleadoModal } from './modal/ArchivoEmpleadoModal';

export const Background = ({children,titulo,setConsultar}) => {

    const {NombreUsuario,tipoUsuario} = useContext(AuthContext);
    
    const [visible, setVisible] = useState(false)

    return (
      <>
        <Box>
          <Top>
            <TitleForm>{titulo}</TitleForm>
            {titulo==="Administración de Empleados"?(
              <ExcelBtn type="button" onClick={()=>setVisible(true)} >
                <ExcelText>Importar Excel</ExcelText>
                <FontAwesomeIcon
                  icon={faFileExcel}
                  style={{ fontSize: "23px", color: "1F6E43" }}
                /> 
              </ExcelBtn>
            ):null}
            <ActualUser>
              <FontAwesomeIcon
                icon={tipoUsuario==="Administrador"?faFire:faHardHat}
                style={{ fontSize: "23px", color: "FF0000" }}
              />
              <UserTitle>{NombreUsuario}</UserTitle>
            </ActualUser>
          </Top>
          {children}
        </Box>
        <AnimatePresence
            initial={false}
            exitBeforeEnter={true}
            onExitComplete={() => null}>
            {visible&&<ArchivoEmpleadoModal handleClose={()=>setVisible(false)} setConsultar={setConsultar}/>}
        </AnimatePresence>
      </>
    )
}
const Box = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    background-color: #A0A0A0;
    flex-direction: column;
`
const Top = styled.div`
    height: 70px;
    text-align: center;
    font-size: 22px;
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
    margin-bottom: 20px;
`
const TitleForm = styled.div`
    color: white;
    background-color: #343F56;
    margin-left: 50px;
    padding: 18px;
    border-radius: 20px;
    margin-top: 10px;
    margin-bottom: 10px;
    flex-direction: row;
`
const ActualUser = styled.div`
    padding: 18px;
    background-color: #FFFFFF;
    border-radius: 20px;
    display: flex;
    flex-direction: row;
    margin-right: 50px;
    margin-top: 10px;
    margin-bottom: 10px;
`

const UserTitle = styled.div`
    color: #343F56;
    margin-left: 20px;
`

const ExcelBtn=styled.button`
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #fff;
    border-radius: 1rem;
    padding: 0 1rem;
    border: 0;
    transition: background-color .3s ease-in-out;
    &:hover{
      background-color: rgba(255,255,255,0.4);

    }
`

const ExcelText=styled.p`
  color: #343F56;
  margin-right: .7rem;
`