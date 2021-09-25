import { faFileExcel } from '@fortawesome/free-solid-svg-icons';
import React from 'react'
import { Menu } from './../Menu'
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire, faSearch, faCheck, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

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

const ColumnTitlesBox = styled.div`
    text-align: center;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 20px;
    padding-top: 5px;
`
const ColumnTitle = styled.div`
    font-size: 18px;
    font-weight: bold;
`

const RowBoxContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 20px;
    margin-left: 20px;
`

const RowBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    flex:1;
    border-radius: 20px;
    font-size: 17px;
    background-color: #E2E2E2;
    margin-top: 8px;
    padding-top: 6px;
    padding-bottom: 6px;
`
const TextName = styled.div`
    color: #000;
`
const DateCreated = styled.div`
    color: grey;
`
const BtnAgregarNuevo = styled.div`
    margin-top: 30px;
    background-color: #67BB6F;
    border-radius: 20px;
    font-size: 18px;
    text-align: center;
    padding-right: 10px;
    padding-left: 10px;
    padding: 10px;
    width: 240px;
    margin-left: 30px;
`

export const Plazas = () => {
    return (
      <Menu>
        <Box>
          <Top>
            <TitleForm>Administración de Plazas</TitleForm>
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
            <ColumnTitlesBox>
              <ColumnTitle>Jefe de Estacion</ColumnTitle>
              <ColumnTitle>
                Fecha de Creación
                <br />
                del Reporte
              </ColumnTitle>
              <ColumnTitle>
                Minutos
                <br />
                Verificados
              </ColumnTitle>
              <ColumnTitle>Acceder</ColumnTitle>
              <ColumnTitle>Borrar</ColumnTitle>
            </ColumnTitlesBox>
            <RowBoxContainer>
              <RowBox>
                <TextName>Diego Abrego</TextName>
                <DateCreated>Octubre 2020</DateCreated>
                <FontAwesomeIcon
                  icon={faCheck}
                  style={{ fontSize: "23px", color: "FF0000" }}
                />
                <FontAwesomeIcon
                  icon={faEdit}
                  style={{ fontSize: "23px", color: "0C9021" }}
                />
                <FontAwesomeIcon
                  icon={faTrashAlt}
                  style={{ fontSize: "23px", color: "FF0000" }}
                />
              </RowBox>
              <RowBox>
                <TextName>Rodrigo Gonzalez</TextName>
                <DateCreated>Octubre 2020</DateCreated>
                <FontAwesomeIcon
                  icon={faCheck}
                  style={{ fontSize: "23px", color: "FF0000" }}
                />
                <FontAwesomeIcon
                  icon={faEdit}
                  style={{ fontSize: "23px", color: "0C9021" }}
                />
                <FontAwesomeIcon
                  icon={faTrashAlt}
                  style={{ fontSize: "23px", color: "FF0000" }}
                />
              </RowBox>
            </RowBoxContainer>
            <BtnAgregarNuevo>Agregar Nueva Plaza</BtnAgregarNuevo>
          </ReportsBox>
        </Box>
      </Menu>
    );
}