import ArrowRightIcon from "assets/svg/arrow-right-icon";
import CarIcon from "assets/svg/car-icon";
import GirlNormalIcon from "assets/svg/girl-normal-icon";

const DogInfo = () => {
  return (
    <>
      <div>
        <div>
          <img
            src="https://images.unsplash.com/photo-1591160690555-5debfba289f0?q=80&amp;w=2864&amp;auto=format&amp;fit=crop&amp;ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="dog_img"
          />
        </div>
        <div>
          <div>
            <span>뽀뽀</span>
            <span>소형견</span>
          </div>
          <div>
            <div>
              <GirlNormalIcon />
              암컷 / 중성화 O
            </div>
            <div>
              <GirlNormalIcon />
              2008.09.10
            </div>
            <div>
              <GirlNormalIcon />
              블랙 러시안 테리어
            </div>
          </div>
        </div>
        <button>
          <span>뽀뽀의 가입신청서</span>
          <ArrowRightIcon />
        </button>
      </div>

      <div>
        <section>
          <div>
            <div>
              <CarIcon />
              <h3>픽드랍 메모</h3>
            </div>
            <button>수정</button>
          </div>
          <p>월수금 픽드랍 필요해요 화요일에는 안오셔도 됩니당</p>
        </section>

        <section>
          <div>
            <div>
              <CarIcon />
              <h3>알러지 및 질병</h3>
            </div>
            <button>수정</button>
          </div>
          <p>뽀뽀의 알러지는 요 눈을 긁으면 빨간 점이 생깁니다.</p>
        </section>

        <section>
          <div>
            <div>
              <CarIcon />
              <h3>예방접종 파일</h3>
            </div>
            <button>추가 업로드</button>
          </div>
          <div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1591160690555-5debfba289f0?q=80&amp;w=2864&amp;auto=format&amp;fit=crop&amp;ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="dog_img"
              />
              <span>2023.12.12 업로드</span>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1591160690555-5debfba289f0?q=80&amp;w=2864&amp;auto=format&amp;fit=crop&amp;ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="dog_img"
              />
              <span>2023.12.12 업로드</span>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1591160690555-5debfba289f0?q=80&amp;w=2864&amp;auto=format&amp;fit=crop&amp;ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="dog_img"
              />
              <span>2023.12.12 업로드</span>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1591160690555-5debfba289f0?q=80&amp;w=2864&amp;auto=format&amp;fit=crop&amp;ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="dog_img"
              />
              <span>2023.12.12 업로드</span>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default DogInfo;
