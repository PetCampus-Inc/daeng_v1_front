import { FIELD, FIELD_KEYS } from "constants/field";

import { Checkbox } from "components/common";
import SingleRadio from "components/common/Select/SingleRadio";
import TextArea from "components/common/TextArea";
import AdminTitle from "components/common/Title/AdminTitle";
import { useFormContext } from "react-hook-form";

import { Card, Caption, Stack } from "../styles";

const PickDropInfo = () => {
  const { register, control, watch } = useFormContext();

  return (
    <>
      <Card>
        <AdminTitle
          name={`${FIELD.REQUEST_ITEMS}.${FIELD_KEYS.PICKDROP_STATE}`}
          control={control}
          hasBadge
        >
          픽드랍 운영
        </AdminTitle>
        <SingleRadio name={FIELD.PICKDROP_STATE} radiosText={["운영", "미운영"]} isRequired />
      </Card>
      {watch(FIELD.PICKDROP_STATE) === "운영" && (
        <>
          <Card>
            <AdminTitle
              name={`${FIELD.REQUEST_ITEMS}.${FIELD_KEYS.PICKDROP_NOTICE}`}
              control={control}
              noToggle
              hasBadge
            >
              픽드랍 안내
            </AdminTitle>
            <Caption>견주에게 안내할 픽드랍 내용을 입력해 주세요</Caption>
            <TextArea
              {...register(FIELD.PICKDROP_NOTICE, { required: true })}
              placeholder="ex) 픽드랍 왕복 50000 추가금 10000"
            />
          </Card>
          <Card>
            <AdminTitle
              name={`${FIELD.REQUEST_ITEMS}.${FIELD_KEYS.PICKDROP_REQUEST}`}
              control={control}
            >
              픽드랍 신청
            </AdminTitle>
            <SingleRadio name="null" radiosText={["신청", "미신청"]} disabled />
          </Card>
          <Card>
            <AdminTitle
              name={`${FIELD.REQUEST_ITEMS}.${FIELD_KEYS.PICKDROP_TYPE}`}
              control={control}
            >
              픽드랍 유형
            </AdminTitle>
            <SingleRadio name="null" radiosText={["편도", "왕복"]} disabled />
          </Card>
          <Card>
            <AdminTitle
              name={`${FIELD.REQUEST_ITEMS}.${FIELD_KEYS.PICKDROP_MEMO}`}
              control={control}
            >
              픽드랍 메모
            </AdminTitle>
            <TextArea
              placeholder="견주가 원하는 픽드랍 장소나 시간에 대해 입력하는 칸이에요"
              disabled
            />
          </Card>
          <Card>
            <AdminTitle
              name={`${FIELD.REQUEST_ITEMS}.${FIELD_KEYS.PICKDROP_INFO}`}
              control={control}
              hasBadge
            >
              픽드랍 유의사항
            </AdminTitle>
            <TextArea
              {...register(FIELD.PICKDROP_MEMO, { required: true })}
              placeholder="픽드랍 유의사항을 입력해 주세요"
            />
            <Stack>
              <Checkbox label="동의합니다" disabled />
            </Stack>
          </Card>
        </>
      )}
    </>
  );
};

export default PickDropInfo;
