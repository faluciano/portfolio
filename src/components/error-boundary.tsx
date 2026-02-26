"use client";

import { Component, type ReactNode } from "react";

interface Props {
  sectionName: string;
  children: ReactNode;
}

interface State {
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  reset = () => {
    this.setState({ error: null });
  };

  render() {
    if (this.state.error) {
      return (
        <div
          className="rounded-xl border p-8 text-center"
          style={{
            borderColor: "rgb(var(--color-surface-elevated))",
            backgroundColor: "rgb(var(--color-surface) / 0.6)",
          }}
          role="alert"
        >
          <p
            className="text-sm font-medium"
            style={{ color: "rgb(var(--color-text-muted))" }}
          >
            Failed to load {this.props.sectionName}.
          </p>
          <button
            onClick={this.reset}
            className="bg-primary-600 hover:bg-primary-700 mt-4 rounded-lg px-4 py-2 text-sm font-semibold text-white transition-colors"
          >
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
