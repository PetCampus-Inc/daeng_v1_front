type Parameter = string | number;

/** 공용 */
const common = {
  root: "/",
  /** 홈 */
  home: {
    root: "/home"
  },
  /** 로그인 */
  login: {
    root: `/login`
  },
  /** 회원가입 */
  signup: {
    root: `/signup`
  },
  /** 서비스 정책 */
  policy: {
    /** 이용약관 */
    usage: {
      root: "/policy/usage"
    },
    /** 개인정보 처리 방침 */
    privacy: {
      root: "/policy/privacy"
    }
  },
  /** 승인 상태 */
  approval: {
    root: "/approval"
  },
  /** 회원 탈퇴 */
  unregister: {
    root: "/unregister",
    /** 회원 탈퇴 성공 */
    success: {
      root: "/unregister/success"
    }
  },
  /** 설정 */
  setting: {
    root: "/setting",
    /** 알림 설정 */
    notification: {
      root: "/setting/notification"
    }
  }
};

/** 원장님/선생님 */
const admin = {
  root: "/admin",
  /** 로그인 */
  login: {
    root: `/admin/login`
  },
  /** 회원 가입 */
  signup: {
    root: `/admin/signup`,
    /** 선생님 재가입 */
    rejoin: {
      root: `/signup/rejoin`
    }
  },
  /** 출석부 */
  attendance: {
    root: `/admin/attendance`,
    /** 강아지 상세정보 */
    info: {
      dynamic: (dogId?: Parameter) => `/admin/attendance/${dogId ?? ":dogId"}`,
      form: {
        dynamic: (dogId?: Parameter) => `/admin/attendance/${dogId ?? ":dogId"}/form`
      }
    },
    /** 강아지 갤러리 */
    gallery: {
      dynamic: (dogId?: Parameter) => `/admin/attendance/${dogId ?? ":dogId"}/gallery`
    },
    /** 강아지 갤러리 확대 보기*/
    galleryViewer: {
      dynamic: (dogId?: Parameter) => `/admin/attendance/${dogId ?? ":dogId"}/gallery-viewer`
    },
    /** 새 이용권 */
    newTicket: {
      dynamic: (dogId?: Parameter) => `/admin/attendance/${dogId ?? ":dogId"}/new-ticket`
    }
  },
  /** 오늘 관리할 강아지 */
  care: {
    root: `/admin/care`,
    delete: {
      root: `/admin/care/delete`
    },
    /** 알림장 */
    notice: {
      dynamic: (dogId?: Parameter) => `/admin/care/notice/${dogId ?? ":dogId"}`
    },
    /** 사진앨범 */
    gallery: {
      root: `/admin/care/gallery`,
      /** 사진앨범 전송 */
      dynamic: (dogId?: Parameter) => `/admin/care/gallery/${dogId ?? ":dogId"}`,
      /** 전송할 앨범 선택 */
      select: {
        root: `/admin/care/gallery/select`
      }
    }
  },
  /** 채팅 */
  chat: {
    root: `/admin/chat`
  },
  /** 유치원 운영 */
  school: {
    root: `/admin/school`,
    /** [원장] 선생님 관리 */
    teacher: {
      root: `/admin/school/teacher`
    },
    /** [원장] 신규가입 관리 */
    enrollment: {
      root: `/admin/school/enrollment`,
      /** [원장] 가입신청서 등록 */
      new: {
        root: `/admin/school/enrollment/new`
      },
      /** [원장] 가입신청서 목록 */
      ownerForms: {
        root: `/admin/school/enrollment/owner-forms`,
        /** [원장] 가입신청서 상세 조회 */
        dynamic: (formId?: Parameter) =>
          `/admin/school/enrollment/owner-forms/${formId ?? ":formId"}`,
        /** [원장] 가입신청서 수정 */
        edit: {
          dynamic: (formId?: Parameter) =>
            `/admin/school/enrollment/owner-forms/${formId ?? ":formId"}/edit`
        }
      },
      /** 견주 가입신청서 상세 조회 */
      memberForms: {
        dynamic: (formId?: Parameter) =>
          `/admin/school/enrollment/member-forms/${formId ?? ":formId"}`
      }
    }
  },
  /** 알림 */
  notification: {
    root: `/admin/notification`
  },
  /** 마이페이지 */
  mypage: {
    root: `/admin/mypage`,
    /** 설정 */
    setting: {
      root: `/admin/mypage/setting`
    },
    /** 계정 탈퇴 완료 */
    deleteComplete: {
      root: `/admin/mypage/delete-complete`
    },
    /** 유치원 상세 조회 */
    school: {
      root: `/admin/mypage/school`,
      /** [원장] 유치원 정보 수정 */
      edit: {
        root: `/admin/mypage/school/edit`
      }
    }
  }
};

/** 견주 */
const member = {
  /** 앨범 */
  album: {
    dynamic: (dogId?: Parameter) => `/album/${dogId ?? ":dogId"}`,
    /** 날짜별 사진앨범 */
    date: {
      dynamic: (dogId?: Parameter) => `/album/date-view/${dogId ?? ":dogId"}`
    }
  },
  /** 알림장 */
  agenda: {
    dynamic: (dogId?: Parameter) => `/agenda/${dogId ?? ":dogId"}`
  },
  /** 마이페이지 */
  mypage: {
    root: `/mypage`,
    /** 설정 페이지 */
    setting: {
      root: `/setting`
    },
    /** 계정 탈퇴 완료 */
    deleteComplete: {
      root: `/mypage/delete-complete`
    },
    /** 프로필 */
    profile: {
      root: `/mypage/profile`,
      /** 프로필 수정 */
      edit: {
        root: `/mypage/profile/edit`
      }
    },
    /** 강아지 추가/유치원 재가입 */
    enrollment: {
      root: `/mypage/enrollment`
    },
    dog: {
      /** 유치원 정보 */
      school: {
        dynamic: (dogId?: Parameter) => `/mypage/dog/${dogId ?? ":dogId"}/school`
      },
      /** 강아지 추가 */
      enrollment: {
        root: `/mypage/dog/enrollment` // TODO: 어디에 사용되는 주소인지?
      }
    }
  },
  /** 강아지 상세정보 */
  dogInfo: {
    dynamic: (dogId?: Parameter) => `/dog-info/${dogId ?? ":dogId"}`,
    /** 강아지 정보 수정 */
    edit: {
      dynamic: (dogId?: Parameter) => `/dog-info/${dogId ?? ":dogId"}/edit`
    },
    /** 유치원 가입신청서 */
    enrollment: {
      dynamic: (dogId?: Parameter, enrollmentFormId?: Parameter) =>
        `/dog-info/${dogId ?? ":dogId"}/enrollment/${enrollmentFormId ?? ":enrollmentFormId"}/detail`
    }
  },
  /** 온보딩 후 초기 프로필 설정 */
  profile: {
    root: `/profile`,
    /** 추가된 강아지 프로필 사진 설정 */
    dog: {
      root: `/profile/dog`
    }
  }
};

export const routes = { ...common, admin, member } as const;
