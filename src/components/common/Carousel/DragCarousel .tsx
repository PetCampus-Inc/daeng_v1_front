import type { PropsWithChildren } from "react";

import { useDragCarousel } from "./hooks/useDragCarousel";
import { CarouselBox } from "./styles";
import { Flex } from "../Flex";

interface DragCarouselProps {
  gap: number;
}

export function DragCarousel({ gap, children }: PropsWithChildren<DragCarouselProps>) {
  const { style, ref, handleTouchStart, handleTouchMove, handleTouchEnd } = useDragCarousel();

  return (
    <CarouselBox>
      <Flex
        display="inline-flex"
        ref={ref}
        gap={gap}
        style={style}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {children}
      </Flex>
    </CarouselBox>
  );
}
