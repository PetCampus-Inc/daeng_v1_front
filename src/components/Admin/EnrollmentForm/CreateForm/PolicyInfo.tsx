import { useFormContext } from "react-hook-form";

import { Card } from "../styles";
import AdminTitle from "components/common/Title/AdminTitle";
import TextArea from "components/common/TextArea";

const PolicyInfo = () => {
  const { control } = useFormContext();
  return (
    <>
      <Card>
        <AdminTitle name="requiredItemList.limitsInfo" control={control} hasBadge>
          이용 제한 유의 사항
        </AdminTitle>
        <TextArea name="limitsInfo" placeholder="이용 제한 관련 유의사항을 입력해 주세요" />
      </Card>
      <Card>
        <AdminTitle name="requiredItemList.accidentInfo" control={control} hasBadge>
          상해 유의사항
        </AdminTitle>
        <TextArea name="accidentInfo" placeholder="상해 관련 유의사항을 입력해 주세요" />
      </Card>
      <Card>
        <AdminTitle name="requiredItemList.abandonmentInfo" control={control} hasBadge>
          유기 유의사항
        </AdminTitle>
        <TextArea name="abandonmentInfo" placeholder="유기 관련 유의사항을 입력해 주세요" />
      </Card>
    </>
  );
};

export default PolicyInfo;
