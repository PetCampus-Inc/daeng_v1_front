import { HTMLAttributes, ReactNode, useLayoutEffect, useState } from "react";
import styled from "styled-components";
import { themeConfig } from "styles/themeConfig";

/**
 * height가 window.innerHeight인 div 컨테이너
 *
 * 모바일 화면을 꽉 채우는 페이지를 구현할 때 사용합니다.
 */
export const FullHeight = ({
  children,
  ...props
}: { children: ReactNode } & HTMLAttributes<HTMLDivElement>) => {
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    setHeight(window.innerHeight);
  }, []);

  return (
    <StyledComp height={height} {...props}>
      {children}
    </StyledComp>
  );
};

const StyledComp = styled.div.withConfig({
  shouldForwardProp: (prop) => !["height"].includes(prop)
})<{ height?: number }>`
  max-width: ${themeConfig.breakPoints.md};
  height: ${({ height }) => (height ? `${height}px` : "100dvh")};
  margin: 0 auto;
  position: relative;
  overflow: hidden;
`;
