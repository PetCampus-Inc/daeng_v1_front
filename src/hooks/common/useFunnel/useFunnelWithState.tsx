import equal from "fast-deep-equal/es6";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Funnel, FunnelProps, Step, StepProps } from "./Funnel";
import { NonEmptyArray } from "./types";
import { useQueryParam } from "../useQueryParams";

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

export interface UseFunnelReturn<Steps extends NonEmptyArray<string>, State> {
  FunnelComponent: FunnelComponent<Steps>;
  setStep: (step: Steps[number], options?: SetStepOptions) => void;
  withState: <S extends State>(
    initialState: S
  ) => readonly [
    FunnelComponent<Steps>,
    S,
    (next: Partial<S> | ((next: Partial<S>) => S & { step: Steps[number] })) => void
  ];
}

const DEFAULT_STEP_QUERY_KEY = "funnel-step";

export const useFunnel = <Steps extends NonEmptyArray<string>>(
  steps: Steps,
  options?: {
    stepQueryKey?: string;
    initialStep?: Steps[number];
  }
): readonly [FunnelComponent<Steps>, (step: Steps[number], options?: SetStepOptions) => void] & {
  withState: <StateExcludeStep extends Record<string, unknown> & { step?: never }>(
    initialState: StateExcludeStep
  ) => [
    FunnelComponent<Steps>,
    StateExcludeStep,
    (
      next:
        | Partial<StateExcludeStep & { step: Steps[number] }>
        | ((
            next: Partial<StateExcludeStep & { step: Steps[number] }>
          ) => StateExcludeStep & { step: Steps[number] })
    ) => void
  ];
} => {
  const navigate = useNavigate();
  const location = useLocation();
  const stepQueryKey = options?.stepQueryKey ?? DEFAULT_STEP_QUERY_KEY;

  if (steps.length === 0) {
    throw new Error("steps가 비어있습니다.");
  }

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
        console.log("스텝 변경 예약!");
        nextPendingStepRef.current = nextStepValue.step; // 스텝 변경을 예약
      }
      nextStateRef.current = nextStepValue;

      console.log("setState 수행!");

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
  function withState<State extends Record<string, unknown>>(initialState: State) {
    if (!initializedRef.current) {
      setState(initialState);
      initializedRef.current = true;
    }
    return [FunnelComponent, state, setState] as const;
  }

  return Object.assign([FunnelComponent, setStep] as const, { withState }) as unknown as readonly [
    FunnelComponent<Steps>,
    (step: Steps[number], options?: SetStepOptions) => Promise<void>
  ] & {
    withState: <StateExcludeStep extends Record<string, unknown> & { step?: never }>(
      initialState: StateExcludeStep
    ) => [
      FunnelComponent<Steps>,
      StateExcludeStep,
      (
        next:
          | Partial<StateExcludeStep & { step: Steps[number] }>
          | ((
              next: Partial<StateExcludeStep & { step: Steps[number] }>
            ) => StateExcludeStep & { step: Steps[number] })
      ) => void
    ];
  };
};
