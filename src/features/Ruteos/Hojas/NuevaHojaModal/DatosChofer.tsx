import { NewHoja } from '../../../../types/Hoja';
import { Chofer } from '../../../../types/Chofer';
import Select from '../../../../components/Select';

interface DatosChoferProps {
  hoja: NewHoja;
  choferes: Chofer[];
  setHoja: (hoja: NewHoja) => void;
}

export function DatosChofer({ hoja, setHoja, choferes }: DatosChoferProps) {
  const choferesOptions = choferes.map((chofer) => ({
    value: chofer.chofer_id,
    label: `${chofer.nombre} ${chofer.apellido}`,
  }));

  return (
    <div className="w-1/2">
      <Select
        id={'chofer_id'}
        label="Chofer"
        options={choferesOptions}
        value={hoja.chofer_id!}
        onOptionChange={(value) => {
          setHoja({
            ...hoja,
            chofer_id: value === -1 ? null : (value as number),
          });
        }}
      />
      <Select
        id={'acompanante_id'}
        label="Acompanante"
        options={choferesOptions}
        value={hoja.acompanante_id!}
        onOptionChange={(value) => {
          setHoja({
            ...hoja,
            acompanante_id: value === -1 ? null : (value as number),
          });
        }}
      />
    </div>
  );
}
