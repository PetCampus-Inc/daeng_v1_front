import equal from "fast-deep-equal/es6";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Funnel, FunnelProps, Step, StepProps } from "./Funnel";
import { useQueryParam } from "../useQueryParams";

import type { NonEmptyArray } from "./types";

interface SetStepOptions {
  stepChangeType?: "push" | "replace";
}

type FunnelComponent<Steps extends NonEmptyArray<string>> = ((
  props: RouteFunnelProps<Steps>
) => JSX.Element) & {
  Step: (props: StepProps<Steps>) => JSX.Element;
};

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
): readonly [FunnelComponent<Steps>, (step: Steps[number], options?: SetStepOptions) => void] & {
  withState: <State extends Record<string, unknown>>(
    initialState: State
  ) => [
    FunnelComponent<Steps>,
    State & { step?: Steps[number] },
    (
      next:
        | Partial<State & { step?: Steps[number] }>
        | ((next: Partial<State & { step?: Steps[number] }>) => State & { step?: Steps[number] })
    ) => void
  ];
} => {
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

  type S = Record<string, unknown>;
  const [state, _setState] = useState<S>({});
  type Step = Steps[number];
  type NextState = S & { step?: Step };

  const nextPendingStepRef = useRef<Step | null>(null);
  const nextStateRef = useRef<Partial<S> | null>(null);

  const setState = useCallback(
    (next: Partial<NextState> | ((next: Partial<NextState>) => NextState)) => {
      let nextStepValue: Partial<NextState>;
      if (typeof next === "function") {
        nextStepValue = next(state);
      } else {
        nextStepValue = next;
      }

      if (nextStepValue.step != null) {
        nextPendingStepRef.current = nextStepValue.step; // 스텝 변경을 예약
      }
      nextStateRef.current = nextStepValue;
      _setState((prev) => ({ ...prev, ...nextStepValue }));
    },
    [_setState, state]
  );

  useEffect(() => {
    // 예약된 스텝이 없으면 무시
    if (nextPendingStepRef.current == null) {
      return;
    }

    // 예약된 스텝이 있고, 상태가 업데이트 되었을 때
    if (equal(nextStateRef.current, state)) {
      setStep(nextPendingStepRef.current); // 예약된 스텝으로 이동
      nextPendingStepRef.current = null; // 스텝 이동 후 예약 초기화
    }
  }, [setStep, state]); // 스테이트가 업데이트 될 때마다 이동 로직 검사

  const initializedRef = useRef(false);
  function withState<State extends Record<string, any>>(initialState: State) {
    if (!initializedRef.current) {
      setState(initialState);
      initializedRef.current = true;
    }
    return [FunnelComponent, state, setState] as const;
  }

  return Object.assign([FunnelComponent, setStep] as const, { withState }) as unknown as readonly [
    FunnelComponent<Steps>,
    (step: Steps[number], options?: SetStepOptions) => void
  ] & {
    withState: <State extends Record<string, unknown>>(
      initialState: State
    ) => [
      FunnelComponent<Steps>,
      State & { step?: Steps[number] },
      (
        next:
          | Partial<State & { step?: Steps[number] }>
          | ((next: Partial<State & { step?: Steps[number] }>) => State & { step?: Steps[number] })
      ) => void
    ];
  };
};
