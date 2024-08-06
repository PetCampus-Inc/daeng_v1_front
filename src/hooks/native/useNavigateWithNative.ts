import useNative from "hooks/native/useNative";
import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";

/**
 * `react-router-dom`의 `useNavigate()`와 같은 기능을 제공하지만, 이전 페이지가 없을 때 네이티브의 뒤로가기 기능을 사용합니다.
 */
const useNavigateWithNative = () => {
  const navigate = useNavigate();
  const { native } = useNative();
  const canGoBack = useMemo(() => window.history.state.idx > 0, []);

  const goBack = useCallback(() => {
    if (canGoBack) navigate(-1);
    else native.goBack();
  }, [navigate, native, canGoBack]);

  return { navigate, goBack, canGoBack };
};

export default useNavigateWithNative;
