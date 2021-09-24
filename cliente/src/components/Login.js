import React from 'react';
import './stylesheets/login.css';
import styled from "styled-components";

import login from './imgs/login.jpg';
import logo from './imgs/logo.png';
import error from './imgs/error.png';

const Contenedor=styled.div`
    display:flex;
    flex-direction: row;
    align-items: center;
    background-color: #000;
`;

const Image=styled.img`
    height: 100%;
    width: 100%;
`;

const LoginBox=styled.div`
    display: flex;
    flex-direction: column;
    background-color: #343F56;
    justify-content: center;
    align-items: center;
`;

const Logo=styled.img`
    border-radius: 320px;
    width:100%;
    max-width: 175px ;
`;

const TitleLogin=styled.div`
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    color:#FFF;
    padding: 10px;
`

export const Login = () => {


    return (
        <Contenedor>
            <div>
                <Image src={login}/>
            </div>
            <LoginBox>
                <div>
                    <Logo src={logo}/>
                </div>
                <TitleLogin>
                    <h1>Inicio de Sesion</h1>
                </TitleLogin>
                <div>
                    <form className="formLogin">
                        <div className="formLogin">
                            <input type="text" id="user" name="user" placeholder="Nombre de Usuario" className="textbox"/>
                            <input type="text" id="user" name="user" placeholder="Contraseña" className="textbox" />
                        </div>
                        <div className="errorLogin">
                            <img src={error} className="errorIco"/>
                            <label className="lberror">Se ha equivocado en escribir su usuario o contraseña</label>
                        </div>
                        <button type="button" id="btnLogin" name="btnLogin" className="btnLogin">Ingresar</button>
                        <button type="button" id="btnForgot" name="btnForgot" className="btnForgot">¿Olvidó su contraseña?</button>
                    </form>
                </div>
            </LoginBox>
        </Contenedor>
    )
}
