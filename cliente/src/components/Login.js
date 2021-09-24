import React, { useEffect } from 'react';
import './stylesheets/login.css';
import Api from '../Api/Api';

import logo from './imgs/logo.png';
import error from './imgs/error.png';

export const Login = () => {

    useEffect(()=>{
        obtenerUsuarios();
    },[]);

    const obtenerUsuarios=async()=>{
        const resultado=await Api.get('/usuarios');
        console.log(resultado.data);
    }

    return (
        <>
        <div className="container">
            <div className="picture">
                
            </div>
            <div className="loginbox">
                <div>
                    <img src={logo} className="logo" />
                </div>
                <div className="titleLogin">
                    <label>Cuerpo de Bomberos</label><br/>
                    <label>Inicio de Sesion</label>
                </div>
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
                        <br></br>
                        <button type="button" id="btnLogin" name="btnLogin" className="btnLogin">Ingresar</button>
                        
                        
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}