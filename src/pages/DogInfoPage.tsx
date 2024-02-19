import Header from "components/common/Header";
import NavBar from "components/common/NavBar";
import DogInfo from "components/Admin/DogDetailInfo/DogInfo";
import { PATH } from "constants/path";
import { motion } from "framer-motion";
import { ADMIN_DOG_DETAIL_INFO_STEP } from "constants/step";
import useStep from "hooks/common/useStep";
import AttendanceRecord from "components/Admin/DogDetailInfo/AttendanceRecord";
import Ticket from "components/Admin/DogDetailInfo/Ticket";
import Notice from "components/Admin/DogDetailInfo/Notice";
import { PageContainer, WhiteBackground } from "styles/StyleModule";

const DogInfoPage = () => {
  const currentSteps = ADMIN_DOG_DETAIL_INFO_STEP;
  const { currentStep, setStep } = useStep(0, currentSteps.length - 1);

  return (
    <>
      {/* <Header type="main" /> */}
      <PageContainer>
        <WhiteBackground>
          <nav>
            <ul style={{ display: "flex" }}>
              {currentSteps.map((item, index) => (
                <li
                  style={{
                    backgroundColor: "lightgray",
                    padding: "10px",
                    margin: "10px",
                    cursor: "pointer"
                  }}
                  key={item}
                  className={index === currentStep ? "selected" : ""}
                  onClick={() => setStep(index)}
                >
                  {item}
                  {index === currentStep ? (
                    <motion.div
                      style={{ backgroundColor: "red", height: "10px" }}
                      className="underline"
                      layoutId="underline"
                    />
                  ) : null}
                </li>
              ))}
            </ul>
          </nav>
          <div>
            {currentStep === 0 && <DogInfo />}
            {currentStep === 1 && <AttendanceRecord />}
            {currentStep === 2 && <Ticket />}
            {currentStep === 3 && <Notice />}
          </div>
          {/* <DogInfo /> */}
          <NavBar type="admin" attendance={PATH.ADMIN_DOG_INFO} />
        </WhiteBackground>
      </PageContainer>
    </>
  );
};

export default DogInfoPage;
