import { useMemo, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { Funnel, FunnelProps, Step } from "./Funnel";
import { useQueryParam } from "../useQueryParams";

import type { NonEmptyArray } from "./types";

interface SetStepOptions {
  stepChangeType?: "push" | "replace";
}

type RouteFunnelProps<Steps extends NonEmptyArray<string>> = Omit<
  FunnelProps<Steps>,
  "steps" | "step"
>;

const DEFAULT_STEP_QUERY_KEY = "funnel-step";

export const useFunnel = <Steps extends NonEmptyArray<string>>(
  steps: Steps,
  options?: {
    stepQueryKey?: string;
    initialStep?: Steps[number];
  }
) => {
  const navigate = useNavigate();
  const location = useLocation();

  const stepQueryKey = options?.stepQueryKey ?? DEFAULT_STEP_QUERY_KEY;

  if (steps.length === 0) {
    throw new Error("steps가 비어있습니다.");
  }

  // 초기 스텝 쿼리 파라미터 설정
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (!queryParams.has(stepQueryKey) && options?.initialStep) {
      queryParams.set(stepQueryKey, options.initialStep);
      navigate(`${location.pathname}?${queryParams.toString()}`, { replace: true });
    }
  }, [navigate, location, stepQueryKey, options?.initialStep]);

  const FunnelComponent = useMemo(
    () =>
      Object.assign(
        function RouteFunnel(props: RouteFunnelProps<Steps>) {
          const step =
            useQueryParam<Steps[number]>(stepQueryKey, { required: true }) ?? options?.initialStep;

          return <Funnel<Steps> steps={steps} step={step} {...props} />;
        },
        { Step }
      ),
    []
  );

  const setStep = useCallback(
    (step: Steps[number], { stepChangeType = "push" }: SetStepOptions = {}) => {
      const queryParams = new URLSearchParams(location.search);
      queryParams.set(stepQueryKey, step);
      navigate(`${location.pathname}?${queryParams.toString()}`, {
        replace: stepChangeType === "replace"
      });
    },
    [navigate, location, stepQueryKey]
  );

  return [FunnelComponent, setStep] as const;
};
