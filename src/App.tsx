import { StyledContainer } from "components/common/CustomToast/styles";
import { OverlayProvider } from "hooks/common/useOverlay";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <>
      <OverlayProvider>
        <Outlet />
      </OverlayProvider>
      <StyledContainer
        position="bottom-center"
        limit={1}
        closeButton={false}
        autoClose={2000}
        hideProgressBar
      />
    </>
  );
};

export default App;
