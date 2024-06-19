import { motion, useAnimation } from "framer-motion";
import { cloneElement, isValidElement, useEffect, useLayoutEffect, useRef, useState } from "react";
import { accordionTransition } from "styles/animation";

import { useAccordionContext } from "./context";
import { StyledContentContainer } from "./styles";

export const AccordionContent = ({ children }: { children: React.ReactNode }) => {
  const { expanded } = useAccordionContext();
  const controls = useAnimation();
  const contentRef = useRef<HTMLDivElement>(null);
  const childrenRef = useRef<HTMLElement>(null);

  const [lineHeight, setLineHeight] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const [isClosing, setIsClosing] = useState(false);

  useLayoutEffect(() => {
    if (contentRef.current) {
      const computedStyle = getComputedStyle(contentRef.current);
      setContentHeight(contentRef.current.scrollHeight);

      // children DOM 요소인 경우
      if (childrenRef.current) {
        const childStyle = getComputedStyle(childrenRef.current);
        setLineHeight(parseFloat(childStyle.lineHeight));
      } else {
        // children DOM 요소가 아닌 경우 ContentContainer lineHeight 사용
        setLineHeight(parseFloat(computedStyle.lineHeight));
      }
    }
  }, [expanded]);

  useEffect(() => {
    if (expanded) {
      setIsClosing(false);
      controls.set({ height: lineHeight });
      controls.start({ height: contentHeight });
    } else {
      setIsClosing(true);
      controls.set({ height: contentHeight });
      controls.start({ height: lineHeight }).then(() => {
        setIsClosing(false);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expanded, contentHeight, lineHeight]);

  // cloneElement 통해 children ref 전달
  const _children = isValidElement(children)
    ? cloneElement(children as React.ReactElement<any>, { ref: childrenRef })
    : children;

  return (
    <StyledContentContainer
      ref={contentRef}
      as={motion.div}
      initial={{ height: lineHeight }}
      animate={controls}
      transition={accordionTransition}
      expanded={expanded}
      isClosing={isClosing}
      role="region"
      data-state={expanded ? "open" : "closed"}
    >
      {_children}
    </StyledContentContainer>
  );
};
