
export const useBuscador = ({
    promise,setState
}) => {
    const buscador=(nombre)=>{
        promise(nombre).then(res=>{
            setState(res);
        })
    }

    const reset=(datos)=>{
        if(datos){
            promise(datos).then(res=>{
                setState(res);
            })
        }else{
            promise().then(res=>{
                setState(res);
            })
        }
    }

    return {
        buscador,
        reset
    }
}
