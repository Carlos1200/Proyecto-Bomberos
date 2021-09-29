import {INICIO_SESION,CERRAR_SESION} from '../../types'

export default (state,action)=>{
    switch(action.type){

        case INICIO_SESION:
            return{
                ...state,
                idUsuario:action.payload.idUsuario,
                NombreUsuario:action.payload.NombreUsuario,
                tipoUsuario:action.payload.tipoUsuario,
                login:action.payload.login,
                cargando:false,
            }

        case CERRAR_SESION:
            return{
                ...state,
                idUsuario:'',
                NombreUsuario:'',
                tipoUsuario:'',
                login:false,
                cargando:false,
            }
        default:
            return state;
    }
}