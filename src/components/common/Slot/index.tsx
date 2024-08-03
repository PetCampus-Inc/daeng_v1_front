import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
  type Ref
} from "react";
import { composeRefs } from "styles/utils";

/* -------------------------------------------------------------------------------------------------
 * Slot
 * -----------------------------------------------------------------------------------------------*/

interface SlotProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
}

const Slot = forwardRef<HTMLElement, SlotProps>(function Slot(props, forwardedRef) {
  const { children, ...slotProps } = props;

  const childrenArray = Children.toArray(children);
  const slottable = childrenArray.find(isSlottable);

  if (slottable) {
    // Slottable의 자식을 새로운 렌더링 대상으로 사용합니다
    const newElement = slottable.props.children;

    const newChildren = childrenArray.map((child) => {
      if (child === slottable) {
        // Slottable의 자식이 새로운 컴포넌트가 되므로,
        // 그 컴포넌트의 자식(newElement.props.children)들만 추출하여 사용합니다
        if (Children.count(newElement) > 1) {
          return Children.only(null);
        }

        return isValidElement<{ children: ReactNode }>(newElement)
          ? newElement.props.children
          : null;
      } else {
        return child;
      }
    });

    return isValidElement(newElement) ? (
      <SlotClone {...slotProps} ref={forwardedRef}>
        {cloneElement(newElement, undefined, newChildren) as ReactElementWithRef}
      </SlotClone>
    ) : null;
  }

  const onlyChild = Children.only(children);

  return (
    <SlotClone {...slotProps} ref={forwardedRef}>
      {onlyChild as ReactElementWithRef}
    </SlotClone>
  );
});

/* -------------------------------------------------------------------------------------------------
 * SlotClone
 * -----------------------------------------------------------------------------------------------*/

interface ReactElementWithRef extends ReactElement {
  ref: Ref<HTMLElement>;
}

interface SlotCloneProps extends HTMLAttributes<HTMLElement> {
  children: ReactElementWithRef;
}

const SlotClone = forwardRef<HTMLElement, SlotCloneProps>(function SlotClone(props, forwardedRef) {
  const { children, ...slotProps } = props;

  return isValidElement(children)
    ? cloneElement(children, {
        ...mergeProps(slotProps, children.props),
        ref: forwardedRef ? composeRefs(forwardedRef, children.ref) : children.ref
      })
    : null;
});

/* -------------------------------------------------------------------------------------------------
 * Slottable
 * -----------------------------------------------------------------------------------------------*/

const Slottable = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

/* ---------------------------------------------------------------------------------------------- */

type AnyProps = Record<string, any>;

function isSlottable(child: ReactNode): child is ReactElement {
  return isValidElement(child) && child.type === Slottable;
}

function mergeProps(slotProps: AnyProps, childProps: AnyProps) {
  // all child props should override
  const overrideProps = { ...childProps };

  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];

    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler) {
      // if the handler exists on both, we compose them
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = (...args: unknown[]) => {
          childPropValue(...args);
          slotPropValue(...args);
        };
      }
      // but if it exists only on the slot, we use only this one
      else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    }
    // if it's `style`, we merge them
    else if (propName === "style") {
      overrideProps[propName] = { ...slotPropValue, ...childPropValue };
    } else if (propName === "className") {
      overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(" ");
    }
  }

  return { ...slotProps, ...overrideProps };
}

export { Slot, Slottable };
export type { SlotProps };
