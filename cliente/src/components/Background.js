import React,{useContext} from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire,faHardHat} from '@fortawesome/free-solid-svg-icons';
import {AuthContext} from '../context/Auth/AuthContext';

export const Background = ({children,titulo}) => {

    const {NombreUsuario,tipoUsuario} = useContext(AuthContext);

    return (
        <Box>
          <Top>
            <TitleForm>{titulo}</TitleForm>
            <ActualUser>
              <FontAwesomeIcon
                icon={tipoUsuario==="Admin"?faFire:faHardHat}
                style={{ fontSize: "23px", color: "FF0000" }}
              />
              <UserTitle>{NombreUsuario}</UserTitle>
            </ActualUser>
          </Top>
          {children}
        </Box>
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