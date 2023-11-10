export interface IResponse {
  status: number;
  message: string;
}

export interface IError {
  response: {
    data: {
      status: number;
      message: string;
      code: string;
    };
  };
}

export interface ITeacherSubmitResponse {
  data: {
    adminId: number;
    schoolId: number;
    name: string;
    phoneNumber: string;
  };
  status: number;
  message: string;
}
