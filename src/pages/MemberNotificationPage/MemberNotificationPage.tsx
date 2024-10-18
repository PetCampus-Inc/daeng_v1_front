import EllipseOrangeIcon from "assets/svg/ellipse-orange-icon";
import NotificationList from "components/Admin/Notification/NotificationList";
import { Box, Layout, Text } from "components/common";
import Header from "components/common/Header";
import { useGetMemberNewAlarm } from "hooks/api/member/alarm";
import { useGetDogs } from "hooks/api/member/member";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { dogIdState } from "store/member";
import { DogsDataType } from "types/member/main.types";

//FIXME: 전달 데이터 수정 필요
const MemberNotificationPage = () => {
  const [selectedDogId, setSelectedDogId] = useRecoilState(dogIdState);
  const { data: dogList } = useGetDogs(selectedDogId?.toString());
  const { data } = useGetMemberNewAlarm(selectedDogId);

  const dogNameArray = (dogList: DogsDataType[] | undefined) => {
    if (!dogList) return ["전체"];
    const dogNames = dogList.map((dog) => dog.dogName);
    return ["전체", ...dogNames];
  };
  const currentSteps = dogNameArray(dogList);
  const [currentStep, setCurrentStep] = useState("전체");

  return (
    <>
      <Header type="text" text="알림" />
      <Layout type="detail">
        <nav>
          <Box display="flex" gap={20} mt={25} paddingX={15} borderBottom={2} borderColor="gray_5">
            {currentSteps?.map((item, index) => (
              <Box
                key={index}
                paddingBottom={10}
                position="relative"
                onClick={() => setCurrentStep(item)}
              >
                <Text typo="body1_18_B" color={item === currentStep ? "darkBlack" : "gray_3"}>
                  {item}
                </Text>
                <Box
                  position="absolute"
                  bottom={-2}
                  right={0}
                  left={0}
                  borderBottom={2}
                  borderColor={item === currentStep ? "darkBlack" : "transparent"}
                />
                {index !== 0 && data && (
                  <Box position="absolute" top={-5} right={-8}>
                    <EllipseOrangeIcon />
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        </nav>
        {data ? (
          // <NotificationList currentStep={currentStep} />
          <Box>list</Box>
        ) : (
          <Box display="flex" justify="center" pt={80}>
            <Text typo="label2_14_R" color="gray_2">
              도착한 알림이 없어요
            </Text>
          </Box>
        )}
      </Layout>
    </>
  );
};

export default MemberNotificationPage;
