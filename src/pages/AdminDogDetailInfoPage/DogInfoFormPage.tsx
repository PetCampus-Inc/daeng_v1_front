import { FIELD } from "constants/field";

import { DateInput, Field, Flex, Layout, Textarea, TextInput } from "components/common";
import Header from "components/common/Header";
import SingleRadio from "components/common/Select/SingleRadio";
import { useGetDogDetail } from "hooks/api/admin/dogs";
import { FormProvider, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

export default function DogInfoFormPage() {
  const { dogId } = useParams<{ dogId: string }>();
  const { data } = useGetDogDetail(Number(dogId));

  const methods = useForm({
    defaultValues: {
      ...data.dogInfo,
      year: data.dogInfo.birthDate[0],
      month: data.dogInfo.birthDate[1],
      day: data.dogInfo.birthDate[2]
    }
  });

  return (
    <Layout>
      <Header type="text" text="강아지 정보" />
      <FormProvider {...methods}>
        <Flex direction="column" px={16} py={24} gap={44}>
          <Field label="이름">
            <TextInput
              {...methods.register(FIELD.DOG_NAME)}
              placeholder="강아지 이름을 입력해주세요"
              readOnly
            />
          </Field>
          <Field label="성별">
            <SingleRadio
              name={FIELD.DOG_GENDER}
              radiosText={["수컷", "암컷"]}
              isPreviewMode
              disabled
            />
          </Field>
          <Field label="크기" caption="~7kg 소형견 / ~ 15kg 중형견 / 15kg 이상 대형견">
            <SingleRadio
              name={FIELD.DOG_SIZE}
              radiosText={["소형견", "중형견", "대형견"]}
              isPreviewMode
              disabled
            />
          </Field>
          <Field label="견종">
            <TextInput
              {...methods.register(FIELD.BREED_NAME)}
              placeholder="견종을 선택해 주세요"
              readOnly
            />
          </Field>
          <Field label="생일">
            <div style={{ display: "flex", gap: "5px" }}>
              <DateInput {...methods.register("year")} unit="년" readOnly />
              <DateInput {...methods.register("month")} unit="월" readOnly />
              <DateInput {...methods.register("day")} unit="일" readOnly />
            </div>
          </Field>
          <Field label="중성화 여부">
            <SingleRadio
              name={FIELD.NEUTRALIZATION}
              radiosText={["했어요", "안했어요"]}
              isPreviewMode
              disabled
            />
          </Field>
          <Field label="예방접종 여부">
            <SingleRadio
              name={FIELD.VACCINATION}
              radiosText={["했어요", "안했어요"]}
              isPreviewMode
              disabled
            />
          </Field>
          <Field label="알러지 및 질병 유무">
            <Textarea
              {...methods.register(FIELD.ALLERGY_DISEASE)}
              placeholder="알러지나 질병이 있다면 상세히 입력해주세요."
              readOnly
            />
          </Field>
          <Field label="픽드랍 신청">
            <SingleRadio
              name={FIELD.PICKDROP_REQUEST}
              radiosText={["신청", "미신청"]}
              isPreviewMode
              disabled
            />
          </Field>
          <Field label="픽드랍 메모">
            <Textarea
              {...methods.register(FIELD.PICKDROP_MEMO)}
              placeholder="픽드랍 장소, 시간에 대해 자세히 적어주세요."
              readOnly
            />
          </Field>
        </Flex>
      </FormProvider>
    </Layout>
  );
}
