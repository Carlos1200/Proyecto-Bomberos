import React, { useState,useContext } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import Logo from "../../assets/LogoBomberos.png";
import error from "../../assets/error.png";
import Background from "../../assets/login.jpg";
import Api from '../../Api/Api';
import { AuthContext } from "../../context/Auth/AuthContext"; 


const schema=yup.object({
  usuario:yup.string().required("El usuario no debe ir vacio"),
  contra:yup.string().required("La contraseña no debe ir vacio"),
});

export const Login = () => {

  let history = useHistory();
  const {inicioSesion} = useContext(AuthContext);
  const [errores, setErrores] = useState();

  const { register, handleSubmit,formState: { errors } } = useForm({
    resolver:yupResolver(schema)
  });
  
  const onSubmit=async(datos)=>{
    const {usuario,contra}=datos;

    const formData=new FormData();
    formData.append('NombreUsuario',usuario);
    formData.append('contra',contra);

    try {
      const {data}=await Api.post('/login',formData,{withCredentials:true});

      const {NombreUsuario,idUsuario,login,tipoUsuario}=data;

      inicioSesion(idUsuario,NombreUsuario,tipoUsuario,login);

      if(data.login){
        history.push("/usuarios");
      }
    } catch (error) {
      console.log({error});
      setErrores(error.response.data);
      setTimeout(() => {
        setErrores(null);
      }, 3000);
    }
  }

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
            <FormLogin onSubmit={handleSubmit(onSubmit)}>
              <DivLogin>
                <div>
                  <Textbox
                    {...register("usuario")}
                    
                    placeholder='Nombre de Usuario'
                  />
                  {errors.usuario&& <TextError>{errors.usuario.message}</TextError>}
                </div>
                <div>
                  <Textbox
                    {...register("contra")}
                    placeholder='Contraseña'
                    type="password"
                  />
                 {errors.contra&& <TextError>{errors.contra.message}</TextError>}
                </div>
              </DivLogin>
              {errores ? errores.map((texto,index)=>(
                  <ErrorLogin key={index}>
                    <ErrorIco src={error} />

                    <Lberror>
                      {texto}
                    </Lberror>
                </ErrorLogin>
              )) : null}
              <br></br>
              <BtnLogin type='submit' id='btnLogin' name='btnLogin'>
                Ingresar
              </BtnLogin>
            </FormLogin>
          </div>
        </LoginBox>
      </Container>
    </>
  );
};

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

const DivLogin=styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 6mm;
`;

const Textbox = styled.input`
  background-color: #343f56;
  border: none;
  border-bottom: 2px solid #fff;
  margin: 20px;
  height: 32px;
  padding-left: 20px;
  font-size: 5mm;
  color: #fff;
  margin-top: 10px;
  margin-bottom: 15px;

`;

const TextError=styled.p`
  margin-top: -13px;
  text-align: center;
  color: #f39c12;
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

