import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import AppRouter from "router";
import { ThemeProvider } from "styled-components";
import mediaQueries from "styles/MediaQuery";

import { GlobalStyle } from "./styles/GlobalStyle";
import { ThemeConfig } from "./styles/ThemeConfig";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      throwOnError: true
    },
    mutations: {
      retry: 1,
      throwOnError: true
    }
  }
});

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <ThemeProvider theme={{ ...ThemeConfig, mediaQueries }}>
          <GlobalStyle />
          <AppRouter queryClient={queryClient} />
        </ThemeProvider>
      </RecoilRoot>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
);
