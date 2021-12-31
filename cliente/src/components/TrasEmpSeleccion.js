import React,{useState,useEffect} from "react";
import Select from "react-select";
import styled from "styled-components";
import Api from "../Api/Api";

export const TrasEmpSeleccion = ({nombres, apellidos, plazaAnterior, plazaNueva, plazaActual, ubicacionAnterior, ubicacionNueva, ubicacionActual, grupoAnterior, grupoNuevo, grupoActual, descripcion, traslEmpFormulario,posicion}) => {

    const [traslEmpDetalle, setTraslEmpDetalle] = useState();
    const [cargando, setCargando] = useState(true);

    const obtenerDetallesTraslados = async() =>{

        try{
            const formData = formData();
            formData.append('idReporteHistorial',traslado.idReporteHistorial);
            
            const {data} = await Api.post('traslados/TraslEmpDetalle.php', formData);
            setTraslEmpDetalle(data[0]);
            const trasladoCompleto={
                ...data[0],
                nombres:data[0].nombres,
                apellidos:data[0].apellidos,
                plazaAnterior:data[0].plazaAnterior,
                plazaNueva:data[0].plazaNueva,
                plazaActual:data[0].plazaActual,
                ubicacionAnterior:data[0].ubicacionAnterior,
                ubicacionNueva:data[0].ubicacionNueva,
                ubicacionActual:data[0].ubicacionActual,
                grupoAnterior:data[0].grupoAnterior,
                grupoNuevo:data[0].grupoNuevo,
                descripcion:data[0].descripcion,
            }

            traslEmpFormulario.current[posicion] = trasladoCompleto;
            setCargando(false);

        } catch(error){
            console.log(error);
        }

    }

    useEffect(() => {
        obtenerDetallesTraslados();
        // eslint-disable-next-line
    }, [])

    return(
        <Contenedor>
            
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