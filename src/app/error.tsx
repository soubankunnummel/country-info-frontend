"use client";

import ErrorBoundaryComponent from "./components/error-boundary";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <ErrorBoundaryComponent error={error} reset={reset} />;
}
