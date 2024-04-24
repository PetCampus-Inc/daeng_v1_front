import BasicPhoneIcon from "assets/svg/phone-basic";

const MyInfo = () => {
  return (
    <div>
      <div>
        <h3>견주 정보</h3>
        <span>가입신청서 작성시 입력한 내용이에요</span>
      </div>
      <div>
        <div>
          <img
            src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="user_profile"
          />
        </div>
        <span>뽀뽀의 언니 / 누나</span>
      </div>
      <ul>
        <li>
          <span>
            <BasicPhoneIcon />
            이름
          </span>
          <span>박유빈</span>
        </li>
        <li>
          <span>
            <BasicPhoneIcon />
            성별
          </span>
          <span>여</span>
        </li>
        <li>
          <span>
            <BasicPhoneIcon />
            연락처
          </span>
          <span>010-1414-1414</span>
        </li>
        <li>
          <span>
            <BasicPhoneIcon />
            비상연락처
          </span>
          <span>010-1414-1414</span>
        </li>
        <li>
          <span>
            <BasicPhoneIcon />
            주소
          </span>
          <span>서울 중구 덕수궁길 150 롯데캐슬 아파트 203동 1403호</span>
        </li>
      </ul>
    </div>
  );
};

export default MyInfo;
