import OverlayProvider from "hooks/common/useOverlay/OverlayProvider";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <OverlayProvider>
      <Outlet />
    </OverlayProvider>
  );
};

export default App;
