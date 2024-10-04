import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import SomethingWrongPage from "pages/ErrorPage/SomethingWrongPage";
import { type PropsWithChildren } from "react";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";
import { useLocation } from "react-router-dom";

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  if (
    isAxiosError<{
      errorCode: string;
      message: string;
    }>(error)
  ) {
    // responseBody의 status code에 따른 에러로깅, 에러 페이지를 보여준다.
    if (process.env.NODE_ENV === "development")
      console.log("[🚨SERVER ERROR]: ", error.response?.data);

    return <SomethingWrongPage resetErrorBoundary={resetErrorBoundary} error={undefined} />;
  } else {
    throw error;
    // 제어된 예외가 아닌 경우, 에러를 다시 던져서 UnknownBoundary로 넘어간다.
  }
};

const ApiErrorBoundary: React.FC<PropsWithChildren> = ({ children }) => {
  const { reset } = useQueryErrorResetBoundary();
  const { pathname } = useLocation();

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={reset} resetKeys={[pathname]}>
      {children}
    </ErrorBoundary>
  );
};

export default ApiErrorBoundary;
