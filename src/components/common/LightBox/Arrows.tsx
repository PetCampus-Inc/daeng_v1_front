import ArrowLeftIcon from "assets/svg/arrow-left-icon";
import ArrowRightIcon from "assets/svg/arrow-right-icon";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo } from "react";
import styled from "styled-components";
import { arrowVariants } from "styles/foundations/animation";

import type { CustomArrowProps } from "react-slick";

interface ArrowsProps extends CustomArrowProps {
  position: "next" | "prev";
}

export function Arrows({ position, currentSlide, slideCount, ...props }: ArrowsProps) {
  const isDisabled = useMemo(() => {
    switch (position) {
      case "next":
        return slideCount && currentSlide === slideCount - 1;
      case "prev":
        return currentSlide === 0;
    }
  }, [position, currentSlide, slideCount]);

  return (
    <AnimatePresence mode="wait">
      {!isDisabled && (
        <ArrowButton
          {...props}
          className={""}
          type="button"
          as={motion.button}
          position={position}
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={arrowVariants}
          aria-label={`${position === "next" ? "다음" : "이전"} 슬라이드`}
        >
          {position === "next" && <ArrowRightIcon size={30} color="gray_4" />}
          {position === "prev" && <ArrowLeftIcon size={30} color="gray_4" />}
          <SrOnly>{position} slide</SrOnly>
        </ArrowButton>
      )}
    </AnimatePresence>
  );
}

const ArrowButton = styled.button<{ position: "next" | "prev" }>`
  position: absolute;
  top: 50%;
  z-index: 100;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: rgba(41, 41, 41, 0.55);
  color: ${({ theme }) => theme.colors.gray_4};
  ${({ position }) => (position === "prev" ? "left: 10px;" : "right: 10px;")}

  transition: background 225ms cubic-bezier(0.4, 0, 0.2, 1), color 225ms cubic-bezier(0.4, 0, 0.2, 1);

  &:hover,
  &:active {
    background: rgba(41, 41, 41, 0.75);
  }
`;

const SrOnly = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
`;
