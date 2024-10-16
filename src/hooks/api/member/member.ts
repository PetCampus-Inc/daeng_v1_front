import { routes } from "constants/path";
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
  handlePostMemoDogVaccination,
  handlePostMemberProfile,
  handlePostMemoDogAllergy,
  handlePostMemoDogPickdrop,
  handlePostDogProfile,
  handleCancelMemberEnrollment,
  handleDeleteMember
} from "apis/member/member.api";
import {
  Adapter,
  DataFormatAdapter,
  DogInfoFormAdapter,
  MemberForm2FeForAdminAdapter
} from "libs/adapters";
import { useNavigate } from "react-router-dom";
import { MemberFormData } from "types/admin/enrollment.types";
import showToast from "utils/showToast";

import type {
  IMemberProfile,
  IMemberProfilePostInfo,
  MemberDogInfoData,
  MemberDogInfoFormData,
  DogVaccination,
  DogProfileReq,
  IMemberProfileInfo
} from "types/member/main.types";

// 견주 홈 - 메인
export const useGetHomeInfo = (dogId: number) => {
  return useSuspenseQuery({
    queryKey: QUERY_KEY.HOME(dogId),
    queryFn: () => handleGetHomeInfo(dogId)
  });
};

// 견주 홈 - 강아지 리스트
export const useGetDogs = (selectedId?: string) => {
  return useQuery({
    queryKey: QUERY_KEY.DOGS,
    queryFn: handleGetDogs,
    staleTime: 60000,
    select: (data) => {
      return data.sort((a, b) => {
        if (a.dogId.toString() === selectedId) return -1;
        if (b.dogId.toString() === selectedId) return 1;
        return 0;
      });
    }
  });
};

// 견주 홈 - 강아지 리스트 프리패칭
export const usePrefetchDogs = () => {
  const queryClient = useQueryClient();
  return () =>
    queryClient.prefetchQuery({
      queryKey: QUERY_KEY.DOGS,
      queryFn: handleGetDogs,
      staleTime: 60000
    });
};

// 견주 홈 - 사진 앨범
export const useGetMainAlbum = (req: { dogId: number; date?: string }) => {
  return useSuspenseQuery({
    queryKey: QUERY_KEY.MEMBER_MAIN_ALBUM(req.dogId, req.date),
    queryFn: () => handleGetAlbum(req),
    gcTime: 1000 * 60 * 60,
    staleTime: 1000 * 60 * 60
  });
};

// 견주 정보
export const useGetMemberInfo = () => {
  return useSuspenseQuery({
    queryKey: QUERY_KEY.MEMBER_MYPAGE_MAIN_INFO,
    queryFn: () => handleGetMemberInfo()
  });
};

export const useGetMemberSchoolInfo = (dogId: string) => {
  return useSuspenseQuery({
    queryKey: QUERY_KEY.MEMBER_SCHOOL_INFO(dogId),
    queryFn: () => handleGetSchoolInfo(dogId)
  });
};

// 마이페이지 - 견주 프로필 조회
export type ProfileInfo = ReturnType<DataFormatAdapter<IMemberProfileInfo>["toFrontend"]>;
export const useGetMemberProfileInfo = () => {
  return useSuspenseQuery({
    queryKey: QUERY_KEY.MEMBER_PROFILE_INFO,
    queryFn: () => handleGetMemberProfileInfo(),
    select: (data) => {
      return Adapter.from(data).to<typeof data, ProfileInfo>((item) =>
        new DataFormatAdapter(item).toFrontend()
      );
    }
  });
};

// 마이페이지 - 견주 프로필 수정
export const usePostMemberProfileInfo = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (req: IMemberProfilePostInfo) => handleMemberInfoResult(req),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.MEMBER_PROFILE_INFO });
      navigate(routes.member.mypage.profile.root);
      setTimeout(() => {
        showToast("수정이 완료되었습니다.", "bottom");
      }, 100);
    },
    onError: () => {
      showToast("실패했습니다. 다시 시도해주세요", "bottom");
    }
  });

  return { mutateProfileInfo: mutate };
};

