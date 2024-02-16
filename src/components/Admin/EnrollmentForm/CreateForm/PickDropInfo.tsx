import { useFormContext } from "react-hook-form";

import { Card, Caption } from "../styles";
import AdminTitle from "components/common/Title/AdminTitle";
import SingleRadio from "components/common/Select/SingleRadio";
import TextArea from "components/common/TextArea";
import { ITEM_KEYS } from "constants/item";

const PickDropInfo = () => {
  const { control, register, watch } = useFormContext();

  return (
    <>
      <Card>
        <AdminTitle
          name={`requiredItemList.${ITEM_KEYS.PICKDROP_OPERATION}`}
          control={control}
          hasBadge
        >
          픽드랍 운영
        </AdminTitle>
        <SingleRadio name="pickDropState" radiosText={["운영", "미운영"]} />
      </Card>
      {watch("pickDropState") === "운영" && (
        <>
          <Card>
            <AdminTitle
              name={`requiredItemList.${ITEM_KEYS.PICKDROP_NOTICE}`}
              control={control}
              hasBadge
              hasToggle
            >
              픽드랍 안내
            </AdminTitle>
            <Caption>견주에게 안내할 픽드랍 내용을 입력해 주세요</Caption>
            <TextArea
              name="pickDropNotice"
              register={register}
              placeholder="ex) 픽드랍 왕복 50000 추가금 10000"
            />
          </Card>
          <Card>
            <AdminTitle
              name={`requiredItemList.${ITEM_KEYS.PICKDROP_REQUEST}`}
              control={control}
              hasToggle
            >
              픽드랍 신청
            </AdminTitle>
            <SingleRadio name="null" radiosText={["신청", "미신청"]} disabled />
          </Card>
          <Card>
            <AdminTitle
              name={`requiredItemList.${ITEM_KEYS.PICKDROP_TYPE}`}
              control={control}
              hasToggle
            >
              픽드랍 유형
            </AdminTitle>
            <SingleRadio name="null" radiosText={["편도", "왕복"]} disabled />
          </Card>
          <Card>
            <AdminTitle
              name={`requiredItemList.${ITEM_KEYS.PICKDROP_MEMO}`}
              control={control}
              hasToggle
            >
              픽드랍 메모
            </AdminTitle>
            <TextArea
              name="null"
              placeholder="견주가 원하는 픽드랍 장소나 시간에 대해 입력하는 칸이에요"
              disabled
            />
          </Card>
          <Card>
            <AdminTitle
              name={`requiredItemList.${ITEM_KEYS.PICKDROP_INFO}`}
              control={control}
              hasBadge
              hasToggle
            >
              픽드랍 유의사항
            </AdminTitle>
            <TextArea
              name="pickDropInfo"
              register={register}
              placeholder="픽드랍 유의사항을 입력해 주세요"
            />
          </Card>
        </>
      )}
    </>
  );
};

export default PickDropInfo;
