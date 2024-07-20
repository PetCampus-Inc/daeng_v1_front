import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import AppRouter from "routes/AppRouter";
import { ThemeProvider } from "styled-components";
import { media } from "styles/MediaQuery";
import { GlobalStyle } from "styles/GlobalStyle";
import { themeConfig } from "styles/themeConfig";

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
        <ThemeProvider theme={{ ...themeConfig, media }}>
          <GlobalStyle />
          <AppRouter queryClient={queryClient} />
        </ThemeProvider>
      </RecoilRoot>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
);

console.log(`
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣤⣤⠶⠶⠶⠶⠶⢦⣤⣄⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣤⠶⠖⠛⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠛⠛⠶⢦⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢠⡾⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢳⣄⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⣠⠶⠟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠳⣦⡀⠀⠀⠀⠀
⠀⠀⠀⢀⡾⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⡄⠀⠀⠀
⠀⠀⠀⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⡄⠀⠀
⠀⠀⠸⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡇⠀⠀
⠀⢀⡾⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⣆⠀
⢀⡾⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣴⣷⡆⠀⠀⠀⠀⢰⣿⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢹⡆
⢸⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⢄⠠⠈⠉⠀⠰⣿⣷⠀⠈⠉⠀⡄⢠⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿
⠸⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠰⡈⢄⢃⠡⠂⠀⠀⠀⠀⠀⠀⢀⠣⢈⠔⡈⠆⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⡇
⠀⢻⣄⠀⠀⠀⠀⠀⠀⠀⠀⠡⢘⠠⢊⡐⠁⠀⠀⠀⠀⠀⠀⠀⠣⠌⢂⠅⠊⠀⠀⠀⠀⠀⠀⠀⢀⣠⠟⠀
⠀⠀⠙⠳⣤⣀⣀⡀⠀⠀⠀⠀⠈⠀⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠀⠈⠀⠀⠀⠀⢀⣤⡴⠶⠋⠁⠀⠀
⠀⠀⠀⠀⠀⠉⠉⢷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡾⠁⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠈⠹⢦⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⢀⠀⣀⣀⣠⠶⠋⠁⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠙⠛⠛⠛⠛⠶⠶⡤⠶⠴⠦⠶⠛⠉⠋⠛⠉⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀Hi, Knock dog ~🐶
`);
