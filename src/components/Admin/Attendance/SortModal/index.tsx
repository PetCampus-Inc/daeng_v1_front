import Text from "components/common/Text";
import { Container, StyledButtonWrapper, StyledMainWrapper } from "./styles";
import Button from "components/common/Button";
import { ThemeConfig } from "styles/ThemeConfig";
import { Dispatch, SetStateAction } from "react";
import useSortDogs from "hooks/api/useSortDogs";
import { useRecoilValue } from "recoil";
import { adminLoginInfoAtom } from "store/admin";
import { IAttendanceInfo } from "types/Attendance.type";

interface Props {
  setIsSortClicked: Dispatch<SetStateAction<boolean>>;
  setDogLists: React.Dispatch<React.SetStateAction<IAttendanceInfo>>;
  setSortName: Dispatch<SetStateAction<string>>;
  sortName: string;
}

const SortModal = ({
  setIsSortClicked,
  setDogLists,
  setSortName,
  sortName,
}: Props) => {
  const adminId = useRecoilValue(adminLoginInfoAtom).data.adminId;
  const schoolId = useRecoilValue(adminLoginInfoAtom).data.schoolId;
  const {
    handleGetSortRegistered,
    handleGetSortPayment,
    handleGetSortCharge,
    handleGetSortDate,
    newDogsList,
  } = useSortDogs();

  return (
    <Container>
      <StyledMainWrapper>
        <Text
          text="정렬"
          color={ThemeConfig.colors.black}
          weight="700"
          size="1.1rem"
        />
        <StyledButtonWrapper>
          <Button
            height="22%"
            width="100%"
            justify="flex-start"
            backcolor={ThemeConfig.colors.white}
            handleClick={() => {
              setSortName(LIST.REGISTERD);
              handleGetSortRegistered(schoolId);
            }}
            textcolor={
              sortName === LIST.REGISTERD
                ? ThemeConfig.colors.primaryColor
                : ThemeConfig.colors.gray_1
            }
            weight={sortName === LIST.REGISTERD ? "800" : ""}
            text={LIST.REGISTERD}
          />
          <Button
            height="22%"
            width="100%"
            justify="flex-start"
            handleClick={() => {
              setSortName(LIST.PAYMENT);
              handleGetSortPayment(schoolId);
            }}
            backcolor={ThemeConfig.colors.white}
            textcolor={
              sortName === LIST.PAYMENT
                ? ThemeConfig.colors.primaryColor
                : ThemeConfig.colors.gray_1
            }
            weight={sortName === LIST.PAYMENT ? "800" : ""}
            text={LIST.PAYMENT}
          />
          <Button
            height="22%"
            width="100%"
            justify="flex-start"
            handleClick={() => {
              setSortName(LIST.DATE);
              handleGetSortDate(schoolId);
            }}
            backcolor={ThemeConfig.colors.white}
            textcolor={
              sortName === LIST.DATE
                ? ThemeConfig.colors.primaryColor
                : ThemeConfig.colors.gray_1
            }
            weight={sortName === LIST.DATE ? "800" : ""}
            text={LIST.DATE}
          />
          <Button
            height="22%"
            width="100%"
            justify="flex-start"
            handleClick={() => {
              setSortName(LIST.CHARGE);
              handleGetSortCharge(schoolId, adminId);
            }}
            backcolor={ThemeConfig.colors.white}
            textcolor={
              sortName === LIST.CHARGE
                ? ThemeConfig.colors.primaryColor
                : ThemeConfig.colors.gray_1
            }
            weight={sortName === LIST.CHARGE ? "800" : ""}
            text={LIST.CHARGE}
          />
        </StyledButtonWrapper>
        <Button
          height="15%"
          width="100%"
          weight="700"
          text="닫기"
          handleClick={() => {
            setDogLists((prevAdminInfo) => ({
              ...prevAdminInfo,
              data: newDogsList.map((dogInfo) => ({
                dogId: dogInfo.dogId,
                dogName: dogInfo.dogName,
                allRounds: dogInfo.allRounds,
                currentRounds: dogInfo.currentRounds,
                monthlyTicket: dogInfo.monthlyTicket,
              })),
            }));
            setIsSortClicked(false);
          }}
        />
      </StyledMainWrapper>
    </Container>
  );
};

export default SortModal;

const LIST = {
  REGISTERD: "유치원 등록순",
  PAYMENT: "결제 임박순",
  DATE: "최근 등원순",
  CHARGE: "자주 맡은 강아지순",
};
