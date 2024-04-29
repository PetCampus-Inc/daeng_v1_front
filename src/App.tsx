import { OverlayProvider } from "hooks/common/useOverlay";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <OverlayProvider>
      <Outlet />
    </OverlayProvider>
  );
};

export default App;
