import React, { forwardRef } from "react";
import styled, { css, type CSSProp } from "styled-components";

import { AccordionContent } from "./accordion-content";
import { AccordionTitle } from "./accordion-title";
import { AccordionProvider } from "./context";

interface AccordionProps {
  children: React.ReactNode;
  css?: CSSProp;
}

const defaultAccordionStyle = css`
  gap: 10px;

  padding-block: 12px;
  padding-inline: 12px;

  border-radius: 8px;
  background-color: #f6f6f6;
`;

const Container = styled.div<{ css?: CSSProp }>`
  display: flex;
  flex-direction: column;
  min-width: 0;

  ${({ css }) => (css ? css : defaultAccordionStyle)};
`;

const AccordionRoot = forwardRef<HTMLDivElement, AccordionProps>(function Accordion(
  { children, css },
  ref
) {
  return (
    <Container ref={ref} css={css}>
      <AccordionProvider>{children}</AccordionProvider>
    </Container>
  );
});

export const Accordion = Object.assign(AccordionRoot, {
  Content: AccordionContent,
  Title: AccordionTitle
});
