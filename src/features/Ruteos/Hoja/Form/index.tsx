import moment from 'moment';
import numeral from 'numeral';

import { useHojaForm } from './useHojaForm';
import Input from '../../../../components/Input';
import Select from '../../../../components/Select';
import { Pedido } from '../../../../types/Pedidos';
import Datepicker from '../../../../components/Datepicker';
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  XCircleIcon,
} from '@heroicons/react/outline';

interface FormProps {
  hojaId: any;
  pedidos: Pedido[];
}

export default function Form({
  hojaId,
  pedidos,
}: FormProps): React.ReactElement {
  const {
    hoja,
    zonas,
    onSubmit,
    camiones,
    choferes,
    isLoading,
    actualizarHoja,
    onHojaFieldChanged,
  } = useHojaForm(hojaId);

  const zonasOptions = zonas.map((zona) => ({
    value: zona.zona_id,
    label: zona.zona_nombre,
  }));

  const camionesOptions = camiones.map((camion) => ({
    value: camion.camion_id,
    label: camion.patente,
  }));

  const choferesOptions = choferes.map((chofer) => ({
    value: chofer.chofer_id,
    label: `${chofer.nombre} ${chofer.apellido}`,
  }));

  const getVentaContado = () => {
    return pedidos
      .filter(
        (pedido) =>
          pedido.condicion_venta_id === 1 && pedido.estado_movimiento_id === 3
      )
      .reduce((acc, pedido) => {
        return (
          acc +
          pedido.items.reduce((accItem, item) => {
            return accItem + (item.monto as number);
          }, 0)
        );
      }, 0);
  };

  const getVentaNoContado = () => {
    return pedidos
      .filter(
        (pedido) =>
          pedido.condicion_venta_id !== 1 && pedido.estado_movimiento_id === 3
      )
      .reduce((acc, pedido) => {
        return (
          acc +
          pedido.items.reduce((accItem, item) => {
            return accItem + (item.monto as number);
          }, 0)
        );
      }, 0);
  };

  const getTotalGastos = () => {
    const combustible = (hoja?.gasto_combustible || 0).toString();
    const viaticos = (hoja?.gasto_viatico || 0).toString();
    const otros = (hoja?.gasto_otro || 0).toString();

    return parseFloat(combustible) + parseFloat(viaticos) + parseFloat(otros);
  };

  const getTotalRendir = () => {
    const cobranza = (hoja?.cobranza || 0).toString();

    return getVentaContado() + parseFloat(cobranza) - getTotalGastos();
  };

  const checkControles = () => {
    const controles: {
      motivo: boolean;
      rendicion: boolean;
      controlStock: boolean;
    } = {
      motivo: false,
      rendicion: false,
      controlStock: false,
    };

    const cheques = (hoja?.cheques || 0).toString();
    const efectivo = (hoja?.efectivo || 0).toString();

    if (
      pedidos.some(
        (pedido) =>
          pedido.estado_movimiento_id !== 3 &&
          pedido.tipo_movimiento_id === 1 &&
          !pedido.motivo_id
      )
    ) {
      controles['motivo'] = true;
    }

    if (parseFloat(cheques) + parseFloat(efectivo) !== getTotalRendir()) {
      controles['rendicion'] = true;
    }

    if (!hoja?.control_stock) {
      controles['controlStock'] = true;
    }

    return controles;
  };

  const isCheckControlPass = () => {
    const controles = checkControles();
    return !Object.values(controles).some((control) => control);
  };

  return (
    <form onSubmit={onSubmit} className="mt-0 sm:mt-3.5 pb-3.5 space-y-6">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="grid grid-cols-12 gap-5">
            <div className="flex flex-col col-span-3">
              <div>
                <Datepicker
                  id="fecha"
                  name="fecha"
                  label="Fecha"
                  value={
                    hoja?.fecha
                      ? moment(hoja.fecha, 'YYYY-MM-DD').toDate()
                      : moment().tz('America/Buenos_Aires').toDate()
                  }
                  onChange={(date) => {
                    onHojaFieldChanged(
                      'fecha',
                      moment(date).format('DD-MM-YYYY')
                    );
                  }}
                />
              </div>
              <Input
                type="text"
                label="Nro de Hoja"
                id="hoja_ruta_numero"
                name="hoja_ruta_numero"
                onChange={onHojaFieldChanged}
                value={hoja?.hoja_ruta_numero || ''}
              />
              <Input
                type="text"
                label="Km Inicial"
                id="km_inicial"
                name="km_inicial"
                onChange={onHojaFieldChanged}
                value={hoja?.km_inicial || ''}
              />
              <Input
                type="text"
                label="Km Final"
                id="km_final"
                name="km_final"
                onChange={onHojaFieldChanged}
                value={hoja?.km_final || ''}
              />
              <Select
                id={'zona_id'}
                label="Zona"
                options={zonasOptions}
                value={hoja?.zona_id || ''}
                onOptionChange={(value) => {
                  onHojaFieldChanged('zona_id', value);
                }}
              />
              <Select
                id={'chofer_id'}
                label="Chofer"
                options={choferesOptions}
                value={hoja?.chofer_id || ''}
                onOptionChange={(value) => {
                  onHojaFieldChanged('chofer_id', value);
                }}
              />
              <Select
                id={'acompanante_id'}
                label="Acompañante"
                options={choferesOptions}
                value={hoja?.acompanante_id || ''}
                onOptionChange={(value) => {
                  onHojaFieldChanged('acompanante_id', value);
                }}
              />
              <Select
                id={'camion_id'}
                label="Camion"
                options={camionesOptions}
                value={hoja?.camion_id || ''}
                onOptionChange={(value) => {
                  onHojaFieldChanged('camion_id', value);
                }}
              />
            </div>
            <div className="flex flex-row col-span-9 w-full">
              <div className="flex flex-row w-full gap-4">
                <div className="rounded-md bg-slate-100/40 p-2 flex-col flex-1">
                  <span className="text-indigo-600 font-semibold text-[14px]">
                    Condiciones de Pago
                  </span>
                  <div className="flex gap-4 flex-col">
                    <div>
                      <Input
                        disabled
                        type="text"
                        label="Contado"
                        id="venta_contado"
                        name="venta_contado"
                        onChange={onHojaFieldChanged}
                        value={numeral(getVentaContado()).format('$0,0.00')}
                      />
                    </div>
                    <div>
                      <Input
                        disabled
                        type="text"
                        label="No Contado"
                        id="venta_ctacte"
                        name="venta_ctacte"
                        onChange={onHojaFieldChanged}
                        value={numeral(getVentaNoContado()).format('$0,0.00')}
                      />
                    </div>
                  </div>
                </div>
                <div className="rounded-md bg-slate-100/40 p-2  flex-col flex-1">
                  <span className="text-indigo-600 font-semibold text-[14px]">
                    Gastos
                  </span>
                  <div className="flex gap-4 flex-col">
                    <div>
                      <Input
                        type="number"
                        label="Combustible"
                        id="gasto_combustible"
                        name="gasto_combustible"
                        onChange={onHojaFieldChanged}
                        value={hoja?.gasto_combustible || 0}
                      />
                    </div>
                    <div>
                      <Input
                        type="number"
                        label="Viaticos"
                        id="gasto_viatico"
                        name="gasto_viatico"
                        onChange={onHojaFieldChanged}
                        value={hoja?.gasto_viatico || 0}
                      />
                    </div>
                    <div>
                      <Input
                        type="number"
                        label="Otros"
                        id="gasto_otro"
                        name="gasto_otro"
                        onChange={onHojaFieldChanged}
                        value={hoja?.gasto_otro || 0}
                      />
                    </div>
                  </div>
                </div>
                <div className="rounded-md bg-slate-100/40 p-2  flex-col flex-1">
                  <span className="text-indigo-600 font-semibold text-[14px]">
                    Rendicion
                  </span>
                  <div className="flex gap-4 flex-col">
                    <div>
                      <Input
                        disabled
                        type="text"
                        label="Contado"
                        id="contado"
                        name="contado"
                        onChange={onHojaFieldChanged}
                        value={numeral(getVentaContado()).format('$0,0.00')}
                      />
                    </div>
                    <div>
                      <Input
                        type="text"
                        label="Cobranzas"
                        id="cobranza"
                        name="cobranza"
                        onChange={onHojaFieldChanged}
                        value={hoja?.cobranza || 0}
                      />
                    </div>
                    <div>
                      <Input
                        disabled
                        type="text"
                        label="Gastos"
                        id="gastos"
                        name="gastos"
                        onChange={onHojaFieldChanged}
                        value={numeral(getTotalGastos()).format('$0,0.00')}
                      />
                    </div>
                  </div>
                  <div className="flex gap-4 flex-col">
                    <div>
                      <Input
                        disabled
                        type="text"
                        label="Rendir"
                        id="rendir"
                        name="rendir"
                        onChange={onHojaFieldChanged}
                        value={numeral(getTotalRendir()).format('$0,0.00')}
                      />
                    </div>
                    <div>
                      <Input
                        type="text"
                        label="Efectivo"
                        id="efectivo"
                        name="efectivo"
                        onChange={onHojaFieldChanged}
                        value={hoja?.efectivo || 0}
                      />
                    </div>
                    <div>
                      <Input
                        type="text"
                        label="Cheques"
                        id="cheques"
                        name="cheques"
                        onChange={onHojaFieldChanged}
                        value={hoja?.cheques || 0}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-2 bg-yellow-200/20 shadow px-4 py-5 gap-2 sm:rounded-lg sm:p-6 flex flex-col relative">
        <ExclamationCircleIcon className="h-8 w-8 text-yellow-500 absolute top-5 right-5" />
        <span className="text-yellow-500 font-semibold text-xl">Controles</span>
        <span className={`text-sm flex items-center gap-2`}>
          {checkControles().motivo ? (
            <XCircleIcon className="h-5 w-5 text-red-600" />
          ) : (
            <CheckCircleIcon className="h-5 w-5 text-green-600" />
          )}
          Los preruteos no entregados deben contar con un motivo.
        </span>
        <span className={`text-sm flex items-center gap-2`}>
          {checkControles().rendicion ? (
            <XCircleIcon className="h-5 w-5 text-red-600" />
          ) : (
            <CheckCircleIcon className="h-5 w-5 text-green-600" />
          )}
          La suma de efectivo y cheques debe ser igual a la suma a rendir.
        </span>
        <span className={`text-sm flex items-center gap-2`}>
          {checkControles().controlStock ? (
            <XCircleIcon className="h-5 w-5 text-red-600" />
          ) : (
            <CheckCircleIcon className="h-5 w-5 text-green-600" />
          )}
          La hoja de ruta debe tener echo el control de stock.
        </span>
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={actualizarHoja}
          disabled={isLoading || !hoja?.estado}
          className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Guardar
        </button>
        <button
          type="submit"
          disabled={isLoading || !isCheckControlPass() || !hoja?.estado}
          className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cerrar Hoja
        </button>
      </div>
    </form>
  );
}
