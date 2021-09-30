import React from 'react'
import { Menu } from '../Menu'
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Tabla } from '../Tabla';

export const Reportes = () => {
    return (
      <Menu>
        <Box>
          <Top>
            <TitleForm>Administración de Reportes</TitleForm>
            <ActualUser>
              <FontAwesomeIcon
                icon={faFire}
                style={{ fontSize: "23px", color: "FF0000" }}
              />
              <UserTitle>Remberto Montes</UserTitle>
            </ActualUser>
          </Top>
          <ReportsBox>
            <FilterBox>
              <FontAwesomeIcon
                icon={faSearch}
                style={{ fontSize: "26px", color: "#000000" }}
              />
              <FilterTextBox>¿Desea un archivo en específico?</FilterTextBox>
              <BtnFilterSearch>Buscar</BtnFilterSearch>
            </FilterBox>
            <Tabla/>
          </ReportsBox>
        </Box>
      </Menu>
    );
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