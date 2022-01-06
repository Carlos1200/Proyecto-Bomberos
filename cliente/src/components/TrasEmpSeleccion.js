import React,{useState,useEffect} from "react";
import Select from "react-select";
import styled from "styled-components";

export const TrasEmpSeleccion = ({empleado, traslEmplFormulario, posicion}) => {

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
              <div style={{display:"flex", justifyContent:'center'}}>
                <Nombres style={{marginRight:'1rem',fontSize:'1.5rem'}}>{traslEmpDetalle.nombres}</Nombres>
                <Nombres style={{fontSize:'1.5rem'}}>{traslEmpDetalle.apellidos}</Nombres>
                <ContenedorColumnas>
                  <div>
                    <ContenedorInfo>
                      <Nombres>
                        Plaza Anterior: <Span>{traslEmpDetalle.plazaAnterior}</Span>
                      </Nombres>
                      <Nombres>
                        Próxima Plaza: <Span>{traslEmpDetalle.plazaNueva}</Span>
                      </Nombres>
                      <Nombres>
                        Plaza Actual: <Span>{traslEmpDetalle.plazaActual}</Span>
                      </Nombres>
                    </ContenedorInfo>
                    <ContenedorInfo>
                      <Nombres>
                        Ubicación Anterior: <Span>{traslEmpDetalle.ubicacionAnterior}</Span>
                      </Nombres>
                      <Nombres>
                        Próxima Ubicación: <Span>{traslEmpDetalle.ubicacionNueva}</Span>
                      </Nombres>
                      <Nombres>
                        Ubicación Actual: <Span>{traslEmpDetalle.ubicacionActual}</Span>
                      </Nombres>
                    </ContenedorInfo>
                    <ContenedorInfo>
                      <Nombres>
                        Grupo Anterior: <Span>{traslEmpDetalle.grupoAnterior}</Span>
                      </Nombres>
                      <Nombres>
                        Próximo Grupo: <Span>{traslEmpDetalle.grupoAnterior}</Span>
                      </Nombres>
                      <Nombres>
                        Grupo Actual: <Span>{traslEmpDetalle.grupoActual}</Span>
                      </Nombres>
                    </ContenedorInfo>
                  </div>
                </ContenedorColumnas>
                <div>
                  <Nombres>Descripción</Nombres>
                  <Nombres>{traslEmpDetalle.descripcion}</Nombres>
                </div>
              </div>
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

const ContenedorColumnas = styled.div`
  display: grid;
  grid-template-columns:  70% 30%;
  padding: 1rem;
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

const Justificacion = styled.textarea`
  resize: none;
  overflow-y: auto;
  width: 100%;
  height: 6rem;
  &::-webkit-scrollbar {
    width: 12px; /* width of the entire scrollbar */
  }

  &::-webkit-scrollbar-track {
    background: #e2e2e2; /* color of the tracking area */
    border-radius: 2rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #343f56; /* color of the scroll thumb */
    border-radius: 20px; /* roundness of the scroll thumb */
    border: 3px solid #e2e2e2; /* creates padding around scroll thumb */
  }
`;

const Fecha=styled.input`
  margin-bottom: 1rem;
  appearance: none;
  border: 1px solid #CCCCCC;
  border-radius: .2rem;
  padding: .5rem 1rem;
`