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

