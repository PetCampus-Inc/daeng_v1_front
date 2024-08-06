import { Layout } from "components/common";
import Header from "components/common/Header";
import { type PropsWithChildren } from "react";

const ErrorPageLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header type="back" />
      <Layout pt={72} pb={16} px={16}>
        {children}
      </Layout>
    </>
  );
};

export default ErrorPageLayout;
