
export const useBuscador = ({
    promise,setState
}) => {
    const buscador=(nombre)=>{
        promise(nombre).then(res=>{
            setState(res);
        })
    }

    const reset=()=>{
        promise().then(res=>{
            setState(res);
        })
    }

    return {
        buscador,
        reset
    }
}
