import { useRef } from "react";
import Api from "../Api/Api";

export const UseTraslados = () => {
    
    const empleadoRef = useRef({});

    
    const PrepararDatos=(traslados)=>{

        const date=new Date();
        const fecha= date.toISOString().slice(0, 10);
        
        traslados.forEach((traslado,index)=>{
            if(index===0){
                empleadoRef.current.plazaAnterior=traslado.plazaAnterior;
                empleadoRef.current.plazaActual=traslado.nombrePlaza;
                empleadoRef.current.ubicacionAnterior=traslado.ubicacionAnterior;
                empleadoRef.current.ubicacionActual=traslado.nombreUbicacion;
                empleadoRef.current.grupoAnterior=traslado.grupoAnterior;
                empleadoRef.current.grupoActual=traslado.nombreGrupo;
                empleadoRef.current.fechaCambio=traslado.fechaCambio;
                empleadoRef.current.descripcion=traslado.descripcion;
                empleadoRef.current.fechaCreacion=fecha;
                empleadoRef.current.tituloHistorial=traslado.titulo;
                empleadoRef.current.idHistorialTraslados=traslados.length;
                empleadoRef.current.idEmpleados=traslado.idEmpleado;
            }else{
                empleadoRef.current.plazaAnterior=`${empleadoRef.current.plazaAnterior},${traslado.plazaAnterior}`;
                empleadoRef.current.plazaActual=`${empleadoRef.current.plazaActual},${traslado.nombrePlaza}`;
                empleadoRef.current.ubicacionAnterior=`${empleadoRef.current.ubicacionAnterior},${traslado.ubicacionAnterior}`;
                empleadoRef.current.ubicacionActual=`${empleadoRef.current.ubicacionActual},${traslado.nombreUbicacion}`;
                empleadoRef.current.grupoAnterior=`${empleadoRef.current.grupoAnterior},${traslado.grupoAnterior}`;
                empleadoRef.current.grupoActual=`${empleadoRef.current.grupoActual},${traslado.nombreGrupo}`;
                empleadoRef.current.fechaCambio=`${empleadoRef.current.fechaCambio},${traslado.fechaCambio}`;
                empleadoRef.current.descripcion=`${empleadoRef.current.descripcion},${traslado.descripcion}`;
                empleadoRef.current.fechaCreacion=`${empleadoRef.current.fechaCreacion},${fecha}`;
                empleadoRef.current.tituloHistorial=`${empleadoRef.current.tituloHistorial},${traslado.titulo}`;
                empleadoRef.current.idEmpleados=`${empleadoRef.current.idEmpleados},${traslado.idEmpleado}`;
            }
        });
        SubidaDatos();
    }

    const SubidaDatos=async()=>{

        const formData=new FormData();

        formData.append('plazaAnterior',empleadoRef.current.plazaAnterior);
        formData.append('plazaActual',empleadoRef.current.plazaActual);
        formData.append('ubicacionAnterior',empleadoRef.current.ubicacionAnterior);
        formData.append('ubicacionActual',empleadoRef.current.ubicacionActual);
        formData.append('grupoAnterior',empleadoRef.current.grupoAnterior);
        formData.append('grupoActual',empleadoRef.current.grupoActual);
        formData.append('fechaCambio',empleadoRef.current.fechaCambio);
        formData.append('descripcion',empleadoRef.current.descripcion);
        formData.append('fechaCreacion',empleadoRef.current.fechaCreacion);
        formData.append('tituloHistorial',empleadoRef.current.tituloHistorial);
        formData.append('idHistorialTraslados',empleadoRef.current.idHistorialTraslados);
        formData.append('idEmpleados',empleadoRef.current.idEmpleados);

        try {
            const {data}=await Api.post('/traslados/CrearTraslado.php',formData);
            console.log(data);
        } catch (error) {
            console.log(error.response.data);
        }
    }

    return {
        PrepararDatos
    }
}