// 견주 가입신청서 취소
export const useCancelMemberEnrollment = () => {
  const { mutate } = useMutation({
    mutationFn: handleCancelMemberEnrollment,
    onError: () => {
      showToast("실패했습니다. 다시 시도해주세요", "bottom");
    }
  });

  return { mutateCancelEnrollment: mutate };
};

// 견주 가입신청서 취소
export const usePostMemberDogEnrollment = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (enrollmentFormId: number) => handlePostMemberDogEnrollment(enrollmentFormId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.MEMBER_MYPAGE_MAIN_INFO });
    },
    onError: () => {
      showToast("실패했습니다. 다시 시도해주세요", "bottom");
    }
  });

  return { mutateCancelEnrollment: mutate };
};

// 강아지 삭제
export const usePostMemberDogDelete = () => {
  const queryClient = useQueryClient();
  const memberDogDeleteMutation = useMutation({
    mutationFn: (dogId: string) => handlePostMemberDogDelete(dogId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.MEMBER_MYPAGE_MAIN_INFO });
      showToast("강아지가 삭제되었습니다", "bottom");
    },
    onError: () => {
      showToast("실패했습니다. 다시 시도해주세요", "bottom");
    }
  });

  return memberDogDeleteMutation.mutate;
};

// 강아지 가입신청서 조회
export const useGetMemberDogEnrollmentInfo = (enrollmentFormId: number) => {
  return useSuspenseQuery({
    queryKey: QUERY_KEY.MEMBER_DOG_ENROLLMENT_INFO(enrollmentFormId),
    queryFn: () => handleGetDogEnrollment(enrollmentFormId),
    select: (data) =>
      Adapter.from(data).to((item: MemberFormData) =>
        new MemberForm2FeForAdminAdapter(item).adapt()
      )
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
      navigate(routes.member.dogInfo.dynamic(dogId), { replace: true });
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

// 강아지의 방접종 파일 파일 업로드
export const usePostMembeVaccination = (dogId: number) => {
  const queryClient = useQueryClient();
  const memberDogAllerayMutation = useMutation({
    mutationFn: (req: DogVaccination) => handlePostMemoDogVaccination(req),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.MEMBER_DOG_DETAIL_INFO(dogId) });
      showToast("예방 접종 파일이 업로드되었습니다.", "bottom");
    },
    onError: () => {
      showToast("업로드가 실패했습니다. 다시 시도해주세요", "bottom");
    }
  });

  return memberDogAllerayMutation.mutate;
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
export const useGetMemberProfile = () => {
  return useSuspenseQuery({
    queryKey: QUERY_KEY.MEMBER_PROFILE,
    queryFn: () => handleGetMemberProfile()
  });
};

// 회원 가입승인후 초기 견주, 강아지 프로필을 설정
export const usePostMemberProfile = () => {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: (req: IMemberProfile) => handlePostMemberProfile(req),
    onSuccess: () => {
      navigate(routes.root);
    },
    onError: () => {
      showToast("프로필 등록을 실패했습니다. 다시 시도해주세요", "bottom");
    }
  });

  return { mutateMemberProfile: mutate };
};

// 강아지 승인 후 초기 프로필 설정 (두번째 강아지 이후)
export const usePostDogProfile = (dogId: number) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: (req: DogProfileReq) => handlePostDogProfile(req),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.HOME(dogId) });
      navigate(routes.root);
    },
    onError: () => {
      showToast("프로필 등록을 실패했습니다. 다시 시도해주세요", "bottom");
    }
  });

  return { mutateDogProfile: mutate };
};

//회원 탈퇴
export const useDeleteMember = () => {
  const { mutate } = useMutation({
    mutationFn: handleDeleteMember
  });

  return { mutateDeleteMember: mutate };
};
