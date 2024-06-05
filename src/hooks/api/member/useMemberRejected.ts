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
    PENDING_DOGS: "PENDING_DOGS",
    IS_REJECTED: "IS_REJECTED",
    VISIT_PATH_NAME: "VISIT_PATH_NAME"
  };

  const [isRejected, setIsRejected] = useRecoilState(memberEnrollmentRejectedAtom);
  const [rejectedDogs, setRejectedDogs] = useState([]);
  const [pendingDogs, setPendingDogs] = useState<IDoglist[]>([]);
  const PENDING_DOGS = localStorage.getItem(STORAGE_KEY.PENDING_DOGS);
  const IS_REJECTED = localStorage.getItem(STORAGE_KEY.IS_REJECTED);
  const VISIT_PATH_NAME = localStorage.getItem(STORAGE_KEY.VISIT_PATH_NAME);

  // localStorage에 저장된 Pending상태 강아지 정보 불러오기
  const StoragePendingDogs = useMemo(() => {
    return PENDING_DOGS ? JSON.parse(PENDING_DOGS) : pendingDogs;
  }, [PENDING_DOGS, pendingDogs]);

  // pending 상태인 강아지만 저장하기
  const getPendingDogs = ({ data }: MemberInfoProps) => {
    const pendingDogList = data.doglist.filter((el) => el.status === "APPROVAL_PENDING");
    setPendingDogs(pendingDogList);
  };

  // rejected인 강아지 파악후 리스트 저장하기
  const getRejectedDogs = ({ data }: MemberInfoProps) => {
    const approvalPeningDogs =
      IS_REJECTED && data.doglist.filter((el) => el.status === "APPROVAL_PENDING");
    const rejectedDogs = StoragePendingDogs.filter(
      (dog: { dogName: string }) =>
        approvalPeningDogs && !approvalPeningDogs.some((item) => item.dogName === dog.dogName)
    );
    setRejectedDogs(rejectedDogs);
  };

  // stolage에 pending상태 강아지 데이터 저장
  const updataStoragePendingDogs = () => {
    setPendingDogs(StoragePendingDogs);
  };

  // 1회 표시 후 불필요한 localStorage 데이터 없애기
  const removeStorageDatas = () => {
    localStorage.removeItem(STORAGE_KEY.IS_REJECTED);
    localStorage.removeItem(STORAGE_KEY.VISIT_PATH_NAME);

    if (PENDING_DOGS === "{}" || PENDING_DOGS === null) {
      localStorage.removeItem(STORAGE_KEY.PENDING_DOGS);
    }
  };

  // 관리자가 승인 거절 시 rejected 데이터 localStorage에 저장
  useEffect(() => {
    if (isRejected) {
      localStorage.setItem(STORAGE_KEY.IS_REJECTED, JSON.stringify(isRejected));
    }
  }, [isRejected]);

  // pending 상태의 강아지 정보 저장
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY.PENDING_DOGS, JSON.stringify(pendingDogs));
  }, [pendingDogs]);

  return {
    isRejected,
    setIsRejected,
    rejectedDogs,
    setRejectedDogs,
    pendingDogs,
    setPendingDogs,
    getRejectedDogs,
    getPendingDogs,
    StoragePendingDogs,
    PENDING_DOGS,
    IS_REJECTED,
    VISIT_PATH_NAME,
    updataStoragePendingDogs,
    removeStorageDatas,
    STORAGE_KEY
  };
};

export default useMemberRejected;
