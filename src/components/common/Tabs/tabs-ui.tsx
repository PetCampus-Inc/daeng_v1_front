import FootIcon from "assets/svg/foot-icon";
import { AnimatePresence } from "framer-motion";
import { forwardRef, createContext, useContext } from "react";

import * as Styled from "./styles";
import * as TabsPrimitive from "./tabs";
import { Box } from "../Box";

import type { CSSProp } from "styled-components";

export type TabsVariant = "underline" | "divider" | "toggle";

type TabsContextValue = {
  variant?: TabsVariant;
};

const VariantContext = createContext<TabsContextValue | undefined>(undefined);

const useVariant = () => {
  const context = useContext(VariantContext);
  if (!context) {
    throw new Error("useVariant must be used within a Tabs component");
  }
  return context.variant;
};

type TabsProps = {
  /**
   * Tabs의 스타일링 타입
   * @defaultValue underline
   */
  variant?: TabsVariant;
  /**
   * 스타일링을 위한 CSS 프로퍼티
   */
  css?: CSSProp;
} & React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>;

const Tabs = forwardRef<React.ElementRef<typeof TabsPrimitive.Root>, TabsProps>(
  ({ variant = "underline", css, ...props }, ref) => (
    <VariantContext.Provider value={{ variant }}>
      <Styled.RootContainer
        as={TabsPrimitive.Root}
        ref={ref}
        variant={variant}
        css={css}
        {...props}
      />
    </VariantContext.Provider>
  )
);

const TabsList = forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & {
    css?: CSSProp;
  }
>(({ css, ...props }, ref) => {
  const variant = useVariant();

  return (
    <Styled.ListContainer
      as={TabsPrimitive.List}
      ref={ref}
      variant={variant}
      css={css}
      {...props}
    />
  );
});

const TabsTrigger = forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & {
    css?: CSSProp;
  }
>(({ css, ...props }, ref) => {
  const { value, baseId } = TabsPrimitive.useTabsContext();
  const variant = useVariant();
  const isSelected = props.value === value;

  return (
    <Styled.TriggerButton
      as={TabsPrimitive.Trigger}
      ref={ref}
      variant={variant}
      css={css}
      {...props}
    >
      {variant === "underline" && (
        <>
          {props.children}
          {isSelected && <Styled.Underline layoutId={baseId} />}
        </>
      )}
      {variant === "toggle" && (
        <>
          {isSelected && (
            <Styled.Bubble
              layoutId={`${baseId}-bubble`}
              transition={{ type: "spring", bounce: 0.1, duration: 0.6 }}
            />
          )}
          <Styled.Label selected={isSelected}>{props.children}</Styled.Label>
        </>
      )}
      {variant === "divider" && (
        <Box position="relative" display="flex" align="center" justify="center">
          <AnimatePresence initial={false}>
            {isSelected && (
              <Styled.IconWrapper
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
              >
                <FootIcon w={16} h={16} />
              </Styled.IconWrapper>
            )}
          </AnimatePresence>
          {props.children}
        </Box>
      )}
    </Styled.TriggerButton>
  );
});

const TabsContent = forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> & {
    css?: CSSProp;
  }
>(({ css, ...props }, ref) => {
  const variant = useVariant();

  return (
    <Styled.ContentContainer
      as={TabsPrimitive.Content}
      ref={ref}
      variant={variant}
      css={css}
      {...props}
    />
  );
});

Tabs.displayName = "Tabs";
TabsList.displayName = "TabsList";
TabsTrigger.displayName = "TabsTrigger";
TabsContent.displayName = "TabsContent";

const Root = Tabs;
const List = TabsList;
const Trigger = TabsTrigger;
const Content = TabsContent;

export { Root, List, Trigger, Content };
