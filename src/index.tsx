import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import { BrowserRouter, RouterProvider } from "react-router-dom";
import { GlobalStyle } from "./styles/GlobalStyle";
import { ThemeConfig } from "./styles/ThemeConfig";
import { ThemeProvider } from "styled-components";
import router from "router";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <ThemeProvider theme={ThemeConfig}>
      <RecoilRoot>
        <GlobalStyle />
        <RouterProvider router={router} />
      </RecoilRoot>
    </ThemeProvider>
  </BrowserRouter>
);
