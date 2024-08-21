import type { Preview } from "@storybook/react";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "../src/styles/GlobalStyle";
import { themeConfig } from "../src/styles/themeConfig";
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
    <ThemeProvider theme={themeConfig}>
      <GlobalStyle />
      <Story />
    </ThemeProvider>
  )
];

export default preview;
