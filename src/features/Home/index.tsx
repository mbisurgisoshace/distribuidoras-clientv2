import OuterWrapper from '../../layouts/OuterWrapper';
import MonitorPedidos from './Monitor/MonitorPedidos';

export default function Home() {
  return (
    <OuterWrapper fullWidth>
      <div className="flex-1 relative z-0 flex overflow-hidden h-full">
        {/* <aside className="hidden relative xl:order-first xl:flex xl:flex-col flex-shrink-0 w-96 border-r border-gray-200 overflow-y-auto">
          Filtros
        </aside> */}
        <main className="flex-1 relative z-0 overflow-auto focus:outline-none xl:order-last md:rounded-lg">
          <MonitorPedidos />
        </main>
      </div>
    </OuterWrapper>
  );
}
