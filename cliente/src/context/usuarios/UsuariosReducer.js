import {OBTENER_USUARIOS} from '../../types'

// eslint-disable-next-line
export default (state,action)=>{
    
    switch(action.type){

        case OBTENER_USUARIOS:
            return{
                ...state,
                usuarios:action.payload,
                cargando:false,
            }
        default:
            return state;
    }
}