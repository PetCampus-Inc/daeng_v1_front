import { useEffect, useMemo, useState } from "react";
import { useRecoilState } from "recoil";
import { memberEnrollmentRejectedAtom } from "store/member";
import { IDoglist, IMemberInfo } from "types/member/main.types";

interface MemberInfoProps {
  data: IMemberInfo;
}

// 강아지 추가 승인 거부할 경우 상태 관리
export const useMemberRejected = () => {
  const STORAGE_KEY = {
    IS_REJECTED: "IS_REJECTED",
    VISIT_PATH_NAME: "VISIT_PATH_NAME"
  };

  const [isRejected, setIsRejected] = useRecoilState(memberEnrollmentRejectedAtom);
  const [rejectedDogs, setRejectedDogs] = useState([]);
  const [pendingDogs, setPendingDogs] = useState<IDoglist[]>([]);
  const IS_REJECTED = localStorage.getItem(STORAGE_KEY.IS_REJECTED);
  const VISIT_PATH_NAME = localStorage.getItem(STORAGE_KEY.VISIT_PATH_NAME);

  // pending 상태인 강아지만 저장하기
  const getPendingDogs = ({ data }: MemberInfoProps) => {
    const pendingDogList = data.doglist.filter((el) => el.status === "APPROVAL_PENDING");
    setPendingDogs(pendingDogList);
  };

  // 1회 표시 후 불필요한 localStorage 데이터 없애기
  const removeStorageDatas = () => {
    localStorage.removeItem(STORAGE_KEY.IS_REJECTED);
    localStorage.removeItem(STORAGE_KEY.VISIT_PATH_NAME);
  };

  // 관리자가 승인 거절 시 rejected 데이터 localStorage에 저장
  useEffect(() => {
    if (isRejected) {
      localStorage.setItem(STORAGE_KEY.IS_REJECTED, JSON.stringify(isRejected));
    }
  }, [isRejected]);

  return {
    isRejected,
    setIsRejected,
    rejectedDogs,
    setRejectedDogs,
    pendingDogs,
    setPendingDogs,
    getPendingDogs,
    IS_REJECTED,
    VISIT_PATH_NAME,
    removeStorageDatas,
    STORAGE_KEY
  };
};

export default useMemberRejected;
