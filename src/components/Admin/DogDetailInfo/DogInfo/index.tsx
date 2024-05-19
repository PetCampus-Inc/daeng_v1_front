import useGetDogAndMemberDetail from "hooks/api/useGetDogAndMemberDetail";
import { useLocation } from "react-router-dom";

import AboutDog from "./AboutDog";
import AboutOwner from "./AboutOwner";
import Memo from "./Memo";
import { InnerContainer } from "../styles";

const DogInfo = () => {
  const dogId = useLocation().pathname.split("/").pop();
  const { data, refetch } = useGetDogAndMemberDetail(Number(dogId));

  return (
    <InnerContainer>
      <AboutDog data={data.dogInfo} />

      <AboutOwner data={data.memberInfo} dogId={Number(dogId)} />

      <Memo memo={data.dogInfo?.dogMemo} id={data.dogInfo?.dogId} refetch={refetch} />
    </InnerContainer>
  );
};

export default DogInfo;
