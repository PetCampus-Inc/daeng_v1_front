import { useState, useEffect, useCallback, useRef, type CSSProperties } from "react";

interface UseKeyboardAwareViewResult {
  isKeyboardOpen: boolean;
  viewportHeight: number;
  translateY: number;
  style: CSSProperties;
}

/**
 * 키보드 활성화에 대응하는 뷰를 위한 훅
 *
 * 모바일 환경에서 가상 키보드의 열림/닫힘 상태를 감지하고,
 * 뷰포트의 크기 변화와 스크롤 위치를 추적합니다.
 * iOS와 Android 플랫폼 모두에서 작동하도록 설계되었습니다.
 *
 * @returns {UseKeyboardAwareViewResult} 키보드 대응 상태 객체 및 스타일
 * @property {boolean} isKeyboardOpen - 가상 키보드 활성화 여부
 * @property {number} viewportHeight - 현재 뷰포트의 높이
 * @property {number} translateY - 스크롤에 따른 Y축 변환 값
 * @property {Object} style - 적용할 스타일 객체
 */
export const useKeyboardAwareView = (): UseKeyboardAwareViewResult => {
  const [state, setState] = useState({
    isKeyboardOpen: false,
    viewportHeight: window.innerHeight,
    translateY: 0
  });

  const initialClientHeight = useRef(window.innerHeight);

  const getVisualViewport = useCallback(() => window.visualViewport, []);

  const isIOS = /iOS|iPad|iPhone|iPod/.test(window.navigator.userAgent);
  const isAndroid = /Android/.test(window.navigator.userAgent);

  const handleResize = useCallback(() => {
    const visualViewport = getVisualViewport();
    if (!visualViewport) return;

    const windowHeight = window.innerHeight;
    const viewportHeight = visualViewport.height;

    const isIOSKeyboardOpen = isIOS && windowHeight > viewportHeight;
    const isAndroidKeyboardOpen = isAndroid && viewportHeight < initialClientHeight.current;
    const isKeyboardOpen = isIOSKeyboardOpen || isAndroidKeyboardOpen;

    setState((prevState) => ({
      ...prevState,
      isKeyboardOpen,
      viewportHeight,
      translateY: isKeyboardOpen ? prevState.translateY : 0
    }));
  }, [getVisualViewport, isIOS, isAndroid]);

  const handleScroll = useCallback(() => {
    if (!state.isKeyboardOpen) return;

    const visualViewport = getVisualViewport();
    if (!visualViewport) return;

    const viewportTopGap = visualViewport.pageTop - visualViewport.offsetTop;
    const newTranslateY = window.scrollY - viewportTopGap;

    // 가상 영역까지 스크롤 내려가는 것을 방지
    if (window.scrollY + visualViewport.height > document.body.offsetHeight - 2) {
      window.scrollTo(0, document.body.offsetHeight - visualViewport.height - 1);
    }

    setState((prevState) => ({ ...prevState, translateY: newTranslateY }));
  }, [state.isKeyboardOpen, getVisualViewport]);

  const handleViewportScroll = useCallback(
    (e: Event) => {
      if (!state.isKeyboardOpen) return;
      const target = e.target as VisualViewport;
      const viewportScrollY = Math.round(target.offsetTop);

      setState((prevState) => ({ ...prevState, translateY: viewportScrollY }));
    },
    [state.isKeyboardOpen]
  );

  useEffect(() => {
    const visualViewport = getVisualViewport();
    if (!visualViewport) return;

    handleResize();
    visualViewport.addEventListener("resize", handleResize);
    visualViewport.addEventListener("scroll", handleViewportScroll);
    window.addEventListener("scroll", handleScroll);

    return () => {
      visualViewport.removeEventListener("resize", handleResize);
      visualViewport.removeEventListener("scroll", handleViewportScroll);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleResize, handleScroll, handleViewportScroll, getVisualViewport]);

  const fixedElStyle: CSSProperties = {
    position: "fixed",
    bottom: state.isKeyboardOpen ? `calc(100% - ${state.viewportHeight}px)` : "0",
    left: 0,
    right: 0,
    transform: state.isKeyboardOpen ? `translateY(${state.translateY}px)` : "none",
    transition: isIOS
      ? `bottom ${KEYBOARD_ANIMATION_DURATION}ms cubic-bezier(${KEYBOARD_ANIMATION_BEZIER.join(",")}), transform 0.1s ease-out`
      : "bottom 0.1s ease-out", // iOS가 아닌 경우 애니메이션 없음
    opacity: state.isKeyboardOpen ? 1 : 0,
    pointerEvents: state.isKeyboardOpen ? "auto" : "none",
    borderRadius: "0"
  };

  return { ...state, style: fixedElStyle };
};

const KEYBOARD_ANIMATION_DURATION = 300;
const KEYBOARD_ANIMATION_BEZIER = [0.41, 0.75, 0.82, 1];
