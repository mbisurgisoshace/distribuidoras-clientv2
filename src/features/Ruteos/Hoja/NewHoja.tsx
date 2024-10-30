import Datepicker from '../../../components/Datepicker';
import Input from '../../../components/Input';
import OuterWrapper from '../../../layouts/OuterWrapper';

export default function NewHoja() {
  return (
    <OuterWrapper>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Abrir Hoja de Ruta
          </h2>
        </div>
        <div className="mt-3 xl:mt-6 relative pb-3.5">
          <div className="grid grid-cols-4 gap-4 bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
            <div>
              <div className="flex items-center gap-4">
                <div>
                  <Datepicker
                    id="fecha"
                    name="fecha"
                    label="Fecha"
                    value={new Date()}
                    onChange={(date) => {}}
                    //value={pedido?.fecha ? moment(pedido.fecha, 'DD-MM-YYYY').toDate() : new Date()}
                    //   onChange={(date) => {
                    //     setPedido({
                    //       ...pedido,
                    //       fecha: moment(date).format('DD-MM-YYYY')
                    //     });
                    //   }}
                  />
                </div>
              </div>
              <Input
                id="nroHoja"
                type="text"
                value={''}
                onChange={() => {}}
                name="nroHoja"
                label="Nro de Hoja"
              />
            </div>
            <div>Chofer y Acompanante</div>
            <div>Vehiculo</div>
            <div>Zona</div>
          </div>
        </div>
      </div>
    </OuterWrapper>
  );
}
