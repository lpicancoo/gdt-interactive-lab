import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught Error in GD&T Interactive Lab:", error, errorInfo);
    this.setState({ errorInfo });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen w-full bg-slate-900 text-white p-8 flex flex-col items-center justify-center font-sans">
          <div className="bg-slate-800 border-2 border-rose-500 rounded-2xl p-6 max-w-2xl w-full shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-rose-400">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h1 className="text-xl font-bold">Erro de Renderização Detectado</h1>
            </div>

            <p className="text-sm text-slate-300">
              Ocorreu uma exceção não tratada na interface. Veja os detalhes do erro abaixo:
            </p>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-700 font-mono text-xs text-rose-300 overflow-x-auto max-h-60 whitespace-pre-wrap">
              {this.state.error?.toString()}
              {this.state.errorInfo?.componentStack}
            </div>

            <div className="pt-2 flex gap-3">
              <button
                onClick={() => window.location.reload()}
                className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-4 py-2 rounded-lg text-xs transition-colors"
              >
                Recarregar Aplicação
              </button>
              <button
                onClick={() => {
                  localStorage.clear();
                  window.location.reload();
                }}
                className="bg-slate-700 hover:bg-slate-600 text-white font-bold px-4 py-2 rounded-lg text-xs transition-colors"
              >
                Limpar Cache e Recarregar
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
