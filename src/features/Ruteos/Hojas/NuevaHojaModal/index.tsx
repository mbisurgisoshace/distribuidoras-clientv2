import moment from 'moment';
import { useState } from 'react';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';

import { DatosZona, useColumns } from './DatosZona';
import { DatosCamion } from './DatosCamion';
import { DatosChofer } from './DatosChofer';
import { DatosBasicos } from './DatosBasicos';
import { useNewHojaForm } from '../useNewHojaForm';
import { Modal } from '../../../../components/Modal';
import { Step, Stepper } from '../../../../components/Stepper';

interface NuevaHojaModalProps {
  isOpen: boolean;
  onHojaAbierta: () => void;
  setIsOpen: (isOpen: boolean) => void;
}

const PASOS_APERTURA: Step[] = [
  {
    name: 'Datos basicos',
    description: 'Ingrese la fecha y el numero de hoja',
    status: 'current',
  },
  {
    name: 'Chofer',
    description: 'Ingrese el chofer y el acompanante',
    status: 'upcoming',
  },
  {
    name: 'Camion',
    description: 'Ingrese los datos del camion para el reparto',
    status: 'upcoming',
  },
  {
    name: 'Zona',
    description: 'Ingrese los datos del camion para el reparto',
    status: 'upcoming',
  },
];

export function NuevaHojaModal({
  isOpen,
  setIsOpen,
  onHojaAbierta,
}: NuevaHojaModalProps) {
  const { hoja, setHoja, zonas, choferes, camiones, isLoading, abrirHojaRuta } =
    useNewHojaForm();

  const columns = useColumns();

  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState(PASOS_APERTURA);
  const [plantillas, setPlantillas] = useState<any[]>([]);

  const table = useReactTable({
    data: plantillas,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const onNextStep = () => {
    setSteps((prev) => {
      return prev.map((step, idx) => {
        if (idx === currentStep) {
          return { ...step, status: 'complete' };
        }
        if (idx === currentStep + 1) {
          return { ...step, status: 'current' };
        }
        return step;
      });
    });

    setCurrentStep((prev) => prev + 1);
  };

  const renderStep = () => {
    if (currentStep === 0) {
      return <DatosBasicos hoja={hoja} setHoja={setHoja} />;
    }

    if (currentStep === 1) {
      return <DatosChofer hoja={hoja} setHoja={setHoja} choferes={choferes} />;
    }

    if (currentStep === 2) {
      return <DatosCamion hoja={hoja} setHoja={setHoja} camiones={camiones} />;
    }

    if (currentStep === 3) {
      return (
        <DatosZona
          hoja={hoja}
          setHoja={setHoja}
          zonas={zonas}
          setPlantilla={setPlantillas}
          table={table}
        />
      );
    }
  };

  const disableNextButton = () => {
    if (currentStep === 0 && (!hoja.fecha || !hoja.hoja_ruta_numero)) {
      return true;
    }

    if (currentStep === 1 && !hoja.chofer_id) {
      return true;
    }

    if (currentStep === 2 && !hoja.camion_id) {
      return true;
    }

    return false;
  };

  const onAbrirHoja = async () => {
    const clientes = table.getSelectedRowModel().rows.map((row) => ({
      cliente_id: row.original.cliente_id,
      condicion_venta_id: row.original.condicion_venta_id,
    }));

    await abrirHojaRuta(
      {
        ...hoja,
        fecha: moment(hoja.fecha, 'DD-MM-YYYY').format('YYYY-MM-DD'),
      },
      clientes
    );

    onHojaAbierta();
  };

  return (
    <Modal
      isOpen={isOpen}
      maxWidth="max-w-6xl"
      setIsOpen={setIsOpen}
      title="Apertura de Ruteo"
      footer={
        <div className="flex flex-row justify-between">
          <button
            onClick={() => setIsOpen(false)}
            className="mt-auto inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            Cancelar
          </button>
          <div className="flex flex-row gap-2">
            {currentStep < steps.length - 1 && (
              <button
                type="button"
                disabled={disableNextButton()}
                className="mt-auto inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => onNextStep()}
              >
                Siguiente
              </button>
            )}
            {currentStep === steps.length - 1 && (
              <button
                type="button"
                disabled={isLoading}
                className="mt-auto inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => onAbrirHoja()}
              >
                {isLoading ? 'Abriendo...' : 'Abrir Hoja'}
              </button>
            )}
          </div>
        </div>
      }
    >
      <div className="flex flex-row gap-6 w-full h-[650px]">
        <Stepper steps={steps} />
        <div className="flex justify-center w-full">{renderStep()}</div>
      </div>
    </Modal>
  );
}
