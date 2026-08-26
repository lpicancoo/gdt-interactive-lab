
import Column1 from './components/layout/Column1';
import Column2 from './components/layout/Column2';
import Column3 from './components/layout/Column3';

function App() {
  return (
    <div className="flex h-screen w-screen bg-slate-50 p-4 gap-4">
      {/* Coluna 1: Trilha Teórica & Pipeline de Exercícios Dinâmicos (350px) */}
      <div className="w-[350px] bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
        <Column1 />
      </div>

      {/* Coluna 2: Viewport 3D Interativo (Flex-1) */}
      <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm relative overflow-hidden flex flex-col">
        <Column2 />
      </div>

      {/* Coluna 3: Painel de Inspeção GD&T & Metrologia (370px) */}
      <div className="w-[370px] bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
        <Column3 />
      </div>
    </div>
  );
}

export default App;
