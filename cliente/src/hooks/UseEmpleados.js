import { useRef} from 'react'

export const UseEmpleados = () => {
    const nombresCol = useRef('');
    const apellidosCol = useRef('');
    const ubicacionCol = useRef('');
    const plazaCol = useRef('');
    const pensionCol = useRef('');
    const grupoCol = useRef('');
    const salarioCol = useRef('');
    const fechaCol = useRef('');
    const selectTop = useRef(0);
    const crearString=({nombres,apellidos,ubicacion,plaza,pension,grupo,salario,fechaCreacionEmpleado})=>{

        if(!nombresCol.current){
            nombresCol.current=nombres;
        }else{
            const string=`${nombresCol.current},${nombres}`
            nombresCol.current=string;
        }

        selectTop.current=selectTop.current+1;
        
        if(!apellidosCol.current){
            apellidosCol.current=apellidos;
        }else{
            const string=`${apellidosCol.current},${apellidos}`
            apellidosCol.current=string;
        }
        
        if(!ubicacionCol.current){
            ubicacionCol.current=ubicacion;
        }else{
            const string=`${ubicacionCol.current},${ubicacion}`
            ubicacionCol.current=string;
        }
        
        if(!plazaCol.current){
            plazaCol.current=plaza;
        }else{
            const string=`${plazaCol.current},${plaza}`
            plazaCol.current=string;
        }

        if(!pensionCol.current){
            pensionCol.current=pension;
        }else{
            const string=`${pensionCol.current},${pension}`
            pensionCol.current=string;
        }

        if(!grupoCol.current){
            grupoCol.current=grupo;
        }else{
            const string=`${grupoCol.current},${grupo}`
            grupoCol.current=string;
        }

        if(!salarioCol.current){
            salarioCol.current=salario;
        }else{
            const string=`${salarioCol.current},${salario}`
            salarioCol.current=string;
        }
        
        if(!fechaCol.current){
            fechaCol.current=fechaCreacionEmpleado;
        }else{
            const string=`${fechaCol.current},${fechaCreacionEmpleado}`
            fechaCol.current=string;
        }
        
        
    }

    return{
        nombresCol:nombresCol.current,
        apellidosCol:apellidosCol.current,
        ubicacionCol:ubicacionCol.current,
        plazaCol:plazaCol.current,
        pensionCol:pensionCol.current,
        grupoCol:grupoCol.current,
        salarioCol:salarioCol.current,
        fechaCol:fechaCol.current,
        selectTop:selectTop.current,
        crearString
    }

}
