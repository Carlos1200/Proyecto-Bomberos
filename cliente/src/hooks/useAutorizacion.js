import { useRef } from "react";

export const useAutorizacion = () => {
    const empleadosNuevos = useRef([]);
    const guardarReporte=(empleados,idReporte)=>{
        empleados.forEach((empleado,index)=>{
            if(index===0){
                empleadosNuevos.current.idEmpleado=empleado.idEmpleado;
                empleadosNuevos.current.minutosDiurnosAutorizados=empleado.minutosDiurnosAutorizados;
                empleadosNuevos.current.minutosNocturnosAutorizados=empleado.minutosNocturnosAutorizados;
            }else{
                empleadosNuevos.current.idEmpleado=`${empleadosNuevos.current.idEmpleado},${empleado.idEmpleado}`;
                empleadosNuevos.current.minutosDiurnosAutorizados=`${empleadosNuevos.current.minutosDiurnosAutorizados},${empleado.minutosDiurnosAutorizados}`;
                empleadosNuevos.current.minutosNocturnosAutorizados=`${empleadosNuevos.current.minutosNocturnosAutorizados},${empleado.minutosNocturnosAutorizados}`;
            }
        })
        empleadosNuevos.current.idReporte=idReporte;
        console.log({empleadosNuevos:empleadosNuevos.current});
    }
    
    return {
        guardarReporte
    }
}
