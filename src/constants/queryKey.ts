export const QUERY_KEY = {
  ADMIN_ENROLLMENT: (formId: string) => ["enrollment", formId], // 원장 가입신청서 조회
  ENROLLMENT: (schoolId: string, memberId: string) => ["enrollment", schoolId, memberId], // 견주 가입신청서 조회
  MEMBER_ENROLLMENT: (formId: string) => ["enrollment", formId], // 견주가 쓴 가입신청서 조회
  NEW_ENROLLMENT_LIST: (adminId: number) => ["newEnrollment", adminId], // 웑장 새로운 가입신청서 리스트 조회
  TEACHER_LIST: ["teacherList"], // 선생님 리스트 조회
  BREED: (searchText?: string) => ["breed", searchText], // 견종 검색
  ATTEND_LIST: ["attendDogList"], // 출석안한 강아지 리스트
  ATTEND_LIST_SEARCH: (schoolId: number, searchText?: string) => [
    "attendDogList",
    schoolId,
    searchText
  ],
  ATTENDANCE_LIST: ["dogList"], // 출석부 강아지 리스트
  ATTENDANCE_LIST_SEARCH: (schoolId: number, searchText?: string) => [
    "dogList",
    schoolId,
    searchText
  ], // 출석부 강아지 리스트 with 유치원아이디 and 검색어
  ATTENDANCE_LIST_SORTNAME: (sortName: string) => ["dogList", sortName],
  MEMBER_PHONE_NUMBER: (dogId: number) => ["phoneNumber", dogId], // 견주 전화번호
  MEMBER_WAITING_LIST: ["WaitingMemberList"], // 가입신청 대기 중인 견주 리스트
  CARE_DOG_LIST: ["careDogList"], // 강아지 관리 리스트
  NEW_CARE_DOG_LIST: ["newCareDogList"], // 새로운 강아지 관리 리스트
  PRINCIPAL_INFO: ["principalInfo"], // 원장 마이페이지 데이터
  TEACHER_INFO: ["teacherInfo"], // 선상님 마이페이지 데이터
  MEMBER_INFO: (memberId: string) => ["memberInfo", memberId], // 견주 정보 데이터
  MEMBER_MAIN_DOG_INFO: (memberId: string) => ["memberMainDogInfo", memberId], // 견주의 강아지 리스트
  MEMBER_SCHOOL_INFO: (dogId: string) => ["memberSchoolInfo", dogId] // 유치원 정보
};
