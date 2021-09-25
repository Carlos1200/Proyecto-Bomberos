import React, { useEffect } from "react";
import styled from "styled-components";
import Logo from "../../assets/LogoBomberos.png";
import error from "../../assets/error.png";
import Background from "../../assets/login.jpg";

const Container = styled.div`
  display: flex;
`;
const Picture = styled.div`
  background: url(${Background});
  height: 100vh;
  width: 50%;
  background-size: cover;
  background-position: center;
`;
const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #343f56;
  justify-content: center;
  align-items: center;
  font-family: sans-serif;
  width: 50%;
  flex: 1;
`;
const LogoImage = styled.img`
  border-radius: 320px;
  height: 230px;
  width: 230px;
  padding: 20px;
`;

const TitleLogin = styled.div`
  font-size: 40px;
  font-weight: bold;
  text-align: center;
  color: #fff;
  padding: 2px;
`;

const FormLogin = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 6mm;
`;

const Textbox = styled.input`
  background-color: #343f56;
  border: none;
  border-bottom: 2px solid#fff;
  margin: 20px;
  height: 32px;
  padding-left: 20px;
  font-size: 5mm;

  margin-top: 10px;
  margin-bottom: 15px;

  &:focus {
    border: 3px solid #555;
  }
`;

const BtnLogin = styled.button`
  background-color: #4c53af; /* Green */
  border: none;
  color: white;
  padding: 15px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 18px;
  border-radius: 12px;
  transition-duration: 0.4s;

  &:hover {
    background-color: #e9750b; /* Green */
    color: white;
  }
`;

const BtnForgot = styled.button`
  background-color: #343f56;
  border-width: 0px;
  margin-top: 30px;
  margin-bottom: 60px;
  font-size: 6mm;
  color: #fff;
  font-weight: bold;
`;

const ErrorLogin = styled.div`
  align-items: center;
`;

const ErrorIco = styled.img`
  height: 25px;
  width: 25px;
  margin-right: 8px;
`;

const Lberror = styled.label`
  font-size: 16px;
  color: #f39c12;
  font-weight: bold;
`;

export const Login = () => {
  return (
    <>
      <Container>
        <Picture></Picture>
        <LoginBox>
          <div>
            <LogoImage src={Logo} />
          </div>
          <TitleLogin>
            <label>Cuerpo de Bomberos</label>
            <br />
            <label>Inicio de Sesion</label>
          </TitleLogin>
          <div>
            <FormLogin>
              <div className='formLogin'>
                <Textbox
                  type='text'
                  id='user'
                  name='user'
                  placeholder='Nombre de Usuario'
                />
                <Textbox
                  type='text'
                  id='user'
                  name='user'
                  placeholder='Contraseña'
                />
              </div>
              <ErrorLogin>
                <ErrorIco src={error} />
                <Lberror>
                  Se ha equivocado en escribir su usuario o contraseña
                </Lberror>
              </ErrorLogin>
              <br></br>
              <BtnLogin type='button' id='btnLogin' name='btnLogin'>
                Ingresar
              </BtnLogin>
            </FormLogin>
          </div>
        </LoginBox>
      </Container>
    </>
  );
};
