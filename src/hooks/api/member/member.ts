import { PATH } from "constants/path";
import { QUERY_KEY } from "constants/queryKey";

import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { handleGetDogEnrollment, handleGetSchoolInfo } from "apis/member/enrollment.api";
import {
  handleGetAlbum,
  handleGetDogs,
  handleGetHomeInfo,
  handleGetMemberDogDetailInfo,
  handleGetMemberInfo,
  handleGetMemberProfile,
  handleGetMemberProfileInfo,
  handleMemberInfoResult,
  handlePostMemberDogDelete,
  handlePostMemberDogDetailInfo,
  handlePostMemberDogEnrollment,
  handlePostMemberProfile,
  handlePostMemoDogAllergy,
  handlePostMemoDogPickdrop
} from "apis/member/member.api";
import { Adapter, DogInfoFormAdapter } from "libs/adapters";
import { useNavigate } from "react-router-dom";
import { getISOString } from "utils/date";
import showToast from "utils/showToast";

import type {
  HomeDataType,
  HomeInfoType,
  ImageList,
  ImageListType,
  IMainAlbum,
  IMemberProfile,
  IMemberProfilePostInfo,
  MemberDogInfoData,
  MemberDogInfoFormData
} from "types/member/main.types";

// 견주 홈 - 메인
export const useGetHomeInfo = (memberId: number, dogId: number) => {
  return useSuspenseQuery<HomeDataType, unknown, HomeInfoType>({
    queryKey: QUERY_KEY.HOME(memberId, dogId),
    queryFn: () => handleGetHomeInfo(memberId, dogId),
    select: (res) => {
      const updatedImageList = res.imageList?.map((imageArray) =>
        imageArray.map((image) => ({
          ...image,
          createdTime: getISOString(image.createdTime)
        }))
      );

      return {
        ...res,
        attendanceDate: res.attendanceDate?.join("-"),
        imageList: updatedImageList
      };
    }
  });
};

// 견주 홈 - 강아지 리스트
export const useGetDogs = (memberId: number) => {
  return useQuery({
    queryKey: QUERY_KEY.DOGS(memberId),
    queryFn: () => handleGetDogs(memberId),
    staleTime: 60000
  });
};

// 견주 홈 - 강아지 리스트 프리패칭
export const usePrefetchDogs = (memberId: number) => {
  const queryClient = useQueryClient();
  return () =>
    queryClient.prefetchQuery({
      queryKey: QUERY_KEY.DOGS(memberId),
      queryFn: () => handleGetDogs(memberId),
      staleTime: 60000
    });
};

// 견주 홈 - 사진 앨범
export const useGetMainAlbum = (req: IMainAlbum) => {
  return useSuspenseQuery<ImageList[][], unknown, ImageListType[][]>({
    queryKey: QUERY_KEY.MEMBER_MAIN_ALBUM(req.dogId, req.date),
    queryFn: () => handleGetAlbum(req),
    gcTime: 1000 * 60 * 60,
    staleTime: 1000 * 60 * 60,
    select: (res) => {
      return res.map((imageArray) =>
        imageArray.map((image) => ({
          ...image,
          createdTime: getISOString(image.createdTime)
        }))
      );
    }
  });
};

// 견주 정보
export const useGetMemberInfo = (memberId: string) => {
  return useSuspenseQuery({
    queryKey: QUERY_KEY.MEMBER_INFO,
    queryFn: () => handleGetMemberInfo(memberId)
  });
};

export const useGetMemberSchoolInfo = (dogId: string) => {
  return useSuspenseQuery({
    queryKey: QUERY_KEY.MEMBER_SCHOOL_INFO(dogId),
    queryFn: () => handleGetSchoolInfo(dogId)
  });
};

// 마이페이지 - 견주 프로필 조회
export const useGetMemberProfileInfo = (memberId?: string) => {
  if (!memberId) throw new Error("memberId is required");

  return useSuspenseQuery({
    // NOTE: 쿼리키를 memberId로 관리할 필요가 있을까요? 로그인, 로그아웃 외에 memberId가 변할 경우가 없어보여요!
    queryKey: QUERY_KEY.MEMBER_PROFILE_INFO(memberId),
    queryFn: () => handleGetMemberProfileInfo(memberId)
  });
};

// 마이페이지 - 견주 프로필 수정
export const usePostMemberProfileInfo = (memberId: string) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (req: IMemberProfilePostInfo) => handleMemberInfoResult(req),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.MEMBER_PROFILE_INFO(memberId) });
    }
  });

  return { mutateProfileInfo: mutate };
};

