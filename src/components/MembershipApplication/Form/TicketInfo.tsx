import TextArea from "components/common/TextArea";
import Title from "components/common/Title";
import { Card } from "./styles";
import SingleRadio from "components/common/Select/SingleRadio";
import DayMultiCheck from "components/common/Select/DayMultiCheck";
import { Caption } from "components/common/Select/styles";
import { useFormContext } from "react-hook-form";

const TicketInfo = () => {
  const methods = useFormContext();

  // TODO: API 연동 시 13~15줄 제거
  const openDays = ["월", "화", "금", "토", "일"];
  const roundTicketNumber = [1, 5, 10, 15];
  const monthlyTicketNumber = [1, 4, 8, 10];

  const roundTicketText = roundTicketNumber.map((number) => `${number}회`);
  const monthlyTicketText = monthlyTicketNumber.map((number) => `${number}주`);

  return (
    <>
      <Card>
        <Title>가격 안내</Title>
        {/* TODO: 16.priceInfo (가격 안내) 데이터 가져오기 */}
        <TextArea name="priceInfo" readOnly value={"16번 데이터 넣어주세요"} />
      </Card>
      <Card>
        <Title>이용권 종류</Title>
        <Caption>회차권과 정기권 중 원하시는 이용권 종류를 선택해 주세요</Caption>
        <SingleRadio name="ticketType" radiosText={["정기권", "회차권"]} />
      </Card>
      {methods.watch("ticketType") && (
        <Card>
          <Title>
            {methods.getValues("ticketType") === "정기권" ? "정기권 유형" : "회차권 유형"}
          </Title>
          <SingleRadio
            name="monthlyTicketNumber"
            radiosText={
              methods.watch("ticketType") === "정기권" ? monthlyTicketText : roundTicketText
            }
          />
        </Card>
      )}
      <Card>
        <Title>등원 요일 선택</Title>
        <DayMultiCheck name="openDays" openDays={openDays} />
      </Card>
      <Card>
        <Title>유의사항</Title>
        <Caption>내용을 자세히 읽고 동의 여부를 체크해주세요 </Caption>
        {/* TODO: 21. ticketInfo (회차권 유의사항 ) */}
        <TextArea readOnly value={"21번 데이터 넣어주세요"} resizable={false} />
        {/* TODO: 동의합니다 BasicCheckBox 넣어주기*/}
      </Card>
    </>
  );
};

export default TicketInfo;
