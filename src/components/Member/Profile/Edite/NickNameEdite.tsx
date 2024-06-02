import { TextInput } from "components/common";
import { useFormContext } from "react-hook-form";
import { css } from "styled-components";

interface INickNameEditeProps {
  handleBlur: () => void;
  handleFocus: () => void;
}

const NickNameEdite = ({ handleBlur, handleFocus }: INickNameEditeProps) => {
  const { register, setValue, watch } = useFormContext();

  return (
    <>
      <TextInput
        register={register}
        {...register("nickName", { required: true })}
        placeholder="닉네임을 입력해주세요"
        value={watch("nickName")}
        onFocus={handleFocus}
        onBlur={handleBlur}
        css={InputStyle}
      />
    </>
  );
};

export default NickNameEdite;

const InputStyle = css`
  padding: 12px 18px;
  border: 1px solid ${({ theme }) => theme.colors.gray_5};
  flex: 2;

  ${({ theme }) => theme.typo.body2_16_R};
`;
