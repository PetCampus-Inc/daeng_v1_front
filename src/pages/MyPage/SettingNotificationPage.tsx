import Header from "components/common/Header";
import NotificationInfo from "components/Setting/Notification";
import { PageContainer } from "styles/StyleModule";

const SettingNotificationPage = () => {
  return (
    <>
      <Header type="text" text="설정" />
      <PageContainer color="white">
        <NotificationInfo />
      </PageContainer>
    </>
  );
};

export default SettingNotificationPage;
