import Title from "components/common/Title";
import { Card } from "./styles";
import SingleRadio from "components/common/Select/SingleRadio";
import TextArea from "components/common/TextArea";
import { useFormContext } from "react-hook-form";
import { Caption } from "components/common/Select/styles";
import { textMapping } from "./constant";

import type { IPickDropInfo } from "types/School.type";
interface PickDropInfoProps {
  info: IPickDropInfo;
  requiredItems: Map<number, boolean>;
}

const PickDropInfo = ({ info, requiredItems }: PickDropInfoProps) => {
  const methods = useFormContext();
  console.log(textMapping.get(methods.watch("pickDropRequest")));

  return (
    <>
      <Card>
        <Title>픽드랍 안내</Title>
        <TextArea
          name="pickDropMemo"
          readOnly
          value={
            "픽드랍 안내 데이터 넣어주세요 안내 데이터 넣어주세요픽드랍 안내 데이터 넣어주세요"
          }
          autoResize
        />
      </Card>
      <Card>
        <Title>픽드랍 신청</Title>
        <SingleRadio name="pickDropRequest" radiosText={["신청", "미신청"]} />
      </Card>
      {methods.watch("pickDropRequest") === "신청" && (
        <>
          <Card>
            <Title>픽드랍 유형</Title>
            <SingleRadio name="pickDropType" radiosText={["편도", "왕복"]} />
          </Card>
          <Card>
            <Title>픽드랍 메모</Title>
            <TextArea
              name="pickDropMemo"
              autoResize
              placeholder="픽드랍 장소, 시간에 대해 자세히 적어주세요."
            />
          </Card>
          <Card>
            <Title>픽드랍 유의사항</Title>
            <Caption>내용을 자세히 읽고 동의 여부를 체크해주세요 </Caption>
            <TextArea
              name="pickDropInfo"
              readOnly
              autoResize
              value={"30번 pickDropInfo 픽드랍 유의사항 데이터 넣어주세요"}
            />
            {/* TODO: 동의합니다 BasicCheckBox 넣어주기 */}
          </Card>
        </>
      )}
    </>
  );
};

export default PickDropInfo;
