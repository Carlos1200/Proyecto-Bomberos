import React from 'react'
import Api from '../Api/Api';

export const UseReportes = () => {

    const empleadoRef = useRef({});

    const PrepararDatos = (reportes)=>{

        const date = new Date();
        const fecha = date.toISOString().slice(0, 10);

        reportes.forEach((reportes,index) => {
            if(index===0){
                empleadoRef.current.minutosDiurnosNormales=reportes.minutosDiurnosNormales;
                empleadoRef.current.minutosNocturnosNormales=reportes.minutosNocturnosNormales;
                empleadoRef.current.idEmpleados=reportes.idEmpleado;

            }else{
                empleadoRef.current.minutosDiurnosNormales=`${empleadoRef.current.minutosDiurnosNormales},${reportes.minutosDiurnosNormales}`;
                empleadoRef.current.minutosNocturnosNormales=`${empleadoRef.current.minutosNocturnosNormales},${reportes.minutosNocturnosNormales}`;
                empleadoRef.current.idEmpleados=`${empleadoRef.current.idEmpleados},${empleadoRef.current.idEmpleado}`;
            }
        });
        SubirDatos();
    }

    const SubirDatos=async()=>{

        const formData=new FormData();

        formData.append('minutosDiurnosNormales',empleadoRef.current.minutosDiurnosNormales);
        formData.append('minutosNocturnosNormales',empleadoRef.current.minutosNocturnosNormales);
        formData.append('idEmpleados',empleadoRef.current.idEmpleado);
        
        try {
            const {data}=await Api.post('/reporte',formData);
        } catch (error) {
            console.log(error.response.data);
        }
    }
    return {
        PrepararDatos
    }
}
