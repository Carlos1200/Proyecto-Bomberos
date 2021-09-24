import React from 'react';
import './stylesheets/login.css';


import login from './imgs/login.jpg';
import logo from './imgs/logo.png';
import error from './imgs/error.png';

export const Login = () => {


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
