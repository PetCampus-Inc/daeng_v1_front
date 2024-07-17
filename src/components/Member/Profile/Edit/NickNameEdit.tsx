import { TextInput } from "components/common";
import { useFormContext } from "react-hook-form";
import { css } from "styled-components";

interface INickNameEditProps {
  handleBlur: () => void;
  handleFocus: () => void;
}

const NickNameEdit = ({ handleBlur, handleFocus }: INickNameEditProps) => {
  const { register, getValues } = useFormContext();

  return (
    <>
      <TextInput
        register={register}
        {...register("nickName", { required: true })}
        placeholder="닉네임을 입력해주세요"
        defaultValue={getValues("dogName")}
        onFocus={handleFocus}
        onBlur={handleBlur}
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
