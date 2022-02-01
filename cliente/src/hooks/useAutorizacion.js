import { useRef } from "react";
import { useSetRecoilState } from "recoil";
import { reportesState } from "../atom/AtomTablas";
import { ActualizarReporte } from "../services/reportesServices";

export const useAutorizacion = (handleClose,mostrarNotificacion,setCargandoProceso) => {
    const empleadosNuevos = useRef({});
    const setReportes=useSetRecoilState(reportesState);
    const guardarReporte=(empleados,idReporte)=>{
        empleados.forEach((empleado,index)=>{
            if(index===0){
                empleadosNuevos.current.minutosDiurnosAutorizados=empleado.minutosDiurnosAutorizados;
                empleadosNuevos.current.minutosNocturnosAutorizados=empleado.minutosNocturnosAutorizados;
            }else{
                empleadosNuevos.current.minutosDiurnosAutorizados=`${empleadosNuevos.current.minutosDiurnosAutorizados},${empleado.minutosDiurnosAutorizados}`;
                empleadosNuevos.current.minutosNocturnosAutorizados=`${empleadosNuevos.current.minutosNocturnosAutorizados},${empleado.minutosNocturnosAutorizados}`;
            }
        })
        const formData=new FormData();
        formData.append('idReporte',idReporte);
        formData.append('minutosDiurnosAutorizados',empleadosNuevos.current.minutosDiurnosAutorizados);
        formData.append('minutosNocturnosAutorizados',empleadosNuevos.current.minutosNocturnosAutorizados);

        ActualizarReporte(formData).then((res)=>{
            setReportes((oldValue=>oldValue.map((reporte)=>{
                if(reporte.idReporte===idReporte){
                    return {
                        ...reporte,
                        verificacion:"1"
                    }
                }
                return reporte;
            })));
            handleClose();
            mostrarNotificacion();
        }).catch(err=>{
            console.log({err});
            mostrarNotificacion(true,"Ocurrio un error");
        }).finally(()=>{
            setCargandoProceso(false)
        })
    }
    
    return {
        guardarReporte
    }
}