// 견주 가입신청서 취소
export const usePostMemberDogEnrollment = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (enrollmentFormId: string) => handlePostMemberDogEnrollment(enrollmentFormId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.MEMBER_INFO });
    },
    onError: () => {
      showToast("실패했습니다. 다시 시도해주세요", "bottom");
    }
  });

  return { mutateCancelEnrollment: mutate };
};

// 강아지 삭제
export const usePostMemberDogDelete = (memberId: string) => {
  const queryClient = useQueryClient();
  const memberDogDeleteMutation = useMutation({
    mutationFn: (dogId: string) => handlePostMemberDogDelete(memberId, dogId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.MEMBER_INFO });
    }
  });

  return memberDogDeleteMutation.mutate;
};

// 강아지 가입신청서 보기 (read only)
export const useGetMemberDogEnrollmentInfo = (dogId: number) => {
  return useSuspenseQuery({
    queryKey: QUERY_KEY.MEMBER_DOG_ENROLLMENT_INFO(dogId),
    queryFn: () => handleGetDogEnrollment(dogId)
  });
};

// 견주 홈 - 강아지 상세 정보
export const useGetMemberDogDetailInfo = (dogId: number) => {
  return useSuspenseQuery({
    queryKey: QUERY_KEY.MEMBER_DOG_DETAIL_INFO(dogId),
    queryFn: () => handleGetMemberDogDetailInfo(dogId),
    select: (data) => {
      return Adapter.from(data).to<MemberDogInfoData, MemberDogInfoFormData>((item) => {
        const adapterInstance = new DogInfoFormAdapter(item);
        return adapterInstance.adapt();
      });
    }
  });
};

// 강아지 상세 정보 수정
export const usePostMemberDogDetailInfo = (dogId: number) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: handlePostMemberDogDetailInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.MEMBER_DOG_DETAIL_INFO(dogId) });
      navigate(PATH.MEMBER_DOG_INFO_PAGE(dogId), { replace: true });
      setTimeout(() => {
        showToast("수정이 완료되었습니다.", "bottom");
      }, 100);
    },
    onError: () => {
      showToast("실패했습니다. 다시 시도해주세요", "bottom");
    }
  });

  return { mutatePostDogDetailInfo: mutate };
};

// 강아지의 알러지/질병 내용 수정
export const usePostMemberDogAllergy = (dogId: number) => {
  const queryClient = useQueryClient();
  const memberDogAllergyMutation = useMutation({
    mutationFn: ({ dogId, memo }: { dogId: number; memo: string }) =>
      handlePostMemoDogAllergy(dogId, memo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.MEMBER_DOG_DETAIL_INFO(dogId) });
      showToast("수정이 완료되었습니다.", "bottom");
    },
    onError: () => {
      showToast("메모 등록을 실패했습니다. 다시 시도해주세요", "bottom");
    }
  });

  return memberDogAllergyMutation.mutate;
};

// 강아지의 픽드랍 메모 수정
export const usePostMemberDogPickDrop = (dogId: number) => {
  const queryClient = useQueryClient();
  const memberDogPickDropMutation = useMutation({
    mutationFn: ({ dogId, memo }: { dogId: number; memo: string }) =>
      handlePostMemoDogPickdrop(dogId, memo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.MEMBER_DOG_DETAIL_INFO(dogId) });
      showToast("수정이 완료되었습니다.", "bottom");
    },
    onError: () => {
      showToast("메모 등록을 실패했습니다. 다시 시도해주세요", "bottom");
    }
  });

  return memberDogPickDropMutation.mutate;
};

// 회원 가입승인후 초기 견주, 강아지 프로필을 설정 데이터 조회
export const useGetMemberProfile = (memberId: number) => {
  return useSuspenseQuery({
    queryKey: QUERY_KEY.MEMBER_PROFILE(memberId),
    queryFn: () => handleGetMemberProfile(memberId)
  });
};
// 회원 가입승인후 초기 견주, 강아지 프로필을 설정
export const usePostMemberProfile = () => {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: (req: IMemberProfile) => handlePostMemberProfile(req),
    onSuccess: () => {
      navigate(PATH.ROOT);
    },
    onError: () => {
      showToast("프로필 등록을 실패했습니다. 다시 시도해주세요", "bottom");
    }
  });

  return { mutateMemberProfile: mutate };
};
