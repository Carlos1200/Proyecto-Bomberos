import {useState,useRef} from 'react'

export const UseExcel = (setError) => {

    const [procesando, setProcesando] = useState(false);
    // eslint-disable-next-line
    const empleadosNuevo = useRef(new Array());
    const [empleadoArreglado, setEmpleadoArreglado] = useState(null);

    const comprobarUbicaciones=(empleado,ubicaciones)=>{
        let BreakException = {};

        try {
            empleado.forEach((empleado,index)=>{
                const valor=ubicaciones.find(ubicacion=>empleado.ubicacion===ubicacion.nombreUbicacion);
                if(!valor){
                    setError(`La ubicacion del empleado en la linea ${index+2} no se encuentra en la base de datos`);
                    throw BreakException;
                }
                empleadosNuevo.current[index].ubicacion=valor.idUbicacion;
            })
        } catch (e) {
            if(e!==BreakException) throw e
        }

        
    }

    const comprobarPlazas=(empleado, plazas)=>{
        let BreakException = {};

        try {
            empleado.forEach((empleado,index)=>{
                const valor=plazas.find(plaza=>empleado.plaza===plaza.nombrePlaza);
    
                if(!valor){
                    setError(`La plaza del empleado en la linea ${index+2} no se encuentra en la base de datos`);
                    throw BreakException;
                }

                empleadosNuevo.current[index].plaza=valor.idPlaza;
            })
        } catch (e) {
            if(e!==BreakException) throw e
        }
    }

    const comprobarGrupos=(empleado,grupos)=>{
        let BreakException = {};

        try {
            empleado.forEach((empleado,index)=>{
                const valor=grupos.find(grupo=>empleado.grupo===grupo.nombreGrupo);
    
                if(!valor){
                    setError(`El grupo del empleado en la linea ${index+2} no se encuentra en la base de datos`);
                    throw BreakException;
                }

                empleadosNuevo.current[index].grupo=valor.idGrupo;
            })
        } catch (e) {
            if(e!==BreakException) throw e
        }
    }

    const comprobarPensiones=(empleado,pensiones)=>{
        let BreakException = {};

        try {
            empleado.forEach((empleado,index)=>{
                const valor=pensiones.find(pension=>empleado.pension===pension.nombrePension);
    
                if(!valor){
                    setError(`La Pension del empleado en la linea ${index+2} no se encuentra en la base de datos`);
                    throw BreakException;
                }

                empleadosNuevo.current[index].pension=valor.idPension;
            })
        } catch (e) {
            if(e!==BreakException) throw e
        }
    }

    const prepararDatos=()=>{

        const empleados={
            nombres:'',
            apellidos:'',
            salarioNominal:'',
            idGrupo:'',
            idPension:'',
            idUbicacion:'',
            idPlaza:'',
            fechaCreacionEmpleado:''
        }
        const date=new Date();
        const fecha= date.toISOString().slice(0, 10);

        empleadosNuevo.current.forEach((empleado,index)=>{
            if(index===0){
                empleados.nombres=empleado.nombre;
                empleados.apellidos=empleado.apellido;
                empleados.salarioNominal=empleado.salario;
                empleados.idGrupo=empleado.grupo;
                empleados.idPension=empleado.pension;
                empleados.idUbicacion=empleado.ubicacion;
                empleados.idPlaza=empleado.plaza;
                empleados.fechaCreacionEmpleado=fecha
                empleados.selectTop=empleadosNuevo.current.length;
            }else{

                empleados.nombres=`${empleados.nombres},${empleado.nombre}`;
                empleados.apellidos=`${empleados.apellidos},${empleado.apellido}`;
                empleados.salarioNominal=`${empleados.salarioNominal},${empleado.salario}`;
                empleados.idGrupo=`${empleados.idGrupo},${empleado.grupo}`;
                empleados.idPension=`${empleados.idPension},${empleado.pension}`;
                empleados.idUbicacion=`${empleados.idUbicacion},${empleado.ubicacion}`;
                empleados.idPlaza=`${empleados.idPlaza},${empleado.plaza}`;
                empleados.fechaCreacionEmpleado=`${empleados.fechaCreacionEmpleado},${fecha}`
            }
        });

        setEmpleadoArreglado(empleados);
    }
    
    const verificarEmpleados=(empleados,ubicaciones,plazas,pension,grupo)=>{
        setProcesando(true);
        empleadosNuevo.current=empleados;
        comprobarUbicaciones(empleados,ubicaciones);
        comprobarPlazas(empleados,plazas);
        comprobarGrupos(empleados,grupo);
        comprobarPensiones(empleados,pension);
        prepararDatos();
        setProcesando(false);
    }


    return{
        verificarEmpleados,
        procesando,
        empleadosActualizado:empleadoArreglado,
    }
}
