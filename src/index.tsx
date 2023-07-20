import App from "./App";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";
// import { GlobalStyle } from "./styles/GlobalStyle";
// import { ThemeConfig } from "./styles/ThemeConfig";
import { ThemeProvider } from "styled-components";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    {/* <ThemeProvider theme={ThemeConfig}>
      <RecoilRoot>
        <GlobalStyle />
        <App />
      </RecoilRoot>
    </ThemeProvider> */}
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </BrowserRouter>
);
