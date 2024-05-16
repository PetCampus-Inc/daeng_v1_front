import Header from "components/common/Header";
import { type PropsWithChildren } from "react";
import { PageContainer } from "styles/StyleModule";

const ErrorPageLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header type="back" />
      <PageContainer pt="4.5" pb="1">
        {children}
      </PageContainer>
    </>
  );
};

export default ErrorPageLayout;
