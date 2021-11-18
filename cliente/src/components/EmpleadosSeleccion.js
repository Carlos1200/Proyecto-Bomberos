import React,{useState,useEffect} from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Select from "react-select";
import styled from "styled-components";
import Api from "../Api/Api";

export const EmpleadosSeleccion = ({ empleado, ubicaciones, plazas,grupos,posicion,empleadosFormulario,ultimo }) => {

    const [empleadoDetalle, setEmpleadoDetalle] = useState();
    const [cargando, setCargando] = useState(true);

    const [ubicacionesSelect, setUbicacionesSelect] = useState();
    const [plazasSelect, setPlazasSelect] = useState()
    const [gruposSelect, setGruposSelect ] = useState();
    const [fechaInput, setFechaInput] = useState()

    const obtenerDetalles=async()=>{

      const date=new Date();
      const fecha= date.toISOString().slice(0, 10);
      setFechaInput(fecha);
        try {
            const formData=new FormData();
            formData.append('idEmpleado',empleado.idEmpleado);

            const {data}=await Api.post('empleadoDetalle',formData);
            setEmpleadoDetalle(data[0]);

            const empleadoCompleto={
              ...data[0],
              idUbicacion:ubicaciones.find(ubicacion=>ubicacion.nombreUbicacion===data[0].nombreUbicacion).idUbicacion,
              idPlaza:plazas.find(plaza=>plaza.nombrePlaza===data[0].nombrePlaza).idPlaza,
              idGrupo:grupos.find(grupo=>grupo.nombreGrupo===data[0].nombreGrupo).idGrupo,
              descripcion:"",
              fechaCambio:fecha
            }

            empleadosFormulario.current[posicion]=empleadoCompleto;
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
          <Nombres>
            Grupo: <Span>{empleadoDetalle.nombreGrupo}</Span>
          </Nombres>
        </ContenedorInfo>
        <ContenedorInfo>
          <div>
            <Nombres>Nueva ubicación</Nombres>
                <Select
                  options={ubicaciones}
                  getOptionLabel={(ubicacion) => ubicacion.nombreUbicacion}
                  getOptionValue={(ubicacion) => ubicacion.idUbicacion}
                  value={ubicacionesSelect}
                  placeholder='Selecciona una Ubicación'
                  onChange={(value)=>{
                    empleadosFormulario.current[posicion].nombreUbicacion=value.nombreUbicacion;
                    empleadosFormulario.current[posicion].idUbicacion=value.idUbicacion;
                    setUbicacionesSelect(value);
                  }}
                  defaultValue={{nombreUbicacion:empleadosFormulario.current[posicion].nombreUbicacion,idUbicacion:empleadosFormulario.current[posicion].idUbicacion}}
                  menuPlacement={ultimo===posicion?"top":"bottom"}
                />
          </div>
          <div>
            <Nombres>Nueva plaza</Nombres>
                <Select
                  options={plazas}
                  getOptionLabel={(plaza) => plaza.nombrePlaza}
                  getOptionValue={(plaza) => plaza.idPlaza}
                  value={plazasSelect}
                  placeholder='Selecciona una Plaza'
                  onChange={(value)=>{
                    empleadosFormulario.current[posicion].nombrePlaza=value.nombrePlaza;
                    empleadosFormulario.current[posicion].idPlaza=value.idPlaza;
                    setPlazasSelect(value);
                  }}
                  defaultValue={{nombrePlaza:empleadosFormulario.current[posicion].nombrePlaza,idPlaza:empleadosFormulario.current[posicion].idPlaza}}
                  menuPlacement={ultimo===posicion?"top":"bottom"}
                />
          </div>
          <div>
            <Nombres>Nuevo Grupo</Nombres>
                <Select
                  options={grupos}
                  getOptionLabel={(grupo) => grupo.nombreGrupo}
                  getOptionValue={(grupo) => grupo.idGrupo}
                  value={gruposSelect}
                  placeholder='Selecciona un Grupo'
                  onChange={(value)=>{
                    empleadosFormulario.current[posicion].nombreGrupo=value.nombreGrupo;
                    empleadosFormulario.current[posicion].idGrupo=value.idGrupo;
                    setGruposSelect(value);
                  }}
                  defaultValue={{nombreGrupo:empleadosFormulario.current[posicion].nombreGrupo,idGrupo:empleadosFormulario.current[posicion].idGrupo}}
                  menuPlacement={ultimo===posicion?"top":"bottom"}
                />
          </div>
        </ContenedorInfo>
      </div>
      <div>
        <Nombres>Justificación</Nombres>
        <Justificacion placeholder='Escribe la Justificación del traslado' onChange={(e)=>{
          empleadosFormulario.current[posicion].descripcion=e.target.value;
        }} />
      </div>
      </ContenedorColumnas>
      <div style={{display:'flex', justifyContent:'center'}}>
        <Nombres style={{marginRight:'1rem'}}>Fecha de Traslado</Nombres>
        <Fecha type="date" value={fechaInput} onChange={(e)=>{
          if(e.target.value){
            setFechaInput(e.target.value);
            empleadosFormulario.current[posicion].fechaCambio=e.target.value;
          }
        }}/>
      </div>
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