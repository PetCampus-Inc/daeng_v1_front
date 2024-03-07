import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { StyledContainer } from "components/common/CustomToast/styles";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import Router from "router";
import { ThemeProvider } from "styled-components";
import mediaQueries from "styles/MediaQuery";

import { GlobalStyle } from "./styles/GlobalStyle";
import { ThemeConfig } from "./styles/ThemeConfig";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={{ ...ThemeConfig, mediaQueries }}>
      <RecoilRoot>
        <GlobalStyle />
        <Router />
        <StyledContainer
          position="bottom-center"
          limit={1}
          closeButton={false}
          autoClose={2000}
          hideProgressBar
        />
      </RecoilRoot>
    </ThemeProvider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
