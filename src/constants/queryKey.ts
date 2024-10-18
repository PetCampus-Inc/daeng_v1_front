const ADMIN_QUERY_KEY = {
  SCHOOL: ["school"], // 유치원 관리
  SCHOOL_ENROLLMENT: (formId: number) => ["schoolEnrollment", formId], // 원장 가입신청서 조회
  MEMBER_ENROLLMENT: (formId: number) => ["enrollment", formId], // 견주가 쓴 가입신청서 조회
  SCHOOL_ENROLLMENT_LIST: ["schoolEnrollmentList"], // 원장 가입신청서 리스트 조회
  MEMBER_ENROLLMENT_LIST: ["MemberEnrollmentList"], // 가입신청 대기 중인 견주 리스트
  TEACHER_LIST: ["teacherList"], // 선생님 리스트 조회

  ATTEND_LIST: ["attendDogList"], // 출석안한 강아지 리스트
  ATTEND_LIST_SEARCH: (searchText?: string) => ["attendDogList", searchText],
  ATTENDANCE_LIST: ["dogList"], // 출석부 강아지 리스트
  ATTENDANCE_LIST_SEARCH: (searchText?: string) => ["dogList", searchText], // 출석부 강아지 리스트
  ATTENDANCE_LIST_SORTNAME: (sortName: string) => ["dogList", sortName],
  ATTENDANCE_DOG_TICKET: (dogId: number) => ["dogTicket", dogId], // 출석부 강아지 상세 이용권 정보

  PRINCIPAL_INFO: ["principalInfo"], // 원장 마이페이지 데이터
  TEACHER_INFO: ["teacherInfo"], // 선상님 마이페이지 데이터

  CARE_DOG_LIST: ["careDogList"], // 강아지 관리 리스트
  CACHED_CARE_DOG_INFO: ["cachedCareDogInfo"], // 캐시된 강아지 관리 정보
  NEW_CARE_DOG_LIST: ["newCareDogList"], // 새로운 강아지 관리 리스트
  CARE_DOG_TEMP_SAVE: ["careDogTempSave"], // 강아지 알림장 임시저장
  CARE_DOG_AGENDA_SAVED: ["careDogAgendaSaved"], // 강아지 알림장 불러오기
  CARE_DOG_PAST_AGENDA: ["careDogPastAgenda"] // 강아지 지난 알림장 불러오기
};

const MEMBER_QUERY_KEY = {
  MEMBER_MAIN_ALBUM: (dogId?: number, date?: string) => ["mainAlbum", dogId, date], // 멤버 메인 앨범
  MEMBER_DOG_DETAIL_INFO: (dogId: number) => ["memberDogDetail", dogId], // 강아지 상세 정보
  MEMBER_DOG_ENROLLMENT_INFO: (dogId: number) => ["memberDogEnrollmentinfo", dogId], // 강아지 가입 신청서 (read only)
  SCHOOL_INFO_LIST: ["shcollInfoList"], // 마이페이지 견주의 강아지 유치원 정보
  MEMBER_MAIN_DOG_LIST: ["memberMainDogInfo"], // 견주의 강아지 리스트 (업데이트)
  MEMBER_SCHOOL_INFO: (dogId: string) => ["memberSchoolInfo", dogId], // 유치원 정보
  MEMBER_MYPAGE_MAIN_INFO: ["memberMypageMainInfo"], // 마이페이지 견주 정보 데이터
  MEMBER_MAIN_DOG_INFO: ["memberMainDogInfo"], // 견주의 강아지 리스트
  MEMBER_PROFILE_INFO: ["memberProfileInfo"], // 견주의 상제 정보 데이터
  MEMBER_PHONE_NUMBER: (dogId: number) => ["phoneNumber", dogId], // 견주 전화번호
  MEMBER_AGREEMENT_INFO: (agreementId: number) => ["memberAgreementInfo", agreementId], // 유의사항 동의 정보
  MEMBER_PROFILE: ["memberProfile"], // 프로필 설정
  DOG_SHCOOL_INFO: ["memberDogSchoolInfo"], // 강아지 유치원 정보
  HOME: (dogId?: number) => ["home", dogId], // 견주 홈 메인
  DOGS: ["dogs"], // 견주 홈 강아지 리스트
  AGENDA: (dogId: number, date?: string) => ["agenda", dogId, date], // 견주 홈 강아지 알림장
  MEMBER_ENROLLMENT_STATUS: ["memberEnrollmentStatus"], // 강아지 가입신청 상태 확인
  ALBUM: (dogId: number, date?: string) => ["album", dogId, date] // 견주 홈 강아지 앨범
};

export const QUERY_KEY = {
  ...ADMIN_QUERY_KEY,
  ...MEMBER_QUERY_KEY,
  ENROLLMENT: (schoolId: number) => ["enrollment", schoolId], // 견주 가입신청서 조회
  DOG_ENROLLMENT: (dogId: number, schoolId: number) => ["dogEnrollment", dogId, schoolId], // 유치원 재등록 가입신청서
  BREED: (searchText?: string) => ["breed", searchText] // 견종 검색
};
