import ReactDOM from "react-dom/client";
import router from "router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RecoilRoot } from "recoil";
import { RouterProvider } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import { GlobalStyle } from "./styles/GlobalStyle";
import { ThemeConfig } from "./styles/ThemeConfig";
import { ThemeProvider } from "styled-components";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={ThemeConfig}>
      <RecoilRoot>
        <GlobalStyle />
        <RouterProvider router={router} />
      </RecoilRoot>
    </ThemeProvider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
