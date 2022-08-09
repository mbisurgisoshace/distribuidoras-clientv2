import React, { useState, useEffect } from 'react';

import Select from '../../../../components/Select';
import CanalesService from '../../../../services/CanalesService';
import CondicionesVentaService from '../../../../services/CondicionesVentaService';
import PrecioService from '../../../../services/PreciosService';

interface InformacionComercialProps {
  cliente: any;
  onChangeClienteField: (field: string, value: any) => void;
}

export default function InformacionComercial({
  cliente,
  onChangeClienteField,
}: InformacionComercialProps): React.ReactElement {
  const [canales, setCanales] = useState<any[]>([]);
  const [subcanales, setSubcanales] = useState<any[]>([]);
  const [listasPrecio, setListasPrecio] = useState<any[]>([]);
  const [condicionesVenta, setCondicionesVenta] = useState<any[]>([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const canales = await CanalesService.getCanales();
    const subcanales = await CanalesService.getSubcanales();
    const listasPrecio = await PrecioService.getListasPrecio();
    const condicionesVenta =
      await CondicionesVentaService.getCondicionesVenta();

    setCanales(canales);
    setSubcanales(subcanales);
    setListasPrecio(listasPrecio);
    setCondicionesVenta(condicionesVenta);
  };

  const getSubcanalesByCanal = () => {
    if (cliente.canal_id) {
      return subcanales
        .filter((subcanal) => subcanal.canal_id === cliente.canal_id)
        .map((subcanal) => ({
          label: subcanal.subcanal,
          value: subcanal.id,
        }));
    }

    return [];
  };

  return (
    <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Informacion Comercial
          </h3>
        </div>
        <div className="mt-5 space-y-6 md:mt-0 md:col-span-2">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <Select
                label="Canal"
                value={cliente.canal_id || -1}
                options={canales.map((canal) => ({
                  label: canal.canal_nombre,
                  value: canal.canal_id,
                }))}
                onOptionChange={(value) => {
                  onChangeClienteField('canal_id', value);
                  onChangeClienteField('subcanal_id', null);
                }}
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <Select
                label="Subcanal"
                value={cliente.subcanal_id || -1}
                options={getSubcanalesByCanal()}
                onOptionChange={(value) =>
                  onChangeClienteField('subcanal_id', value)
                }
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <Select
                label="Condicion de Venta"
                value={cliente.condicion_venta_id || -1}
                options={condicionesVenta.map((condicionVenta) => ({
                  label: condicionVenta.condicion_venta_nombre,
                  value: condicionVenta.condicion_venta_id,
                }))}
                onOptionChange={(value) =>
                  onChangeClienteField('condicion_venta_id', value)
                }
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <Select
                label="Lista de Precio"
                value={cliente.lista_precio_id || -1}
                options={listasPrecio.map((listaPrecio) => ({
                  label: listaPrecio.lista_precio_nombre,
                  value: listaPrecio.lista_precio_id,
                }))}
                onOptionChange={(value) =>
                  onChangeClienteField('lista_precio_id', value)
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
