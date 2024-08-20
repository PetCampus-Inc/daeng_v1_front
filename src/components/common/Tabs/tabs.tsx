import React, { createContext, useContext, useId, useState, forwardRef } from "react";

import { Slot, Slottable } from "../Slot";

/* -------------------------------------------------------------------------------------------------
 * Tabs
 * -----------------------------------------------------------------------------------------------*/

type TabsContextValue = {
  baseId: string;
  value: string | undefined;
  onValueChange: (value: string) => void;
  activationMode: "automatic" | "manual";
};

const TabsContext = createContext<TabsContextValue | null>(null);

const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs components must be used within a Tabs component");
  }
  return context;
};

type TabsProps = {
  /** controlled 컴포넌트로 사용 시, 선택된 탭*/
  value?: string;
  /** uncontrolled 컴포넌트로 사용 시, 기본적으로 선택된 탭 */
  defaultValue?: string;
  /** 새로운 탭이 선택될 때 호출되는 함수 */
  onValueChange?: (value: string) => void;
  /**
   * 탭이 자동으로 활성화될지 또는 수동으로 활성화될지 여부
   * @defaultValue automatic
   */
  activationMode?: "automatic" | "manual";
  children: React.ReactNode;
};

const TabsRoot = forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      value: controlledValue,
      defaultValue,
      onValueChange,
      activationMode = "automatic",
      children,
      ...props
    },
    ref
  ) => {
    const isControlled = controlledValue !== undefined;
    const [value, setValue] = useState(defaultValue);
    const baseId = useId();

    const handleValueChange = (newValue: string) => {
      if (!isControlled) {
        setValue(newValue);
      }
      onValueChange?.(newValue);
    };

    return (
      <TabsContext.Provider
        value={{
          baseId,
          value,
          onValueChange: handleValueChange,
          activationMode
        }}
      >
        <div ref={ref} {...props}>
          {children}
        </div>
      </TabsContext.Provider>
    );
  }
);

/* -------------------------------------------------------------------------------------------------
 * TabsList
 * -----------------------------------------------------------------------------------------------*/

type TabsListProps = {
  children: React.ReactNode;
};

const TabsList = forwardRef<HTMLDivElement, TabsListProps>(({ children, ...props }, ref) => {
  const { baseId } = useTabsContext();

  return (
    <div ref={ref} role="tablist" id={`${baseId}-list`} {...props}>
      {children}
    </div>
  );
});

/* -------------------------------------------------------------------------------------------------
 * TabsTrigger
 * -----------------------------------------------------------------------------------------------*/

type TabsTriggerProps = {
  value: string;
  disabled?: boolean;
  children: React.ReactNode;
};

const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ value, disabled = false, children, ...props }, ref) => {
    const { baseId, value: selectedValue, onValueChange, activationMode } = useTabsContext();
    const isSelected = value === selectedValue;

    const handleClick = () => {
      if (!disabled) {
        onValueChange(value);
      }
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        onValueChange(value);
      }
    };

    const handleFocus = () => {
      const isAutomaticActivation = activationMode !== "manual";
      if (!isAutomaticActivation && !isSelected && !disabled) {
        onValueChange(value);
      }
    };

    return (
      <Slot>
        <button
          ref={ref}
          role="tab"
          aria-selected={isSelected}
          aria-controls={`${baseId}-content-${value}`}
          data-state={isSelected ? "active" : "inactive"}
          data-disabled={disabled ? "" : undefined}
          disabled={disabled}
          id={`${baseId}-trigger-${value}`}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          {...props}
        >
          <Slottable>{children}</Slottable>
        </button>
      </Slot>
    );
  }
);

/* -------------------------------------------------------------------------------------------------
 * TabsContent
 * -----------------------------------------------------------------------------------------------*/

type TabsContentProps = {
  value: string;
  children: React.ReactNode;
};

const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  ({ value, children, ...props }, ref) => {
    const { baseId, value: selectedValue } = useTabsContext();
    const isSelected = value === selectedValue;

    if (!isSelected) {
      return null;
    }

    return (
      <div
        ref={ref}
        role="tabpanel"
        aria-labelledby={`${baseId}-trigger-${value}`}
        id={`${baseId}-content-${value}`}
        tabIndex={0}
        data-state={isSelected ? "active" : "inactive"}
        {...props}
      >
        {children}
      </div>
    );
  }
);

const Root = TabsRoot;
const List = TabsList;
const Trigger = TabsTrigger;
const Content = TabsContent;

export {
  Root,
  List,
  Trigger,
  Content,
  //
  useTabsContext
};

export type { TabsProps, TabsListProps, TabsTriggerProps, TabsContentProps };
