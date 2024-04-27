import PencilBrownNormalIcon from "assets/svg/pencil-brown-normal-icon";

import * as S from "./styles";

const MyInfoEdite = () => {
  return (
    <>
      <S.MyProfileWrapper>
        <S.ProfileBox>
          <S.ImageBox>
            <S.UserImage
              src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="user_profile"
            />
          </S.ImageBox>
          <S.ProfileEditeButton>
            <PencilBrownNormalIcon />
          </S.ProfileEditeButton>
        </S.ProfileBox>
        <div>
          <div>
            <input type="text" placeholder="뽀뽀" />
            <span>의</span>
          </div>
          <button>아빠</button>
        </div>
      </S.MyProfileWrapper>
    </>
  );
};

export default MyInfoEdite;
