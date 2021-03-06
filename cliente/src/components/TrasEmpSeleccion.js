import React,{useState,useEffect} from "react";
import styled from "styled-components";

export const TrasEmpSeleccion = ({ traslEmplFormulario, posicion}) => {

    const [traslEmpDetalle, setTraslEmpDetalle] = useState();
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
      setTraslEmpDetalle(traslEmplFormulario.current[posicion]);
      setCargando(false);
      // eslint-disable-next-line
    }, [])

    return(
        <Contenedor>
            {!cargando?(
              <>
              <Informacion>
                <InfoNombres>
                <Nombres style={{fontSize:'1.2rem', fontWeight:'normal'}}>Nombres: {traslEmpDetalle.nombres}</Nombres>
                <Nombres style={{fontSize:'1.2rem', fontWeight:'normal'}}> Apellidos: {traslEmpDetalle.apellidos}</Nombres>
                </InfoNombres>
                <ContenedorColumnas>
                  <div>
                    <ContenedorInfo>
                      <Nombres>
                        Plaza Anterior: <Span>{traslEmpDetalle.plazaAnterior}</Span>
                      </Nombres>
                      <Nombres>
                        Plaza Actual: <Span>{traslEmpDetalle.plazaActual}</Span>
                      </Nombres>
                      <Nombres>
                        Próxima Plaza: <Span>{traslEmpDetalle.plazaNueva}</Span>
                      </Nombres>
                    </ContenedorInfo>
                    <ContenedorInfo>
                      <Nombres>
                        Ubicación Anterior: <Span>{traslEmpDetalle.ubicacionAnterior}</Span>
                      </Nombres>
                      <Nombres>
                        Ubicación Actual: <Span>{traslEmpDetalle.ubicacionActual}</Span>
                      </Nombres>
                      <Nombres>
                        Próxima Ubicación: <Span>{traslEmpDetalle.ubicacionNueva}</Span>
                      </Nombres>
                    </ContenedorInfo>
                    <ContenedorInfo>
                      <Nombres>
                        Grupo Anterior: <Span>{traslEmpDetalle.grupoAnterior}</Span>
                      </Nombres>
                      <Nombres>
                        Grupo Actual: <Span>{traslEmpDetalle.grupoActual}</Span>
                      </Nombres>
                      <Nombres>
                        Próximo Grupo: <Span>{traslEmpDetalle.grupoNuevo}</Span>
                      </Nombres>
                    </ContenedorInfo>
                  </div>
                </ContenedorColumnas>
                <div>
                  <Nombres>Descripción</Nombres>
                  <Nombres>{traslEmpDetalle.descripcion}</Nombres>
                </div>
              </Informacion>
              </>
            ):null}
        </Contenedor>
    )

} 


const Contenedor = styled.div`
  border: 1px solid #000;
  border-radius: 1.2rem;
  margin: 0.5rem 1rem;
`;

const Informacion = styled.div`
  display:grid;
  grid-template-columns: 20% 55% 25%;
  grid-gap: .5rem;
 `
const InfoNombres = styled.div`
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const ContenedorColumnas = styled.div`
  display: grid;
`;

const Nombres = styled.p`
  font-size: 0.9rem;
  font-weight: bold;
  text-align: center;
`;

const Span = styled.span`
  color: #717171;
`;

const ContenedorInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  padding: 0 1rem;
`;