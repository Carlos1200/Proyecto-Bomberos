import { useRef } from "react";
import { useSetRecoilState } from "recoil";
import { reportesState } from "../atom/AtomTablas";
import { crearReportes } from "../services/reportesServices";

export const UseReportes = (mostrarNotificacion,limpiarEmpleados,handleClose) => {

  const setReportes=useSetRecoilState(reportesState);
  //Variables que deben calcularse manualmente
  //Tabla Minutos
  const minutosDiurnos = useRef("");
  const minutosNocturnos = useRef("");
  const valorMinuto = useRef("");
  const totalExtraDiurno = useRef("");
  const totalExtraNocturno = useRef("");
  const totalHorasExtras = useRef("");
  const minutosDiurnosAutorizados = useRef("");
  const minutosNocturnosAutorizados = useRef("");
  const minutosVerificados = useRef("");
  const minutosDiurnosTotales = useRef("");
  const minutosNocturnosTotales = useRef("");
  const sueldoMasHorasExtras = useRef("");
  //Tabla Descuentos
  const ISSSdescuento = useRef("");
  const IPSFAdescuento = useRef("");
  const AFPCRECERdescuento = useRef("");
  const AFPCONFIAdescuento = useRef("");
  const retencionRenta = useRef("");
  const totalDescuentos = useRef("");
  const sueldoParaISSS = useRef("");
  const liquido = useRef("");
  //Tabla aportes
  const ISSSaporte = useRef("");
  const IPSFAaporte = useRef("");
  const AFPCRECERaporte = useRef("");
  const AFPCONFIAaporte = useRef("");
  const totalAportaciones = useRef("");
  //Tabla detalles
  const TOTAL = useRef("");
  const IdEmpleado = useRef("");
  //Reportes
  const fechaCreacion= useRef("");
  const verificacion = useRef("");
  const idUsuario=useRef("");

  const GenerarReporte = (
    empleadosArray,
    idUsuarioActual,
    usuarioJefe,
    ubicacionEstacion,
    sumatoriaHorasDiurnasNormales,
    sumatoriaHorasNocturnasNormales,
    sumatoriaHorasNormales,
    setCargando
  ) => {
    const longitud = empleadosArray.length;
    setCargando(true);
    empleadosArray.forEach((empleado, index) => {
      //! Realizar Calculos
      const date=new Date();
      const fecha= date.toISOString().slice(0, 10);

      const valorxMinuto = empleado.salario / 30 / 8 / 60;
      const TotalDiurno = empleado.minutosDiurnos * valorxMinuto;
      const TotalNocturno = empleado.minutosNocturnos * valorxMinuto * 1.5;
      const TotalExtras = Math.round((TotalDiurno + TotalNocturno) * 100) / 100;
      const sueldoHorasExtras = empleado.salario + TotalExtras;

      let ISSS_descuento;

      if (Number(empleado.idTipoPension) === 4) {
        ISSS_descuento = 0;
      } else if (TotalExtras + empleado.salario >= 1000) {
        ISSS_descuento = 30 - empleado.salario * 0.03;
      } else {
        ISSS_descuento = TotalExtras * 0.03;
      }

      let IPSFA_descuento;

      if (Number(empleado.idTipoPension) === 1) {
        IPSFA_descuento = TotalExtras * 0.065;
      } else {
        IPSFA_descuento = 0;
      }

      let AFPCRECER_descuento;

      if (Number(empleado.idTipoPension) === 2) {
        AFPCRECER_descuento = TotalExtras * 0.0725;
      } else {
        AFPCRECER_descuento = 0;
      }

      let AFPCONFIA_descuento;

      if (Number(empleado.idTipoPension) === 3) {
        AFPCONFIA_descuento = TotalExtras * 0.0725;
      } else {
        AFPCONFIA_descuento = 0;
      }

      const sueldo_ISSS =
        empleado.salario +
        TotalExtras -
        (empleado.salario * 0.105 +
          ISSS_descuento +
          IPSFA_descuento +
          AFPCRECER_descuento +
          AFPCONFIA_descuento);

      let retencion_Renta;

      if (sueldo_ISSS <= 472) {
        retencion_Renta = 0;
      } else if (sueldo_ISSS >= 472.01 && sueldo_ISSS <= 895.24) {
        retencion_Renta = (sueldo_ISSS - 472) * 0.1 + 17.67;
      } else if (sueldo_ISSS >= 895.25 && sueldo_ISSS <= 2038.1) {
        retencion_Renta = (sueldo_ISSS - 895.24) * 0.2 + 60;
      } else if (sueldo_ISSS >= 2031.11) {
        retencion_Renta = (sueldo_ISSS - 2031.11) * 0.3 + 288.57;
      }

      const total_Descuentos =
        ISSS_descuento +
        IPSFA_descuento +
        AFPCRECER_descuento +
        AFPCONFIA_descuento +
        retencion_Renta;
      const Salario_liquido =
        Math.round((TotalExtras - total_Descuentos) * 100) / 100;

      let ISSS_aporte;

      if (Number(empleado.idTipoPension) === 4) {
        ISSS_aporte = 0;
      } else if (TotalExtras + empleado.salario >= 1000) {
        ISSS_aporte = 75 - empleado.salario * 0.075;
      } else {
        ISSS_aporte = TotalExtras * 0.075;
      }

      let IPSFA_aporte;

      if (Number(empleado.idTipoPension) === 1) {
        IPSFA_aporte = TotalExtras * 0.075;
      } else {
        IPSFA_aporte = 0;
      }

      let AFPCRECER_aporte;

      if (Number(empleado.idTipoPension) === 2) {
        AFPCRECER_aporte = TotalExtras * 0.775;
      } else {
        AFPCRECER_aporte = 0;
      }

      let AFPCONFIA_aporte;

      if (Number(empleado.idTipoPension) === 3) {
        AFPCONFIA_aporte = TotalExtras * 0.0775;
      } else {
        AFPCONFIA_aporte = 0;
      }

      const total_aportaciones =
        ISSS_aporte + IPSFA_aporte + AFPCRECER_aporte + AFPCONFIA_aporte;

      const minutos_Diurnos_Totales = Number(empleado.minutosDiurnos) + 0;
      const minutos_Nocturnos_Totales = Number(empleado.minutosNocturnos) + 0;

      //! Crear los strings

      //id de empleados
      if (!IdEmpleado.current) {
        IdEmpleado.current = empleado.idEmpleado;
      } else {
        const string = `${IdEmpleado.current},${empleado.idEmpleado}`;
        IdEmpleado.current = string;
      }

      //id de Usuarios
      if (!idUsuario.current) {
        idUsuario.current = idUsuarioActual;
      } else {
        const string = `${idUsuario.current},${idUsuarioActual}`;
        idUsuario.current = string;
      }

      if(!fechaCreacion.current){
        fechaCreacion.current = fecha;
      }else{
        const string = `${fechaCreacion.current},${fecha}`;
        fechaCreacion.current = string;
      }

      if(!verificacion.current){
        verificacion.current = '0';
      }else{
        const string = `${verificacion.current},${0}`;
        verificacion.current = string;
      }

      //Minutos Diurnos
      if (!minutosDiurnos.current) {
        minutosDiurnos.current = empleado.minutosDiurnos;
      } else {
        const string = `${minutosDiurnos.current},${empleado.minutosDiurnos}`;
        minutosDiurnos.current = string;
      }

      //Minutos Nocturnos
      if (!minutosNocturnos.current) {
        minutosNocturnos.current = empleado.minutosNocturnos;
      } else {
        const string = `${minutosNocturnos.current},${empleado.minutosNocturnos}`;
        minutosNocturnos.current = string;
      }

      //Valor por Minuto

      if (!valorMinuto.current) {
        valorMinuto.current = valorxMinuto.toString();
      } else {
        const string = `${valorMinuto.current},${valorxMinuto}`;
        valorMinuto.current = string;
      }

      //Declarando a 0 los minutos autorizados
      if (!minutosDiurnosAutorizados.current) {
        minutosDiurnosAutorizados.current = "0";
      } else {
        const string = `${minutosDiurnosAutorizados.current},${0}`;
        minutosDiurnosAutorizados.current = string;
      }
      if (!minutosNocturnosAutorizados.current) {
        minutosNocturnosAutorizados.current = "0";
      } else {
        const string = `${minutosNocturnosAutorizados.current},${0}`;
        minutosNocturnosAutorizados.current = string;
      }

      //Minutos autorizados
      if (!minutosVerificados.current) {
        minutosVerificados.current = "0";
      } else {
        const string = `${minutosVerificados.current},${0}`;
        minutosVerificados.current = string;
      }

      //Total Extra Diurno
      if (!totalExtraDiurno.current) {
        totalExtraDiurno.current = TotalDiurno.toString();
      } else {
        const string = `${totalExtraDiurno.current},${TotalDiurno}`;
        totalExtraDiurno.current = string;
      }

      //Total Extra Nocturno
      if (!totalExtraNocturno.current) {
        totalExtraNocturno.current = TotalNocturno.toString();
      } else {
        const string = `${totalExtraNocturno.current},${TotalNocturno}`;
        totalExtraNocturno.current = string;
      }

      //Total Horas Extras

      if (!totalHorasExtras.current) {
        totalHorasExtras.current = TotalExtras.toString();
      } else {
        const string = `${totalHorasExtras.current},${TotalExtras}`;
        totalHorasExtras.current = string;
      }

      //Sueldo mas Horas Extras
      if (!sueldoMasHorasExtras.current) {
        sueldoMasHorasExtras.current = sueldoHorasExtras.toString();
      } else {
        const string = `${sueldoMasHorasExtras.current},${sueldoHorasExtras}`;
        sueldoMasHorasExtras.current = string;
      }

      //ISSS descuento
      if (!ISSSdescuento.current) {
        ISSSdescuento.current = ISSS_descuento.toString();
      } else {
        const string = `${ISSSdescuento.current},${ISSS_descuento}`;
        ISSSdescuento.current = string;
      }

      //IPSFA descuento
      if (!IPSFAdescuento.current) {
        IPSFAdescuento.current = IPSFA_descuento.toString();
      } else {
        const string = `${IPSFAdescuento.current},${IPSFA_descuento}`;
        IPSFAdescuento.current = string;
      }

      //AFPCRECER descuento
      if (!AFPCRECERdescuento.current) {
        AFPCRECERdescuento.current = AFPCRECER_descuento.toString();
      } else {
        const string = `${AFPCRECERdescuento.current},${AFPCRECER_descuento}`;
        AFPCRECERdescuento.current = string;
      }

      //AFPCONFIA descuento
      if (!AFPCONFIAdescuento.current) {
        AFPCONFIAdescuento.current = AFPCONFIA_descuento.toString();
      } else {
        const string = `${AFPCONFIAdescuento.current},${AFPCONFIA_descuento}`;
        AFPCONFIAdescuento.current = string;
      }

      //Sueldo para ISSS
      if (!sueldoParaISSS.current) {
        sueldoParaISSS.current = sueldo_ISSS.toString();
      } else {
        const string = `${sueldoParaISSS.current},${sueldo_ISSS}`;
        sueldoParaISSS.current = string;
      }

      //Retencion de Renta
      if (!retencionRenta.current) {
        retencionRenta.current = retencion_Renta.toString();
      } else {
        const string = `${retencionRenta.current},${retencion_Renta}`;
        retencionRenta.current = string;
      }

      //Total Descuentos
      if (!totalDescuentos.current) {
        totalDescuentos.current = total_Descuentos.toString();
      } else {
        const string = `${totalDescuentos.current},${total_Descuentos}`;
        totalDescuentos.current = string;
      }

      //Liquido
      if (!liquido.current) {
        liquido.current = Salario_liquido.toString();
      } else {
        const string = `${liquido.current},${Salario_liquido}`;
        liquido.current = string;
      }

      //ISSS aporte
      if (!ISSSaporte.current) {
        ISSSaporte.current = ISSS_aporte.toString();
      } else {
        const string = `${ISSSaporte.current},${ISSS_aporte}`;
        ISSSaporte.current = string;
      }

      //IPSFA aporte
      if (!IPSFAaporte.current) {
        IPSFAaporte.current = IPSFA_aporte.toString();
      } else {
        const string = `${IPSFAaporte.current},${IPSFA_aporte}`;
        IPSFAaporte.current = string;
      }

      //AFPCRECER aporte
      if (!AFPCRECERaporte.current) {
        AFPCRECERaporte.current = AFPCRECER_aporte.toString();
      } else {
        const string = `${AFPCRECERaporte.current},${AFPCRECER_aporte}`;
        AFPCRECERaporte.current = string;
      }

      //AFPCONFIA aporte
      if (!AFPCONFIAaporte.current) {
        AFPCONFIAaporte.current = AFPCONFIA_aporte.toString();
      } else {
        const string = `${AFPCONFIAaporte.current},${AFPCONFIA_aporte}`;
        AFPCONFIAaporte.current = string;
      }

      //Total Aportaciones
      if (!totalAportaciones.current) {
        totalAportaciones.current = total_aportaciones.toString();
      } else {
        const string = `${totalAportaciones.current},${total_aportaciones}`;
        totalAportaciones.current = string;
      }

      //TOTAL (Total que debe gastar la empresa)
      if (!TOTAL.current) {
        TOTAL.current = (TotalExtras + total_aportaciones).toString();
      } else {
        const string = `${TOTAL.current},${TotalExtras + total_aportaciones}`;
        TOTAL.current = string;
      }

      //Minutos Diurnos Totales
      if (!minutosDiurnosTotales.current) {
        minutosDiurnosTotales.current = minutos_Diurnos_Totales.toString();
      } else {
        const string = `${minutosDiurnosTotales.current},${minutos_Diurnos_Totales}`;
        minutosDiurnosTotales.current = string;
      }

      //Minutos Nocturnos Totales
      if (!minutosNocturnosTotales.current) {
        minutosNocturnosTotales.current = minutos_Nocturnos_Totales.toString();
      } else {
        const string = `${minutosNocturnosTotales.current},${minutos_Nocturnos_Totales}`;
        minutosNocturnosTotales.current = string;
      }

      if (index === longitud - 1) {
        enviarReportes(
          usuarioJefe,
          ubicacionEstacion,
          sumatoriaHorasDiurnasNormales,
          sumatoriaHorasNocturnasNormales,
          sumatoriaHorasNormales,
          longitud,
          setCargando
        );
      }
    });
  };

  const enviarReportes = async (
    usuarioJefe,
    ubicacionEstacion,
    sumatoriaHorasDiurnasNormales,
    sumatoriaHorasNocturnasNormales,
    sumatoriaHorasNormales,
    longitud,
    setCargando
  ) => {
      const formData = new FormData();
      formData.append("minutosDiurnosNormales", minutosDiurnos.current);
      formData.append("minutosNocturnosNormales", minutosNocturnos.current);
      formData.append("valorMinuto", valorMinuto.current);
      formData.append("totalExtraDiurno", totalExtraDiurno.current);
      formData.append("totalExtraNocturno", totalExtraNocturno.current);
      formData.append("totalHorasExtras", totalHorasExtras.current);
      formData.append(
        "minutosDiurnosAutorizados",
        minutosDiurnosAutorizados.current
      );
      formData.append(
        "minutosNocturnosAutorizados",
        minutosNocturnosAutorizados.current
      );
      formData.append("minutosAutorizados", minutosVerificados.current);
      formData.append("minutosDiurnosTotales", minutosDiurnosTotales.current);
      formData.append(
        "minutosNocturnosTotales",
        minutosNocturnosTotales.current
      );
      formData.append("ISSSdescuento", ISSSdescuento.current);
      formData.append("IPSFAdescuento", IPSFAdescuento.current);
      formData.append("AFPCRECERdescuento", AFPCRECERdescuento.current);
      formData.append("AFPCONFIAdescuento", AFPCONFIAdescuento.current);
      formData.append("retencionRenta", retencionRenta.current);
      formData.append("totalDescuentos", totalDescuentos.current);
      formData.append("sueldoparaISSS", sueldoParaISSS.current);
      formData.append("Liquido", liquido.current);
      formData.append("ISSSaporte", ISSSaporte.current);
      formData.append("IPSFAaporte", IPSFAaporte.current);
      formData.append("AFPCRECERaporte", AFPCRECERaporte.current);
      formData.append("AFPCONFIAaporte", AFPCONFIAaporte.current);
      formData.append("totalAportaciones", totalAportaciones.current);
      formData.append("usuarioJefe", usuarioJefe);
      formData.append("ubicacionEstacion", ubicacionEstacion);
      formData.append(
        "sumatoriaHorasDiurnasNormales",
        sumatoriaHorasDiurnasNormales
      );
      formData.append(
        "sumatoriaHorasNocturnasNormales",
        sumatoriaHorasNocturnasNormales
      );
      formData.append("sumatoriaHorasNormales", sumatoriaHorasNormales);
      formData.append("sueldoMasHorasExtras", sueldoMasHorasExtras.current);
      formData.append("totalAportHoras", TOTAL.current);
      formData.append("idSelectTop", longitud);
      formData.append("idEmpleados", IdEmpleado.current);
      formData.append("fechaCreacion",fechaCreacion.current);
      formData.append("Verificacion",verificacion.current);
      formData.append("idUsuario",idUsuario.current);

      crearReportes(formData).then(res=>{
        setReportes(oldValue=>[res,...oldValue]);
        limpiarEmpleados();
        setCargando(false);
        handleClose();
        mostrarNotificacion();
      }).catch(error=>{
        console.log({ error });
        mostrarNotificacion(true);
        setCargando(false);
      })
  };

  return {
    GenerarReporte,
  };
};
