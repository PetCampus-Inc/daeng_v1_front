import { FIELD } from "constants/field";

import { TextInput } from "components/common";
import { useFormContext } from "react-hook-form";
import { css } from "styled-components";

const NickNameEdit = () => {
  const { register, getValues } = useFormContext();
  const { dogName } = getValues();

  return (
    <>
      <TextInput
        {...register(FIELD.NICK_NAME, {
          required: true,
          validate: (value) => value === dogName || value.length > 0
        })}
        register={register}
        placeholder="닉네임을 입력해 주세요"
        css={InputStyle}
        className="defaultValue"
      />
    </>
  );
};

export default NickNameEdit;

const InputStyle = css`
  padding: 12px 18px;
  border: 1px solid ${({ theme }) => theme.colors.gray_5};
  flex: 2;

  ${({ theme }) => theme.typo.body2_16_R};
`;
