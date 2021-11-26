
import {OBTENER_PLAZAS} from '../../types'

// eslint-disable-next-line
export default (state,action)=>{
    
    switch(action.type){

        case OBTENER_PLAZAS:
            return{
                ...state,
                plazas:action.payload,
                cargando:false,
            }
        default:
            return state;
    }
}