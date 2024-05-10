import { useState, useMemo, useEffect, useCallback, SetStateAction } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { Funnel, FunnelProps, Step, StepProps } from "./Funnel";

import type { NonEmptyArray } from "./types";

interface SetStepOptions {
  stepChangeType?: "push" | "replace";
}

type RouteFunnelProps<Steps extends NonEmptyArray<string>> = Omit<
  FunnelProps<Steps>,
  "steps" | "step"
>;

type FunnelComponent<Steps extends NonEmptyArray<string>> = ((
  props: RouteFunnelProps<Steps>
) => JSX.Element) & {
  Step: (props: StepProps<Steps>) => JSX.Element;
};

const DEFAULT_STEP_QUERY_KEY = "funnel-step";

export const useFunnel = <Steps extends NonEmptyArray<string>>(
  steps: Steps,
  options?: {
    stepQueryKey?: string;
    initialStep?: Steps[number];
    onStepChange?: (name: Steps[number]) => void;
  }
): [
  FunnelComponent<Steps>,
  (step: Steps[number], options?: SetStepOptions, additionalQuery?: Record<string, string>) => void,
  any,
  React.Dispatch<SetStateAction<any>>
] => {
  const navigate = useNavigate();
  const location = useLocation();
  const stepQueryKey = options?.stepQueryKey ?? DEFAULT_STEP_QUERY_KEY;

  const [state, setState] = useState({});

  const currentStep = useMemo(() => {
    const queryParams = new URLSearchParams(location.search);
    return queryParams.get(stepQueryKey) || options?.initialStep || steps[0];
  }, [location, stepQueryKey, options, steps]);

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
          return <Funnel<Steps> steps={steps} step={currentStep as Steps[number]} {...props} />;
        },
        { Step }
      ),
    [steps, currentStep]
  );

  const setStep = useCallback(
    (
      step: Steps[number],
      { stepChangeType = "push" }: SetStepOptions = {},
      additionalQuery: Record<string, string> = {}
    ) => {
      const queryParams = new URLSearchParams(location.search);
      queryParams.set(stepQueryKey, step);
      Object.keys(additionalQuery).forEach((key) => queryParams.set(key, additionalQuery[key]));
      options?.onStepChange?.(step);
      navigate(`${location.pathname}?${queryParams.toString()}`, {
        replace: stepChangeType === "replace"
      });
    },
    [navigate, location, stepQueryKey, options]
  );

  return [FunnelComponent, setStep, state, setState];
};
