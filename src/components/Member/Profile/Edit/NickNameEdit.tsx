import { FIELD } from "constants/field";

import { TextInput } from "components/common";
import { useFormContext } from "react-hook-form";
import { css } from "styled-components";

const NickNameEdit = () => {
  const { register } = useFormContext();
  return (
    <>
      <TextInput
        register={register}
        name={FIELD.NICK_NAME}
        required={true}
        placeholder="닉네임을 입력해주세요"
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
