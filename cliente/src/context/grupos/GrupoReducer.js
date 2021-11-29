
import {OBTENER_GRUPOS} from '../../types'

// eslint-disable-next-line
export default (state,action)=>{
    
    switch(action.type){

        case OBTENER_GRUPOS:
            return{
                ...state,
                grupos:action.payload,
                cargando:false,
            }
        default:
            return state;
    }
}