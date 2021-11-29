import React, {useState, useRef} from 'react'

export const UseReportes = () => {
    //Variables que deben calcularse manualmente
    //Tabla Minutos
    const valorMinuto = useRef('');
    const totalExtraDiurno = useRef('');
    const totalExtraNocturno = useRef('');
    const totalHorasExtras = useRef('');
    const minutosDiurnosAutorizados = useRef('');
    const minutosNocturnosAutorizados = useRef('');
    const minutosVerificados = useRef('');
    const minutosDiurnosTotales = useRef('');
    const minutosNocturnosTotales = useRef('');
    const sueldoMasHorasExtras = useRef('');
    //Tabla Descuentos
    const ISSSdescuento = useRef('');
    const IPSFAdescuento = useRef('');
    const AFPCRECERdescuento = useRef('');
    const AFPCONFIAdescuento = useRef('');
    const retencionRenta = useRef('');
    const totalDescuentos = useRef('');
    const sueldoParaISSS = useRef('');
    const liquido = useRef('');
    //Tabla aportes
    const ISSSaporte = useRef('');
    const IPSFAaporte = useRef('');
    const AFPCRECERaporte = useRef('');
    const AFPCONFIAaporte = useRef('');
    const totalAportaciones = useRef('');
    //Tabla detalles
    const TOTAL = useRef('');

    const GenerarReporte = (idEmpleado, nombres, apellidos, idUbicacion, idGrupo, salario, idPlaza, idTipoPension, minutosDiurnosNormales, minutosNocturnosNormales) =>{

        //Valor por Minuto
        if(!valorMinuto.current){
            valorMinuto.current = (((salario/30)/8)/60).toString();
        } else {
            const string = `${valorMinuto.current},${(((salario/30)/8)/60)}`;
            valorMinuto.current=string;
        }

        //Declarando a 0 los minutos autorizados
        if(!minutosDiurnosAutorizados.current){
            minutosDiurnosAutorizados.current = '0';
        } else {
            const string = `${minutosDiurnosAutorizados.current},${0}`;
            minutosDiurnosAutorizados.current=string;
        }
        if(!minutosNocturnosAutorizados.current){
            minutosNocturnosAutorizados.current = '0';
        } else {
            const string = `${minutosNocturnosAutorizados.current},${0}`;
            minutosNocturnosAutorizados.current=string;
        }
        
        //Total Extra Diurno
        if(!totalExtraDiurno.current){
            totalExtraDiurno.current = (minutosDiurnosNormales*valorMinuto).toString();
        } else {
            const string = `${totalExtraDiurno},${minutosDiurnosNormales*valorMinuto}`;
            totalExtraDiurno.current = string;
        }

        //Total Extra Nocturno
        if(!totalExtraNocturno.current){
            totalExtraNocturno.current = ((minutosNocturnosNormales*valorMinuto)*1.5).toString();
        } else {
            const string = `${totalExtraNocturno},${(minutosNocturnosNormales*valorMinuto)*1.5}`;
            totalExtraNocturno.current = string;
        }

        //Total Horas Extras
        if(!totalHorasExtras.current){
            totalHorasExtras.current = (Math.round((totalExtraDiurno+totalExtraNocturno)*100)/100).toString();
        } else {
            const string = `${totalHorasExtras},${Math.round((totalExtraDiurno+totalExtraNocturno)*100)/100}`;
            totalHorasExtras.current = string;
        }

        //Sueldo mas Horas Extras
        if(!sueldoMasHorasExtras.current){
            sueldoMasHorasExtras.current = (salario + totalHorasExtras).toString();
        } else {
            const string = `${sueldoMasHorasExtras},${salario + totalHorasExtras}`;
            sueldoMasHorasExtras.current = string;
        }

        //ISSS descuento
        if(!ISSSdescuento.current){
            if(idTipoPension = 4){
                ISSSdescuento.current = '0';
            } else if((totalHorasExtras + salario) >= 1000){
                ISSSdescuento.current = (30 - (salario*0.03)).toString();
            } else {
                ISSSdescuento.current = (totalHorasExtras*0.03).toString();
            }
        } else {
            if(idTipoPension = 4){
                const string = `${ISSSdescuento.current},${0}`
                ISSSdescuento.current = string;
            }
            else if((totalHorasExtras + salario) >= 1000){
                const string = `${ISSSdescuento.current},${30 - (salario*0.03)}`
                ISSSdescuento.current = string;
            } else {
                const string = `${ISSSdescuento.current},${totalHorasExtras*0.03}`;
                ISSSdescuento.current = string;
            }
        }
        
        //IPSFA descuento
        if(!IPSFAdescuento.current){
            if(idTipoPension = 1){
                IPSFAdescuento.current = (totalHorasExtras*0.065).toString();
            } else {
                IPSFAdescuento.current = '0';
            }
        } else {
            if(idTipoPension = 1){
                const string = `${IPSFAdescuento.current},${totalHorasExtras*0.065}`;
                IPSFAdescuento.current = string;
            } else {
                const string = `${IPSFAdescuento.current},${0}`;
                IPSFAdescuento.current = string;
            }
        }

        //AFPCRECER descuento
        if(!AFPCRECERdescuento.current){
            if(idTipoPension = 2){
                AFPCRECERdescuento.current = (totalHorasExtras*0.0725).toString();
            } else {
                AFPCRECERdescuento.current = '0';
            }
        } else {
            if(idTipoPension = 2){
                const string = `${AFPCRECERdescuento.current},${totalHorasExtras*0.0775}`;
                AFPCRECERdescuento.current = string;
            } else {
                const string = `${AFPCRECERdescuento.current},${0}`;
                AFPCRECERdescuento.current = string;
            }
        }

        //AFPCONFIA descuento
        if(!AFPCONFIAdescuento.current){
            if(idTipoPension = 3){
                AFPCONFIAdescuento.current = (totalHorasExtras*0.0725).toString();
            } else {
                AFPCONFIAdescuento.current = '0';
            }
        } else {
            if(idTipoPension = 3){
                const string = `${AFPCONFIAdescuento.current},${totalHorasExtras*0.0725}`;
                AFPCONFIAdescuento.current = string;
            } else {
                const string = `${AFPCONFIAdescuento.current},${0}`;
                AFPCONFIAdescuento.current = string;
            }
        }

        //Sueldo para ISSS
        if(!sueldoParaISSS.current){
            sueldoParaISSS.current = ((salario+totalHorasExtras)-((salario*0.105)+ISSSdescuento+IPSFAdescuento+AFPCRECERdescuento+AFPCONFIAdescuento)).toString();
        } else {
            const string = `${sueldoParaISSS.current},${(salario+totalHorasExtras)-((salario*0.105)+ISSSdescuento+IPSFAdescuento+AFPCRECERdescuento+AFPCONFIAdescuento)}`;
            sueldoParaISSS.current = string;
        }

        //Retencion de Renta
        if(!retencionRenta.current){
            if(sueldoParaISSS <= 472) {
                retencionRenta.current = '0';
            } else if(sueldoParaISSS >= 472.01 && sueldoParaISSS <= 895.24) {
                retencionRenta.current = (((sueldoParaISSS - 472)*0.1)+17.67).toString();
            } else if(sueldoParaISSS >= 895.25 && sueldoParaISSS <= 2038.1) {
                retencionRenta.current = (((sueldoParaISSS - 895.24)*0.2)+60).toString();
            } else if(sueldoParaISSS >= 2031.11) {
                retencionRenta.current = (((sueldoParaISSS - 2031.11)*0.3)+288.57)
            }
        } else {
            if(sueldoParaISSS <= 472) {
                const string = `${retencionRenta.current},${0}`;
                retencionRenta.current = string;
            } else if(sueldoParaISSS >= 472.01 && sueldoParaISSS <= 895.24) {
                const string = `${retencionRenta.current},${((sueldoParaISSS - 472)*0.1)+17.67}`;
                retencionRenta.current = string;
            } else if(sueldoParaISSS >= 895.25 && sueldoParaISSS <= 2038.1) {
                const string = `${retencionRenta.current},${((sueldoParaISSS - 895.24)*0.2)+60}`;
                retencionRenta.current = string;
            } else if(sueldoParaISSS >= 2031.11) {
                const string = `${retencionRenta.current},${((sueldoParaISSS - 2031.11)*0.3)+288.57}`;
                retencionRenta.current = string;
            }
        }

        //Total Descuentos
        if(!totalDescuentos.current){
            totalDescuentos.current = (ISSSdescuento + IPSFAdescuento + AFPCRECERdescuento + AFPCONFIAdescuento + retencionRenta).toString();
        } else {
            const string = `${totalDescuentos.current},${ISSSdescuento + IPSFAdescuento + AFPCRECERdescuento + AFPCONFIAdescuento + retencionRenta}`;
            totalDescuentos.current = string;
        }

        //Liquido
        if(!liquido.current){
            liquido.current = (Math.round((totalHorasExtras-totalDescuentos)*100)/100).toString();
        }  else {
            const string = `${liquido.current},${Math.round((totalHorasExtras-totalDescuentos)*100)/100}`;
            liquido.current = string;
        }

        //ISSS aporte
        if(!ISSSaporte.current){
            if(idTipoPension = 4){
                ISSSaporte.current = '0';
            } else if ((totalHorasExtras + salario) >= 1000){
                ISSSaporte.current = (75 - (salario*0.075)).toString();
            } else {
                ISSSaporte.current = (totalHorasExtras*0.075).toString();
            }
        } else {
            if(idTipoPension = 4){
                const string = `${ISSSaporte.current},${0}`;
                ISSSaporte.current = string;
            } else if ((totalHorasExtras + salario) >= 1000){
                const string = `${ISSSaporte.current},${75 - (salario*0.075)}`;
                ISSSaporte.current = string;
            } else {
                const string = `${ISSSaporte.current},${totalHorasExtras*0.075}`;
                ISSSaporte.current = string;
            }
        }

        //IPSFA aporte
        if(!IPSFAaporte.current){
            if(idTipoPension = 1){
                IPSFAaporte.current = (totalHorasExtras*0.075).toString();
            } else {
                IPSFAaporte.current = '0';
            }
        } else {
            if(idTipoPension = 1){
                const string = `${IPSFAaporte.current},${totalHorasExtras*0.075}`;
                IPSFAaporte.current = string;
            } else {
                const string = `${IPSFAaporte.current},${0}`;
                IPSFAaporte.current = string;
            }
        }

        //AFPCRECER aporte
        if(!AFPCRECERaporte.current){
            if(idTipoPension = 2){
                AFPCRECERaporte.current = (totalHorasExtras*0.775).toString();
            } else {
                AFPCRECERaporte.current = '0';
            }
        } else {
            if(idTipoPension = 2){
                const string = `${AFPCRECERaporte.current},${totalHorasExtras*0.775}`;
                AFPCRECERaporte.current = string;
            } else {
                const string = `${AFPCRECERaporte.current},${0}`;
                AFPCRECERaporte.current = string;
            }
        }

        //AFPCONFIA aporte
        if(!AFPCONFIAaporte.current){
            if(idTipoPension = 3){
                AFPCONFIAaporte.current = (totalHorasExtras*0.0775).toString();
            } else {
                AFPCONFIAaporte.current = '0';
            }
        } else {
            if(idTipoPension = 3){
                const string = `${AFPCONFIAaporte.current},${totalHorasExtras*0.0775}`;
                AFPCONFIAaporte.current = string;
            }
        }

        //Total Aportaciones
        if(!totalAportaciones.current){
            totalAportaciones.current = (ISSSaporte + IPSFAaporte + AFPCRECERaporte + AFPCONFIAaporte).toString();
        } else {
            const string = `${totalAportaciones.current},${ISSSaporte + IPSFAaporte + AFPCRECERaporte + AFPCONFIAaporte}`;
            totalAportaciones.current = string;
        }

        //TOTAL (Total que debe gastar la empresa)
        if(!TOTAL.current){
            TOTAL.current = (totalHorasExtras + totalAportaciones).toString();
        } else {
            const string = `${TOTAL},${totalHorasExtras + totalAportaciones}`;
            TOTAL.current = string;
        }

        //Minutos Diurnos Totales
        if(!minutosDiurnosTotales.current){
            minutosDiurnosTotales.current = (minutosDiurnosNormales + minutosDiurnosAutorizados).toString();
        } else {
            const string = `${minutosDiurnosTotales.current},${minutosDiurnosNormales + minutosDiurnosAutorizados}`;
            minutosDiurnosTotales.current = string;
        }

        //Minutos Nocturnos Totales
        if(!minutosNocturnosTotales.current){
            minutosNocturnosTotales.current = (minutosNocturnosNormales + minutosNocturnosNormales).toString();
        } else {
            const string = `${minutosNocturnosTotales.current},${minutosNocturnosNormales + minutosNocturnosNormales}`;
            minutosNocturnosTotales.current = string;
        }
    }



    return {

    }
}
