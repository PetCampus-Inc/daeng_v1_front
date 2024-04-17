import BackgroundGrayButton from "components/common/Button/BackgroundGrayButton";
import Checkbox from "components/common/Checkbox";

import * as S from "./styles";

const UnregisterInfo = () => {
  return (
    <>
      <div>
        <h3>똑독 탈퇴를 원하시나요?</h3>
        <span>탈퇴 전, 아래 내용을 확인해 주세요</span>
      </div>
      <div>
        <Checkbox />
        <p>지금까지 주고받은 채팅내역, 알림장, 사진앨범 등의 모든 기록이 <em>영구 삭제</em>되며 복구할 수 없어요</p>
      </div>
      <div>
        <Checkbox />
        <p>탈퇴 후 사용했던 소셜 아이디로 <em>재가입 시 신규 회원으로 가입</em> 돼요</p>
      </div>
      <div>
        <Checkbox />
        <p>원장님이 등록한 유치원의 <em>활동 기록</em>과 <em>정보</em>, 가입된 <em>회원 및 교사 정보</em>는 모두 <em>초기화</em>되고 복구되지 않아요</p>
      </div>
      <div>
        <Checkbox />
        <p>모든 개인 정보가 삭제돼요</p>
      </div>
      <div>
        <Checkbox />
        <p>위 안내사항에 모두 동의해요</p>
      </div>

      <BackgroundGrayButton>
        탈퇴하기
      </BackgroundGrayButton>
    </>

  );
};

export default UnregisterInfo;
