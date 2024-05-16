import { QUERY_KEY } from "constants/queryKey";

import { useQuery } from "@tanstack/react-query";
import { handleGetMainAlbum } from "apis/member/member.api";
import { IMainAlbum } from "types/member/home.types";

const useGetMainAlbum = (req: IMainAlbum) => {
  return useQuery({
    queryKey: QUERY_KEY.MEMBER_MAIN_ALBUM(req.dogId, req.date),
    queryFn: () => handleGetMainAlbum(req),
    gcTime: 1000 * 60 * 60,
    staleTime: 1000 * 60 * 60
  });
};

export default useGetMainAlbum;
