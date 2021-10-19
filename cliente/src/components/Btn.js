import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export const Btn = ({ titulo, icono, size, redirect,onpress }) => {
  return (
    <Link to={redirect} style={{ textDecoration: "none" }}>
      <Boton style={{ fontSize: size ? "15px" : "18px" }} onClick={onpress}>
        <FontAwesomeIcon icon={icono} style={{ fontSize: "20px",marginLeft:'4rem',marginRight:'2rem' }} />
        {titulo}
      </Boton>
    </Link>
  );
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

  &:hover {
    transform: scale(1.02);
  }
`;

