
import {OBTENER_REPORTE} from '../../types'

// eslint-disable-next-line
export default (state,action)=>{
    
    switch(action.type){

        case OBTENER_REPORTE:
            return{
                ...state,
                reportes:action.payload,
                cargando:false,
            }
        default:
            return state;
    }
}