import ArrowDownIcon from "assets/svg/arrow-down-icon";

import { useAccordionContext } from "./context";
import { StyledTitleContainer, StyledTitleButton } from "./styles";

export const AccordionTitle = ({ children }: { children: React.ReactNode }) => {
  const { toggleExpanded, expanded } = useAccordionContext();

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleExpanded();
    }
  };

  return (
    <StyledTitleContainer
      tabIndex={0}
      onClick={toggleExpanded}
      onKeyDown={handleKeyPress}
      data-state={expanded ? "open" : "closed"}
    >
      <StyledTitleButton
        aria-expanded={expanded}
        data-state={expanded ? "open" : "closed"}
        expand={expanded}
      >
        {children}
        <ArrowDownIcon size={24} />
      </StyledTitleButton>
    </StyledTitleContainer>
  );
};
