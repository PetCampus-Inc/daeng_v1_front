import { motion } from "framer-motion";
import { useLayoutEffect, useId, forwardRef } from "react";
import styled, { type CSSProp } from "styled-components";
import { dimmedAnimationVariants } from "styles/foundations/animation";
import { getPlatform } from "utils/cross-browsing";

const activeLocks = new Set<string>();

export interface FloatingOverlayProps {
  /**
   * Whether the overlay should lock scrolling on the document body.
   * @default false
   */
  lockScroll?: boolean;

  /**
   * Whether the overlay should animate in and out.
   * @default false
   */
  animate?: boolean;

  /**
   * Additional CSS properties to apply to the overlay.
   */
  css?: CSSProp;

  /**
   * The element type to render as.
   * @default "default"
   */
  type?: "dimmed" | "blurred" | "default" | "none";
}

/**
 * 고정된 오버레이 요소에 대한 기본 스타일링을 제공합니다.
 * 콘텐츠를 어둡게 하거나 떠 있는 요소 뒤에서 포인터 이벤트를 차단하는 데 사용됩니다.
 * @see https://floating-ui.com/docs/FloatingOverlay
 */
export const FloatingOverlay = forwardRef(function FloatingOverlay(
  props: React.ComponentPropsWithoutRef<"div"> & FloatingOverlayProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const { lockScroll = false, animate = false, type = "default", css, ...rest } = props;

  const lockId = useId();

  useLayoutEffect(() => {
    if (!lockScroll) return;

    activeLocks.add(lockId);

    const isIOS = /iP(hone|ad|od)|iOS/.test(getPlatform());
    const bodyStyle = document.body.style;
    // RTL <body> scrollbar
    const scrollbarX =
      Math.round(document.documentElement.getBoundingClientRect().left) +
      document.documentElement.scrollLeft;
    const paddingProp = scrollbarX ? "paddingLeft" : "paddingRight";
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const scrollX = bodyStyle.left ? parseFloat(bodyStyle.left) : window.pageXOffset;
    const scrollY = bodyStyle.top ? parseFloat(bodyStyle.top) : window.pageYOffset;

    bodyStyle.overflow = "hidden";

    if (scrollbarWidth) {
      bodyStyle[paddingProp] = `${scrollbarWidth}px`;
    }

    // 오직 iOS만 document.body의 `overflow: hidden`을 무시합니다.
    if (isIOS) {
      // iOS 12는 `visualViewport`를 지원하지 않습니다.
      const offsetLeft = window.visualViewport?.offsetLeft || 0;
      const offsetTop = window.visualViewport?.offsetTop || 0;

      Object.assign(bodyStyle, {
        position: "fixed",
        top: `${-(scrollY - Math.floor(offsetTop))}px`,
        left: `${-(scrollX - Math.floor(offsetLeft))}px`,
        right: "0"
      });
    }

    return () => {
      activeLocks.delete(lockId);

      if (activeLocks.size === 0) {
        Object.assign(bodyStyle, {
          overflow: "",
          [paddingProp]: ""
        });

        if (isIOS) {
          Object.assign(bodyStyle, {
            position: "",
            top: "",
            left: "",
            right: ""
          });
          window.scrollTo(scrollX, scrollY);
        }
      }
    };
  }, [lockId, lockScroll]);

  return (
    <StyledFloatingElm
      as={animate ? motion.div : "div"}
      animate={animate ? "animate" : undefined}
      exit={animate ? "exit" : undefined}
      initial={animate ? "initial" : undefined}
      variants={animate ? dimmedAnimationVariants : undefined}
      ref={ref}
      type={type}
      css={css}
      {...rest}
    />
  );
});

const StyledFloatingElm = styled.div.withConfig({
  shouldForwardProp: (prop) => !["type", "css"].includes(prop)
})<{
  type: "dimmed" | "blurred" | "default" | "none";
  css?: CSSProp;
}>`
  position: fixed;
  overflow: auto;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  ${({ type }) =>
    type === "dimmed" &&
    `
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 10;
  `}

  ${({ type }) =>
    type === "blurred" &&
    `
    backdrop-filter: blur(10px);
    z-index: 10;
  `}

  ${({ type }) =>
    type === "default" &&
    `
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 10;
  `}

  ${({ type }) =>
    type === "none" &&
    `
    background-color: transparent;
    z-index: 10;
  `}

  ${({ css }) => css};
`;
