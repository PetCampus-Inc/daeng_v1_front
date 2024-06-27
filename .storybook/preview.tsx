import type { Preview } from "@storybook/react";
import { ThemeProvider } from "styled-components";
import { ThemeConfig } from "../src/styles/ThemeConfig";
import React from "react";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
};

export const decorators = [
  (Story) => (
    <ThemeProvider theme={ThemeConfig}>
      <Story />
    </ThemeProvider>
  )
];

export default preview;
