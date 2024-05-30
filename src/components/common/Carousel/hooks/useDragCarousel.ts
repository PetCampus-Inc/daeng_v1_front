import { useRef, useState, useCallback } from "react";

export function useDragCarousel() {
  // 상태 훅을 사용하여 드래그 시작 지점, 변환값, 애니메이션, 드래깅 여부 상태를 저장
  const [touchStartX, setTouchStartX] = useState(0);
  const [transX, setTransX] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  const animationFrame = useRef<number | null>(null);

  // 터치 시작 이벤트 핸들러
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    // 이전 애니메이션 프레임이 있으면 취소
    if (animationFrame.current !== null) {
      cancelAnimationFrame(animationFrame.current);
    }
    // 애니메이션 비활성화
    setAnimate(false);
    // 터치 시작 지점 저장
    setTouchStartX(e.touches[0].clientX);
    // 터치 시작 시 드래깅 여부 초기화
    setIsDragging(false);
  };

  // 터치 이동 이벤트 핸들러
  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      // 터치 이동 거리 계산
      const moveWidth = e.touches[0].clientX - touchStartX;

      // 이동 거리가 거의 없을 때 무시
      if (Math.abs(moveWidth) < 1) return;

      // 이전 애니메이션 프레임이 있으면 취소
      if (animationFrame.current !== null) {
        cancelAnimationFrame(animationFrame.current);
      }

      // 이동 거리를 감쇠하는 비율을 조정
      const threshold = 30; // 임계값
      let adjustedMoveWidth = 0;

      if (Math.abs(moveWidth) > threshold) {
        // 임계값을 초과하는 이동 거리에 감쇠 적용
        const dampenedMove = Math.sqrt(Math.abs(moveWidth) - threshold);
        adjustedMoveWidth = dampenedMove * Math.sign(moveWidth);
      } else {
        // 임계값 이하의 이동 거리는 그대로 사용
        adjustedMoveWidth = moveWidth;
      }

      // 실제 드래깅이 발생했음을 표시
      setIsDragging(true);

      // 애니메이션 프레임 요청 및 변환값, 터치 시작 지점 업데이트
      animationFrame.current = requestAnimationFrame(() => {
        setTransX((prev) => prev + adjustedMoveWidth);
        setTouchStartX(e.touches[0].clientX);
      });
    },
    [touchStartX]
  );

  // 터치 종료 이벤트 핸들러
  const handleTouchEnd = () => {
    // 이전 애니메이션 프레임이 있으면 취소
    if (animationFrame.current !== null) {
      cancelAnimationFrame(animationFrame.current);
    }
    // 드래깅이 발생하지 않았으면 변환값 업데이트 중지
    if (!isDragging) return;

    const parentElement = ref.current?.parentElement;
    if (!parentElement) return 0;

    // 부모 요소의 너비와 최대 스크롤 값 계산
    const parentWidth = parentElement.clientWidth;
    const maxScroll = ref.current.scrollWidth - parentWidth;
    let targetTransX = transX;

    // 변환값이 경계를 넘지 않도록 조정
    if (transX > 0) {
      targetTransX = 0;
    } else if (-transX > maxScroll) {
      targetTransX = -maxScroll;
    }

    // 변환값 업데이트 및 애니메이션 활성화
    setTransX(targetTransX);
    setAnimate(true);
  };

  const style = {
    transform: `translateX(${transX}px)`,
    transition: animate ? "transform 300ms ease-in-out" : "none"
  };

  return { style, ref, handleTouchStart, handleTouchMove, handleTouchEnd };
}
