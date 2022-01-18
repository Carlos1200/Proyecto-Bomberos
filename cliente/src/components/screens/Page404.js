import styled from "styled-components"
import Logo from '../../assets/LogoBomberos.png'

export const Page404 = () => {
    return (
        <Contenedor>
            <div>
                <LogoContainer>
                    <LogoImage src={Logo} />
                </LogoContainer>
                <Texto>Página no encontrada</Texto>
            </div>
        </Contenedor>
    )
}

const Contenedor=styled.div`
    height: 100vh;
    background-color: #343f56;
    display:flex;
    justify-content:center;
    align-items:center;
`;

const LogoContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const LogoImage = styled.img`
  border-radius: 320px;
  height: 230px;
  width: 230px;
  padding: 20px;
`;

const Texto = styled.h1`
    font-size: 2.5rem;
    color: #fff;
    font-weight: bold;
    text-align: center;
`;