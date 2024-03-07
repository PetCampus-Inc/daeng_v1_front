export const QUERY_KEY = {
  ADMIN_ENROLLMENT: (formId: string) => ["enrollment", formId], // 원장 가입신청서 조회
  ENROLLMENT: (schoolId: string, memberId: string) => ["enrollment", schoolId, memberId], // 견주 가입신청서 조회
  NEW_ENROLLMENT_LIST: (adminId: number) => ["newEnrollment", adminId], // 웑장 새로운 가입신청서 리스트 조회
  TEACHER_LIST: ["teacherList"], // 선생님 리스트 조회
  BREED: ["breed"], // 견종 검색
  ATTEND_LIST: ["attendDogList"], // 출석안한 강아지 리스트
  ATTEND_LIST_ID: (schoolId: number) => ["attendDogList", schoolId], // 출석안한 강아지 리스트 with 유치원아이디
  ATTEND_LIST_SEARCH: (schoolId: number, searchText: string) => [
    "attendDogList",
    schoolId,
    searchText
  ],
  ATTENDANCE_LIST: ["dogList"], // 출석부 강아지 리스트
  ATTENDANCE_LIST_ID: (schoolId: number) => ["dogList", schoolId], // 출석부 강아지 리스트 with 유치원아이디
  ATTENDANCE_LIST_SEARCH: (schoolId: number, searchText: string) => [
    "dogList",
    schoolId,
    searchText
  ], // 출석부 강아지 리스트 with 유치원아이디 and 검색어
  MEMBER_PHONE_NUMBER: (dogId: number) => ["phoneNumber", dogId], // 견주 전화번호
  MEMBER_WAITING_LIST: ["WaitingMemberList"] // 가입신청 대기 중인 견주 리스트
};
