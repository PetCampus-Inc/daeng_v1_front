import React from "react";

import { ProgressBar, ProgressFill } from "./styles";

interface ProgressProps {
  value: number;
}

export const Progress: React.FC<ProgressProps> = ({ value }) => (
  <ProgressBar>
    <ProgressFill width={value} />
  </ProgressBar>
);
