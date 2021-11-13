import React,{useState} from 'react'
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faSearch,faPlus } from '@fortawesome/free-solid-svg-icons';
import { motion,AnimatePresence } from 'framer-motion';
import { Menu } from './../Menu';
import {Background} from '../Background';
import { TablaGroup } from '../tablas/TablaGroup';
import { GrupoModal } from '../modal/GrupoModal';



export const Grupos = () => {
  
  const [visible, setVisible] = useState(false);
  const [consultar, setConsultar] = useState(false);
    return (
      <Menu>
        <Background titulo="Administración de Grupos">
          <ReportsBox>
            <FilterBox>
              <FontAwesomeIcon
                icon={faSearch}
                style={{ fontSize: "26px", color: "#000000" }}
              />
              <FilterTextBox>¿Desea un archivo en específico?</FilterTextBox>
              <BtnFilterSearch>Buscar</BtnFilterSearch>
            </FilterBox>
            <TablaGroup consultar={consultar}/>
            <motion.button
            onClick={()=>{
              setVisible(true);
            }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                borderRadius:'100%',
                backgroundColor:'#67BB6F',
                padding: '20px',
                cursor: 'pointer',
                position: 'absolute',
                bottom: 20,
                right: 15
              }}
            >
              <FontAwesomeIcon
                icon={faPlus}
                style={{ fontSize: "30px", color: "#000000" }}
              />
            </motion.button>
          </ReportsBox>
        </Background>
        <AnimatePresence
            initial={false}
            exitBeforeEnter={true}
            onExitComplete={() => null}>
            {visible&&<GrupoModal handleClose={()=>setVisible(false)} consultarGrupo={setConsultar}/>}
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

const FilterTextBox = styled.div`
    flex: 1;
    padding-top: 10px;
    padding-bottom: 5px;
    margin-left: 50px;
    margin-right: 50px;
    text-align: center;
    font-size: 18px;
    border-bottom: 1px solid #000;
`

const BtnFilterSearch = styled.div`
    text-align: center;
    background-color: #E8E3E3;
    padding-top: 10px;
    padding-bottom: 12px;
    padding-right: 20px;
    padding-left: 20px;
    font-size: 18px;
    border-radius: 20px;
`
