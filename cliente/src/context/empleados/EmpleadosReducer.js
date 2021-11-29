import {OBTENER_EMPLEADOS} from '../../types'

// eslint-disable-next-line
export default (state,action)=>{
    
    switch(action.type){

        case OBTENER_EMPLEADOS:
            return{
                ...state,
                empleados:action.payload,
                cargando:false,
            }
        default:
            return state;
    }
}