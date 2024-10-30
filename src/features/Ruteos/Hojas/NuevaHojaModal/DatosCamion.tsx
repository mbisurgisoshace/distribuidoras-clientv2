import { NewHoja } from '../../../../types/Hoja';
import Select from '../../../../components/Select';
import { Camion } from '../../../../types/Camion';
import Input from '../../../../components/Input';

interface DatosCamionProps {
  hoja: NewHoja;
  camiones: Camion[];
  setHoja: (hoja: NewHoja) => void;
}

export function DatosCamion({ hoja, setHoja, camiones }: DatosCamionProps) {
  const camionesOptions = camiones.map((camion) => ({
    value: camion.camion_id,
    label: camion.patente,
  }));

  return (
    <div className="w-1/2">
      <Select
        id={'camion_id'}
        label="Camion"
        options={camionesOptions}
        value={hoja.camion_id!}
        onOptionChange={(value) => {
          setHoja({
            ...hoja,
            camion_id: value === -1 ? null : (value as number),
          });
        }}
      />

      <Input
        type="text"
        name="km_inicial"
        id={'km_inicial'}
        label={'Km Inicial'}
        value={hoja.km_inicial}
        onChange={(name, value) => {
          setHoja({
            ...hoja,
            [name]: value,
          });
        }}
      />
    </div>
  );
}
