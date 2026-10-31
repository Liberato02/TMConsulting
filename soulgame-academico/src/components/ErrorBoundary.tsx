import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  erro: Error | null;
}

// Rede de segurança: se qualquer componente da árvore quebrar (ex: dado
// inesperado no localStorage, bug não previsto), mostra uma tela amigável
// em vez de deixar a página inteira em branco sem explicação nenhuma.
export class ErrorBoundary extends Component<Props, State> {
  state: State = { erro: null };

  static getDerivedStateFromError(erro: Error): State {
    return { erro };
  }

  componentDidCatch(erro: Error, info: ErrorInfo) {
    console.error("Erro capturado pelo ErrorBoundary:", erro, info.componentStack);
  }

  handleRecarregar = () => {
    this.setState({ erro: null });
    window.location.href = "/desafios";
  };

  render() {
    if (this.state.erro) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
          <div className="max-w-sm w-full bg-white rounded-2xl shadow-lg p-6 text-center">
            <p className="text-3xl mb-2">😕</p>
            <h1 className="font-bold text-slate-800 mb-1">Algo deu errado</h1>
            <p className="text-sm text-slate-600 mb-4">
              Encontramos um erro inesperado. Isso pode acontecer com dados de
              teste antigos. Tente voltar ao Painel.
            </p>
            <p className="text-xs text-slate-600 bg-slate-50 rounded-lg p-2 mb-4 font-mono break-words">
              {this.state.erro.message}
            </p>
            <button
              onClick={this.handleRecarregar}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-4 py-2 text-sm"
            >
              Voltar ao Painel
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
