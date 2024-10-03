import React, { useState, useEffect } from "react";

import { DotContainer, DotWrapper } from "./styles";

interface SliderDotsProps {
  dots: React.ReactElement[];
  numDotsToShow: number;
  dotWidth: number;
  dotContainerClassName?: string;
  activeDotClassName?: string;
  prevNextDotClassName?: string;
}

export function SliderDots({
  dots,
  numDotsToShow,
  dotWidth,
  dotContainerClassName = "custom-dots slick-dots",
  activeDotClassName = "slick-active",
  prevNextDotClassName = "small"
}: SliderDotsProps) {
  const [minIndex, setMinIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);
  const [breakPointActiveIndex, setBreakPointActiveIndex] = useState(0);
  const [prevActiveIndex, setPrevActiveIndex] = useState(0);
  const [addActiveClassToLastDot, setAddActiveClassToLastDot] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [prevDots, setPrevDots] = useState<React.ReactElement[]>([]);

  useEffect(() => {
    setPrevDots(dots);
  }, [dots]);

  useEffect(() => {
    const active = dots.find((dot) => dot.props.className === activeDotClassName);
    const activeIndex = active ? parseInt(active.key as string) : breakPointActiveIndex;
    const isMovingForward = activeIndex >= prevActiveIndex;

    if (activeIndex > numDotsToShow - 2 || hasAnimated) {
      if (isMovingForward) {
        if (activeIndex === maxIndex && activeIndex !== dots.length - 1) {
          setMinIndex(activeIndex - (numDotsToShow - 2));
          setMaxIndex(activeIndex + 1);
        } else {
          if (minIndex === 0 && maxIndex === 0) {
            if (activeIndex === dots.length - 1) {
              setMaxIndex(activeIndex);
              setMinIndex(maxIndex - (numDotsToShow - 1));
            } else {
              const newMinIndex = activeIndex - 1 < 0 ? 0 : activeIndex - 1;
              const newMaxIndex =
                newMinIndex + (numDotsToShow - 1) > dots.length - 1
                  ? dots.length - 1
                  : newMinIndex + (numDotsToShow - 1);
              setMinIndex(newMinIndex);
              setMaxIndex(newMaxIndex);
            }
          } else {
            if (activeIndex === dots.length - 1) {
              setMaxIndex(dots.length - 1);
              setMinIndex(dots.length - numDotsToShow);
            }
          }
        }
      } else {
        if (activeIndex === minIndex && activeIndex !== 0) {
          setMinIndex(activeIndex - 1);
          setMaxIndex(minIndex + (numDotsToShow - 1));
        } else {
          if (activeIndex === 0) {
            setMaxIndex(numDotsToShow - 1);
            setMinIndex(0);
          }
        }
      }

      setHasAnimated(true);
    } else {
      const lastViewableDotIndex = Math.min(numDotsToShow, dots.length) - 1;
      setMinIndex(0);
      setMaxIndex(lastViewableDotIndex);
    }

    setPrevActiveIndex(activeIndex);
    setAddActiveClassToLastDot(false);
  }, [
    dots,
    numDotsToShow,
    activeDotClassName,
    prevActiveIndex,
    minIndex,
    maxIndex,
    hasAnimated,
    breakPointActiveIndex
  ]);

  useEffect(() => {
    const currentDots = dots;

    if (prevDots && currentDots && prevDots.length > currentDots.length) {
      const lastActiveDot = prevDots.find((dot) => dot.props.className === activeDotClassName);
      const lastActiveIndex = lastActiveDot ? parseInt(lastActiveDot.key as string) : 0;

      if (prevDots[prevDots.length - 1].props.className === activeDotClassName) {
        setBreakPointActiveIndex(currentDots.length - 1);
        setPrevActiveIndex(breakPointActiveIndex - 1);
        setAddActiveClassToLastDot(true);
      }

      if (lastActiveIndex > currentDots.length - 1) {
        setBreakPointActiveIndex(currentDots.length - 1);
        setPrevActiveIndex(breakPointActiveIndex - 1);
        setAddActiveClassToLastDot(true);
      }

      if (minIndex < 0) {
        setMinIndex(0);
        setMaxIndex(numDotsToShow - 1);
      }

      if (maxIndex > currentDots.length - 1) {
        setMaxIndex(currentDots.length - 1);
        setMinIndex(maxIndex - numDotsToShow + 1);
      }
    } else if (prevDots && currentDots && prevDots.length < currentDots.length) {
      const currentActiveDot = currentDots.find(
        (dot) => dot.props.className === activeDotClassName
      );
      const currentActiveIndex = currentActiveDot ? parseInt(currentActiveDot.key as string) : 0;

      if (currentActiveIndex >= maxIndex) {
        setMaxIndex(currentActiveIndex + 1);
        setMinIndex(maxIndex - numDotsToShow + 1);
      }

      if (maxIndex > currentDots.length - 1) {
        setMaxIndex(currentDots.length - 1);
        setMinIndex(maxIndex - numDotsToShow + 1);
      }
    }
  }, [dots, activeDotClassName, numDotsToShow, minIndex, maxIndex, breakPointActiveIndex]);

  const active = dots.find((dot) => dot.props.className === activeDotClassName);
  const activeIndex = active ? parseInt(active.key as string) : breakPointActiveIndex;
  const isMovingForward = activeIndex >= prevActiveIndex;

  const adjustedDots = dots.map((dot, index) => {
    if (index >= minIndex && index <= maxIndex) {
      if (index === minIndex && isMovingForward && index !== 0) {
        return React.cloneElement(dot, {
          className: prevNextDotClassName
        });
      } else if (index === maxIndex && (!isMovingForward || activeIndex === maxIndex)) {
        return React.cloneElement(dot, {
          className:
            addActiveClassToLastDot || activeIndex === maxIndex
              ? activeDotClassName
              : dot.props.className
        });
      } else if (
        (index === minIndex && !isMovingForward && activeIndex !== 0) ||
        (index === maxIndex && isMovingForward && activeIndex !== dots.length - 1)
      ) {
        return React.cloneElement(dot, {
          className: prevNextDotClassName
        });
      }
    } else if (index === Math.min(numDotsToShow, dots.length) - 1 && dots.length >= numDotsToShow) {
      return React.cloneElement(dot, {
        className: prevNextDotClassName
      });
    }
    return dot;
  });

  const containerWidth =
    dots.length < numDotsToShow ? dots.length * dotWidth : numDotsToShow * dotWidth;
  const midIndex = Math.round((minIndex + maxIndex) / 2);
  const leftOffset =
    dots.length < numDotsToShow
      ? 0
      : (dotWidth * numDotsToShow - dotWidth) / 2 - midIndex * dotWidth;

  return (
    <DotContainer>
      <DotWrapper
        className={dotContainerClassName}
        style={{
          width: containerWidth + "px"
        }}
      >
        <ul style={{ transform: `translateX(${leftOffset}px)` }}> {adjustedDots} </ul>
      </DotWrapper>
    </DotContainer>
  );
}
