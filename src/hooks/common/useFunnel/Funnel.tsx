import { Children, isValidElement, ReactElement, ReactNode, useEffect } from "react";

import type { NonEmptyArray } from "./types";
export interface FunnelProps<Steps extends NonEmptyArray<string>> {
  steps: Steps;
  step: Steps[number];
  children: Array<ReactElement<StepProps<Steps>>> | ReactElement<StepProps<Steps>>;
}

export const Funnel = <Steps extends NonEmptyArray<string>>({
  steps,
  step,
  children
}: FunnelProps<Steps>) => {
  const validChildren = Children.toArray(children)
    .filter(isValidElement)
    .filter((i) => steps.includes((i.props as Partial<StepProps<Steps>>).name ?? "")) as Array<
    ReactElement<StepProps<Steps>>
  >;

  const targetStep = validChildren.find((child) => child.props.name === step);

  if (targetStep == null) {
    throw new Error(`${step} 스텝 컴포넌트를 찾지 못했습니다.`);
  }

  return <>{targetStep}</>;
};

export interface StepProps<Steps extends NonEmptyArray<string>> {
  name: Steps[number];
  onEnter?: () => void;
  children: ReactNode;
}

export const Step = <Steps extends NonEmptyArray<string>>({
  onEnter,
  children
}: StepProps<Steps>) => {
  useEffect(() => {
    onEnter?.();
  }, [onEnter]);

  return <>{children}</>;
};
