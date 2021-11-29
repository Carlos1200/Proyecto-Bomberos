
import {OBTENER_UBICACIONES} from '../../types'

// eslint-disable-next-line
export default (state,action)=>{
    
    switch(action.type){

        case OBTENER_UBICACIONES:
            return{
                ...state,
                ubicaciones:action.payload,
                cargando:false,
            }
        default:
            return state;
    }
}