import Text from "components/common/Text";
import { Container, StyledButtonWrapper, StyledMainWrapper } from "./styles";
import Button from "components/common/Button";
import { ThemeConfig } from "styles/ThemeConfig";
import { Dispatch, SetStateAction, useState } from "react";
import useSortDogs from "hooks/useSortDogs";
import { useRecoilValue } from "recoil";
import { adminLoginInfoAtom } from "store/admin";
import { IAdminInfo } from "types/Attendance.type";

interface Props {
  setIsSortClicked: Dispatch<SetStateAction<boolean>>;
  setDogLists: React.Dispatch<React.SetStateAction<IAdminInfo>>;
}

const SortModal = ({ setIsSortClicked, setDogLists }: Props) => {
  const [selected, setSelected] = useState(LIST.REGISTERD);
  const adminId = useRecoilValue(adminLoginInfoAtom).data.adminId;
  const schoolId = 1; // 수정해야함 !!!
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
          color={ThemeConfig.black}
          weight="700"
          size="1.1rem"
        />
        <StyledButtonWrapper>
          <Button
            height="22%"
            width="100%"
            justify="flex-start"
            backcolor={ThemeConfig.white}
            handleClick={() => {
              setSelected(LIST.REGISTERD);
              handleGetSortRegistered(adminId);
            }}
            textcolor={
              selected === LIST.REGISTERD
                ? ThemeConfig.primaryColor
                : ThemeConfig.gray_1
            }
            weight={selected === LIST.REGISTERD ? "800" : ""}
            text={LIST.REGISTERD}
          />
          <Button
            height="22%"
            width="100%"
            justify="flex-start"
            handleClick={() => {
              setSelected(LIST.PAYMENT);
              handleGetSortPayment(schoolId);
            }}
            backcolor={ThemeConfig.white}
            textcolor={
              selected === LIST.PAYMENT
                ? ThemeConfig.primaryColor
                : ThemeConfig.gray_1
            }
            weight={selected === LIST.PAYMENT ? "800" : ""}
            text={LIST.PAYMENT}
          />
          <Button
            height="22%"
            width="100%"
            justify="flex-start"
            handleClick={() => {
              setSelected(LIST.DATE);
              handleGetSortDate(schoolId);
            }}
            backcolor={ThemeConfig.white}
            textcolor={
              selected === LIST.DATE
                ? ThemeConfig.primaryColor
                : ThemeConfig.gray_1
            }
            weight={selected === LIST.DATE ? "800" : ""}
            text={LIST.DATE}
          />
          <Button
            height="22%"
            width="100%"
            justify="flex-start"
            handleClick={() => {
              setSelected(LIST.CHARGE);
              handleGetSortCharge(schoolId, adminId);
            }}
            backcolor={ThemeConfig.white}
            textcolor={
              selected === LIST.CHARGE
                ? ThemeConfig.primaryColor
                : ThemeConfig.gray_1
            }
            weight={selected === LIST.CHARGE ? "800" : ""}
            text={LIST.CHARGE}
          />
        </StyledButtonWrapper>
        <Button
          height="15%"
          width="100%"
          weight="700"
          text="닫기"
          handleClick={() => {
            setDogLists((prevInfo) => ({
              ...prevInfo,
              data: {
                ...prevInfo.data,
                dogs: newDogsList,
              },
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
