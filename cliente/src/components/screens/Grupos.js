import React from 'react'
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faSearch } from '@fortawesome/free-solid-svg-icons';
import { Menu } from './../Menu';
import {Background} from '../Background';
import { TablaGroup } from '../tablas/TablaGroup';



export const Grupos = () => {
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
            <TablaGroup/>
          </ReportsBox>
        </Background>
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