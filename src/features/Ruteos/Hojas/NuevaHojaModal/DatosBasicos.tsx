import moment from 'moment';

import Input from '../../../../components/Input';
import Datepicker from '../../../../components/Datepicker';
import { NewHoja } from '../../../../types/Hoja';

interface DatosBasicosProps {
  hoja: NewHoja;
  setHoja: (hoja: NewHoja) => void;
}

export function DatosBasicos({ hoja, setHoja }: DatosBasicosProps) {
  return (
    <div className="w-1/2">
      <div>
        <Datepicker
          id="fecha"
          name="fecha"
          label="Fecha"
          value={
            hoja?.fecha ? moment(hoja.fecha, 'DD-MM-YYYY').toDate() : new Date()
          }
          onChange={(date) => {
            setHoja({
              ...hoja,
              fecha: moment(date).format('DD-MM-YYYY'),
            });
          }}
        />
      </div>
      <Input
        id="hoja_ruta_numero"
        type="text"
        value={hoja.hoja_ruta_numero}
        onChange={(name, value) => {
          setHoja({
            ...hoja,
            [name]: value,
          });
        }}
        name="hoja_ruta_numero"
        label="Nro de Hoja"
      />
    </div>
  );
}
