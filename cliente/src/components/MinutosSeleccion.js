import React,{useState,useEffect} from "react";
import Select from "react-select";
import styled from "styled-components";
import Api from "../Api/Api";

export const MinutosSeleccion = ({empleado,minutosFormulario}) => {

    const [empleadoDetalle, setEmpleadoDetalle] = useState();
    const [cargando, setCargando] = useState(true);

    const obtenerDetalles=async()=>{

        const date = new Date();
        const fecha = date.toISOString().slice(0, 10);
        setFechaInput(fecha);
            try {
                const formData = new FormData();
                formData.append('idEmpleado',empleado.idEmpleado);

                const {data} = await Api.post('empleado', formData);
                setEmpleadoDetalle (data[0]);
                const empleadoCompleto={
                    ...data[0],
                    idUbicacion:ubicaciones.find(ubicacion=>ubicacion.nombreUbicacion===data[0].nombreUbicacion).idUbicacion,
                    idPlaza:plazas.find(plaza=>plaza.nombrePlaza===data[0].nombrePlaza).idPlaza,
                    minutosDiurnos:'0',
                    minutosNocturnos:'0'
                }

                minutosFormulario.current[posicion]=empleadoCompleto;
                setCargando(false);
            } catch (error) {
                console.log(error);
            }
    }

    useEffect(()=>{
        obtenerDetalles();
    },[])

    return (
        <Contenedor>
        {!cargando?(
            <>
        <div style={{display:"flex", justifyContent:'center'}}>
            <Nombres style={{marginRight:'1rem',fontSize:'1.5rem'}}>{empleadoDetalle.nombres}</Nombres>
            <Nombres style={{fontSize:'1.5rem'}}>{empleadoDetalle.apellidos}</Nombres>
        </div>
        <ContenedorColumnas>
      <div>
        <ContenedorInfo>
          <Nombres>
            Ubicación: <Span>{empleadoDetalle.nombreUbicacion}</Span>
          </Nombres>
          <Nombres>
            Plaza Nominal: <Span>{empleadoDetalle.nombrePlaza}</Span>
          </Nombres>
        </ContenedorInfo>
        <ContenedorInfo>
          <div>
            <Nombres>Minutos Diurnos</Nombres>
            <Textbox  {...register("minutosDiurnos")} type="number" pattern="[0-9]" defaultValue={0}
            onChange={(value)=>{
                empleadosFormulario.current[posicion].minutosDiurnos=e.target.value;
            }}
            />
          </div>
          <div>
            <Nombres>Minutos Nocturnos</Nombres>
            <Textbox  {...register("minutosNocturnos")} type="number" pattern="[0-9]" defaultValue={0}
            onChange={(value)=>{
                empleadosFormulario.current[posicion].minutosDiurnos=e.target.value;
            }}
            />
          </div>
        </ContenedorInfo>
      </div>
      </ContenedorColumnas>
      </>
        ):null}
    </Contenedor>
    );
};

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