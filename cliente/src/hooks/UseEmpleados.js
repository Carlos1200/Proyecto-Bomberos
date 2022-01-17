import { useRef} from 'react'
import { useSetRecoilState } from 'recoil';
import { empleadosState } from '../atom/AtomTablas';
import { nuevosEmpleados } from '../services/empleadosServices';

export const UseEmpleados = (mostrarNotificacionNuevo,handleClose) => {

    const setEmpleadosState=useSetRecoilState(empleadosState);

    const nombresCol = useRef('');
    const apellidosCol = useRef('');
    const ubicacionCol = useRef('');
    const plazaCol = useRef('');
    const pensionCol = useRef('');
    const grupoCol = useRef('');
    const salarioCol = useRef('');
    const fechaCol = useRef('');
    const selectTop = useRef(0);
    const crearString=(empleados)=>{

        empleados.forEach(empleado => {

            if(!nombresCol.current){
                nombresCol.current=empleado.nombres;
            }else{
                const string=`${nombresCol.current},${empleado.nombres}`
                nombresCol.current=string;
            }
            
            if(!apellidosCol.current){
                apellidosCol.current=empleado.apellidos;
            }else{
                const string=`${apellidosCol.current},${empleado.apellidos}`
                apellidosCol.current=string;
            }
            
            if(!ubicacionCol.current){
                ubicacionCol.current=empleado.ubicacion;
            }else{
                const string=`${ubicacionCol.current},${empleado.ubicacion}`
                ubicacionCol.current=string;
            }
            
            if(!plazaCol.current){
                plazaCol.current=empleado.plaza;
            }else{
                const string=`${plazaCol.current},${empleado.plaza}`
                plazaCol.current=string;
            }
    
            if(!pensionCol.current){
                pensionCol.current=empleado.pension;
            }else{
                const string=`${pensionCol.current},${empleado.pension}`
                pensionCol.current=string;
            }
    
            if(!grupoCol.current){
                grupoCol.current=empleado.grupo;
            }else{
                const string=`${grupoCol.current},${empleado.grupo}`
                grupoCol.current=string;
            }
    
            if(!salarioCol.current){
                salarioCol.current=Number.parseFloat(empleado.salario).toFixed(2).toString();
            }else{
                const string=`${salarioCol.current},${Number.parseFloat(empleado.salario).toFixed(2)}`
                salarioCol.current=string;
            }
            
            if(!fechaCol.current){
                fechaCol.current=empleado.fechaCreacionEmpleado;
            }else{
                const string=`${fechaCol.current},${empleado.fechaCreacionEmpleado}`
                fechaCol.current=string;
            }
            
        })
        selectTop.current=empleados.length;
        
        insertarEmpleados();
    }

    const insertarEmpleados=async()=>{
        const formData=new FormData();
        formData.append('nombres',nombresCol.current);
        formData.append('apellidos',apellidosCol.current);
        formData.append('salarioNominal',salarioCol.current);
        formData.append('idGrupo',grupoCol.current)
        formData.append('idPension',pensionCol.current)
        formData.append('idUbicacion',ubicacionCol.current)
        formData.append('idPlaza',plazaCol.current)
        formData.append('fechaCreacionEmpleado',fechaCol.current);
        formData.append('selectTop',selectTop.current);
        nuevosEmpleados(formData).then((res)=>{
            const reversed=res.reverse();
          setEmpleadosState((oldValue)=>oldValue.concat(reversed));
          handleClose();
          mostrarNotificacionNuevo();
        }).catch(()=>{
          mostrarNotificacionNuevo(true);
        })
      }

    return{
        crearString
    }

}
