import PlayIcon from "assets/svg/play-icon";

import * as S from "./styles";

interface ISinglePictureProps {
  src: string;
  isVideo?: boolean;
  selected?: boolean;
  isEditing?: boolean;
  onClick?: (url: string) => void;
  onSelect?: (url: string) => void;
}

const SinglePicture = ({
  src,
  isVideo = false,
  selected,
  isEditing,
  onClick,
  onSelect
}: ISinglePictureProps) => {
  /** 클릭 이벤트 */
  const handleClick = () => isEditing || onClick?.(src);

  /** 이미지 선택 이벤트 */
  const handleSelect = () => onSelect?.(src);

  return (
    <S.Container onClick={handleClick} data-edit-mode={isEditing}>
      {/* 이미지 */}
      <S.Image src={src} />

      {/* 이미지 선택 체크박스 */}
      {isEditing && (
        <S.CheckboxWrap data-edit-mode={isEditing}>
          <input type="checkbox" checked={selected} onChange={handleSelect} />
        </S.CheckboxWrap>
      )}

      {isVideo && (
        <S.VideoIconWrap>
          <PlayIcon w={16} h={16} />
        </S.VideoIconWrap>
      )}
    </S.Container>
  );
};

export default SinglePicture;
