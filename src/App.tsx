import IndexPage from "pages/IndexPage";
import LoginPage from "pages/LoginPage";
import { Route, Routes } from "react-router-dom";

const App = () => (
  <Routes>
    <Route path="/" element={<IndexPage />} />
    <Route path="/login" element={<LoginPage />} />
  </Routes>
);

export default App;
