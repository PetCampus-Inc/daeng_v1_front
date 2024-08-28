import { AboutDogCard, AboutOwnerCard, DogMemo } from "components/Admin/DogDetailInfo/DogInfo";
import { InnerContainer } from "components/Admin/DogDetailInfo/styles";
import { useGetDogDetail } from "hooks/api/admin/dogs";

export function DogInfo({ dogId }: { dogId: number }) {
  const { data } = useGetDogDetail(dogId);

  return (
    <InnerContainer>
      <AboutDogCard data={data.dogInfo} />
      <AboutOwnerCard data={data.memberInfo} />
      <DogMemo memo={data.dogInfo.dogMemo} dogId={data.dogInfo.dogId} />
    </InnerContainer>
  );
}
