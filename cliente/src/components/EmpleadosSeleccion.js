import React from 'react'

export const EmpleadosSeleccion = ({empleado}) => {
    // console.log(empleado.nombres);
    return (
        <div style={{height:'2rem'}}>
            <p>{empleado.nombres}</p>
        </div>
    )
}
