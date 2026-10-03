"use client";

import { Component, startTransition, type ReactNode } from "react";
import { useRouter } from "next/navigation";

interface Props {
  sectionName: string;
  children: ReactNode;
}

interface InnerProps extends Props {
  onReset: () => void;
}

interface State {
  error: Error | null;
}

class ErrorBoundaryInner extends Component<InnerProps, State> {
  constructor(props: InnerProps) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  reset = () => {
    // Re-rendering alone would replay the same failed server payload, so
    // refetch it first and clear the error in the same transition.
    startTransition(() => {
      this.props.onReset();
      this.setState({ error: null });
    });
  };

  render() {
    if (this.state.error) {
      return (
        <div
          className="border-surface-elevated bg-surface/60 rounded-xl border p-8 text-center"
          role="alert"
        >
          <p className="text-muted text-sm font-medium">
            Failed to load {this.props.sectionName}.
          </p>
          <button
            type="button"
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

export function ErrorBoundary(props: Props) {
  const router = useRouter();
  return <ErrorBoundaryInner {...props} onReset={() => router.refresh()} />;
}
