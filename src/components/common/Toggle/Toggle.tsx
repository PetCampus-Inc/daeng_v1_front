import { motion } from "framer-motion";
import { useState } from "react";

import { StyledToggle, StyledToggleContainer } from "./styles";

interface ToggleProps {
  isOn?: boolean;
  onToggle?: (isOn: boolean) => void;
  ariaLabel?: string;
}

const Toggle = ({ isOn: controlledOn, onToggle, ariaLabel = "toggle" }: ToggleProps) => {
  const isControlled = controlledOn !== undefined;
  const [isOn, setIsOn] = useState(controlledOn || false);
  const className = `switch ${(isControlled ? controlledOn : isOn) ? "on" : "off"}`;

  const handleSwitch = () => {
    const newState = isControlled ? !controlledOn : !isOn;
    if (!isControlled) {
      setIsOn(newState);
    }

    onToggle?.(newState);
  };

  return (
    <StyledToggleContainer
      as={motion.div}
      className={className}
      role="switch"
      onClick={handleSwitch}
      aria-checked={isControlled ? controlledOn : isOn}
      aria-label={ariaLabel}
      tabIndex={0}
      animate
    >
      <StyledToggle as={motion.div} className="handle" layout transition={spring} />
    </StyledToggleContainer>
  );
};

const spring = {
  type: "spring",
  stiffness: 400,
  damping: 30
};

export default Toggle;
