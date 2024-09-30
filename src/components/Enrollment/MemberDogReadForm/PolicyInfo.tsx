import { FIELD, FIELD_KEYS } from "constants/field";
import { REQUIRED_ITEMS_DOG_MAP } from "constants/requiredItemsMap";

import { Checkbox } from "components/common";
import TextArea from "components/common/TextArea";
import Title from "components/common/Title";
import { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";

import * as S from "./styles";

const PolicyInfo = () => {
  const { control, register, setValue, getValues } = useFormContext();
  const allChecked = getValues("all");
  const getValueTerms = getValues([
    FIELD.LIMITS_INFO_TERM,
    FIELD.ACCIDENT_INFO_TERM,
    FIELD.ABANDONMENT_INFO_TERM
  ]);

  useEffect(() => {
    const allTermsChecked = getValueTerms.every(Boolean);

    if (allChecked !== allTermsChecked) {
      setValue("all", allTermsChecked);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getValueTerms, setValue]);

  useEffect(() => {
    setValue(FIELD.LIMITS_INFO_TERM, true);
    setValue(FIELD.ACCIDENT_INFO_TERM, true);
    setValue(FIELD.ABANDONMENT_INFO_TERM, true);
  }, [setValue]);

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
              isChecked={field.value}
              variant="fill"
            />
          )}
        />
      </S.Card>
      <S.Card>
        <Title
          htmlFor={FIELD.LIMITS_INFO}
          isRequired={REQUIRED_ITEMS_DOG_MAP?.get(FIELD_KEYS.LIMITS_INFO)}
        >
          이용 제한 유의 사항
        </Title>
        <S.Caption>내용을 자세히 읽고 동의 여부를 체크해 주세요</S.Caption>
        <TextArea {...register(FIELD.LIMITS_INFO)} isChecked={getValueTerms[0]} disabled />
        <S.Stack>
          <Controller
            name={FIELD.LIMITS_INFO_TERM}
            control={control}
            rules={{ required: REQUIRED_ITEMS_DOG_MAP?.get(FIELD_KEYS.LIMITS_INFO) }}
            render={({ field: { ref, ...field } }) => (
              <Checkbox label="동의합니다" ref={ref} isChecked={field.value} />
            )}
          />
        </S.Stack>
      </S.Card>
      <S.Card>
        <Title
          htmlFor={FIELD.ACCIDENT_INFO}
          isRequired={REQUIRED_ITEMS_DOG_MAP?.get(FIELD_KEYS.ACCIDENT_INFO)}
        >
          상해 유의사항
        </Title>
        <S.Caption>내용을 자세히 읽고 동의 여부를 체크해 주세요</S.Caption>
        <TextArea {...register(FIELD.ACCIDENT_INFO)} isChecked={getValueTerms[1]} disabled />
        <S.Stack>
          <Controller
            name={FIELD.ACCIDENT_INFO_TERM}
            control={control}
            rules={{ required: REQUIRED_ITEMS_DOG_MAP?.get(FIELD_KEYS.ACCIDENT_INFO) }}
            render={({ field: { ref, ...field } }) => (
              <Checkbox label="동의합니다" ref={ref} isChecked={field.value} />
            )}
          />
        </S.Stack>
      </S.Card>
      <S.Card>
        <Title
          htmlFor={FIELD.ABANDONMENT_INFO}
          isRequired={REQUIRED_ITEMS_DOG_MAP?.get(FIELD_KEYS.ABANDONMENT_INFO)}
        >
          유기 유의사항
        </Title>
        <S.Caption>내용을 자세히 읽고 동의 여부를 체크해 주세요</S.Caption>
        <TextArea {...register(FIELD.ABANDONMENT_INFO)} isChecked={getValueTerms[2]} disabled />
        <S.Stack>
          <Controller
            name={FIELD.ABANDONMENT_INFO_TERM}
            control={control}
            rules={{ required: REQUIRED_ITEMS_DOG_MAP?.get(FIELD_KEYS.ABANDONMENT_INFO) }}
            render={({ field: { ref, ...field } }) => (
              <Checkbox label="동의합니다" ref={ref} isChecked={field.value} />
            )}
          />
        </S.Stack>
      </S.Card>
    </>
  );
};

export default PolicyInfo;
