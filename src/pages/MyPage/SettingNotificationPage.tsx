import { Layout } from "components/common";
import Header from "components/common/Header";
import NotificationInfo from "components/Setting/Notification";

const SettingNotificationPage = () => {
  return (
    <>
      <Header type="text" text="설정" />
      <Layout bgColor="white" px={16}>
        <NotificationInfo />
      </Layout>
    </>
  );
};

export default SettingNotificationPage;
