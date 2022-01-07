import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Icon=({className,icono })=>(<FontAwesomeIcon className={className} icon={icono}  />)

export const Btn = ({ titulo, icono, size, redirect,onpress,disable=false }) => {



  return redirect?(
    <Link to={redirect} style={{ textDecoration: "none" }}>
      <Boton style={{ fontSize: size ? "15px" : "18px" }} onClick={onpress} disabled={disable}>
        <StyledIcon icono={icono}/>
        <p>{titulo}</p>
      </Boton>
    </Link>
  ):(
    <Boton style={{ fontSize: size ? "15px" : "18px" }} onClick={onpress} disabled={disable}>
        <StyledIcon icono={icono}/>
        <p>{titulo}</p>
      </Boton>
  )
};

const Boton = styled.button`
  width: 100%;
  border: 0;
  border-bottom: 2px solid rgba(255, 255, 255, 0.8);
  background-color: transparent;
  color: white;
  font-size: 18px;
  padding: 15px 0;
  display: flex;
  justify-content: flex-start;
  transition: background-color .3s ease-in-out;
  &:hover {
    background-color: #222938;
  }
  p{
    margin:0
  }
  @media (max-width: 768px) {
    flex-shrink: 1;
    justify-content: flex-end;
    align-items: center;
    p{
      display: none;
    }
  }
  `;

  const StyledIcon=styled(Icon)`
  font-size:20px;
  margin-left:4rem;
  margin-right:2rem;
  @media (max-width: 768px) {
    margin-right:1rem;
  }
  `