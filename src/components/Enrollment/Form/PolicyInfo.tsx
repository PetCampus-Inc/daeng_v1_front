import { FIELD, FIELD_KEYS } from "constants/field";

import { Checkbox } from "components/common";
import { Textarea } from "components/common/Textarea";
import Title from "components/common/Title";
import { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";

import * as S from "./styles";

interface PolicyInfoProps {
  requiredItems?: Map<number, boolean>;
}

const PolicyInfo = ({ requiredItems }: PolicyInfoProps) => {
  const { control, register, setValue, watch } = useFormContext();
  const allChecked = watch("all");
  const watchTerms = watch([
    FIELD.LIMITS_INFO_TERM,
    FIELD.ACCIDENT_INFO_TERM,
    FIELD.ABANDONMENT_INFO_TERM
  ]);

  useEffect(() => {
    const allTermsChecked = watchTerms.every(Boolean);

    if (allChecked !== allTermsChecked) {
      setValue("all", allTermsChecked);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchTerms, setValue]);

  const handleParentCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    setValue(FIELD.LIMITS_INFO_TERM, checked);
    setValue(FIELD.ACCIDENT_INFO_TERM, checked);
    setValue(FIELD.ABANDONMENT_INFO_TERM, checked);
  };

  return (
    <>
      <S.Card>
        <Controller
          name="all"
          control={control}
          render={({ field: { ref, ...field } }) => (
            <Checkbox
              label="유의사항 전체 동의하기"
              ref={ref}
              onChange={handleParentCheckboxChange}
              isChecked={field.value}
              variant="fill"
            />
          )}
        />
      </S.Card>
      <S.Card>
        <Title htmlFor={FIELD.LIMITS_INFO} isRequired={requiredItems?.get(FIELD_KEYS.LIMITS_INFO)}>
          이용 제한 유의 사항
        </Title>
        <S.Caption>내용을 자세히 읽고 동의 여부를 체크해 주세요</S.Caption>
        <Textarea {...register(FIELD.LIMITS_INFO)} isChecked={watchTerms[0]} disabled />
        <S.Stack>
          <Controller
            name={FIELD.LIMITS_INFO_TERM}
            control={control}
            rules={{ required: requiredItems?.get(FIELD_KEYS.LIMITS_INFO) }}
            render={({ field: { ref, ...field } }) => (
              <Checkbox
                label="동의합니다"
                ref={ref}
                isChecked={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </S.Stack>
      </S.Card>
      <S.Card>
        <Title
          htmlFor={FIELD.ACCIDENT_INFO}
          isRequired={requiredItems?.get(FIELD_KEYS.ACCIDENT_INFO)}
        >
          상해 유의사항
        </Title>
        <S.Caption>내용을 자세히 읽고 동의 여부를 체크해 주세요</S.Caption>
        <Textarea {...register(FIELD.ACCIDENT_INFO)} isChecked={watchTerms[1]} disabled />
        <S.Stack>
          <Controller
            name={FIELD.ACCIDENT_INFO_TERM}
            control={control}
            rules={{ required: requiredItems?.get(FIELD_KEYS.ACCIDENT_INFO) }}
            render={({ field: { ref, ...field } }) => (
              <Checkbox
                label="동의합니다"
                ref={ref}
                isChecked={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </S.Stack>
      </S.Card>
      <S.Card>
        <Title
          htmlFor={FIELD.ABANDONMENT_INFO}
          isRequired={requiredItems?.get(FIELD_KEYS.ABANDONMENT_INFO)}
        >
          유기 유의사항
        </Title>
        <S.Caption>내용을 자세히 읽고 동의 여부를 체크해 주세요</S.Caption>
        <Textarea {...register(FIELD.ABANDONMENT_INFO)} isChecked={watchTerms[2]} disabled />
        <S.Stack>
          <Controller
            name={FIELD.ABANDONMENT_INFO_TERM}
            control={control}
            rules={{ required: requiredItems?.get(FIELD_KEYS.ABANDONMENT_INFO) }}
            render={({ field: { ref, ...field } }) => (
              <Checkbox
                label="동의합니다"
                ref={ref}
                isChecked={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </S.Stack>
      </S.Card>
    </>
  );
};

export default PolicyInfo;
