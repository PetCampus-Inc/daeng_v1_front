import CircleSelectIcon from "assets/svg/circle-select-icon";
import ZoomInIcon from "assets/svg/zoom-in-icon";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import * as S from "./styles";

interface ISinglePictureProps extends React.InputHTMLAttributes<HTMLInputElement> {
  picture: string;
  mode: "view" | "edit";
}

const SinglePicture = ({ picture, mode }: ISinglePictureProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const { register, watch, setValue } = useFormContext();

  const isEditMode = mode === "edit";

  const openZoomInModal = () => {
    console.log("모달 열기");
  };

  useEffect(() => {
    setIsChecked(false);
  }, [mode]);

  return (
    <>
      <S.SinglePictureInput
        id={picture}
        type="checkbox"
        onClick={() => setIsChecked(!isChecked)}
        disabled={!isEditMode}
        checked={isChecked}
        value={picture}
        // {...register(name, { required: isRequired, onChange: handleTouch })}
      />
      <S.SinglePictureLabel htmlFor={picture}>
        <S.SinglePictureImg src={picture} />
        {isEditMode && (
          <>
            <S.CircleSelectIconWrapper>
              <CircleSelectIcon isChosen={isChecked} />
            </S.CircleSelectIconWrapper>
            <S.ZoomInIconWrapper onClick={openZoomInModal}>
              <ZoomInIcon />
            </S.ZoomInIconWrapper>
          </>
        )}
      </S.SinglePictureLabel>
    </>
  );
};

export default SinglePicture;
