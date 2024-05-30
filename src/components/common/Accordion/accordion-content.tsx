import { motion, useAnimation } from "framer-motion";
import { useRef, useState, useLayoutEffect, useEffect } from "react";

import { useAccordionContext } from "./context";
import { StyledContentContainer } from "./styles";

export const AccordionContent = ({ children }: { children: React.ReactNode }) => {
  const { expanded } = useAccordionContext();
  const controls = useAnimation();
  const contentRef = useRef<HTMLDivElement>(null);

  const [lineHeight, setLineHeight] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const [isClosing, setIsClosing] = useState(false);

  useLayoutEffect(() => {
    if (contentRef.current) {
      const computedStyle = getComputedStyle(contentRef.current);
      setLineHeight(parseFloat(computedStyle.lineHeight));
      setContentHeight(contentRef.current.scrollHeight);
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

  const transition = { type: "tween", duration: 0.6, ease: [0.4, 0, 0.2, 1] };

  return (
    <StyledContentContainer
      ref={contentRef}
      as={motion.div}
      initial={{ height: lineHeight }}
      animate={controls}
      transition={transition}
      expanded={expanded}
      isClosing={isClosing}
      role="region"
      data-state={expanded ? "open" : "closed"}
    >
      {children}
    </StyledContentContainer>
  );
};
