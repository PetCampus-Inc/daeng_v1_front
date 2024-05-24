import { PATH } from "constants/path";

import * as Pages from "pages";
import { Suspense } from "react";
import { RouteObject, redirect } from "react-router-dom";

const MemberRoutes = (): RouteObject[] => {
  return [
    {
      path: PATH.ROOT,
      children: [
        {
          index: true,
          element: (
            <Suspense>
              <Pages.HomePage />
            </Suspense>
          )
        },
        {
          path: PATH.MEMBER_MY_PAGE(),
          element: (
            <Suspense>
              <Pages.MemberMyPage />
            </Suspense>
          )
        },
        {
          path: PATH.MEMBER_MY_INFO_PAGE(),
          element: (
            <Suspense>
              <Pages.MemberMyInfoPage />
            </Suspense>
          )
        },
        {
          path: PATH.MEMBER_MY_INFO_EDIT_PAGE(),
          element: (
            <Suspense>
              <Pages.MemberMyInfoEditePage />
            </Suspense>
          )
        },
        {
          path: PATH.MEMBER_MY_SCHOOL_INFO(),
          element: (
            <Suspense>
              <Pages.MemberSchoolInfoPage />
            </Suspense>
          )
        },
        {
          path: PATH.MEMBER_MY_SCHOOL_SEARCH(),
          element: (
            <Suspense>
              <Pages.MemberSchoolSearchPage />
            </Suspense>
          )
        },
        {
          path: PATH.MEMBER_MY_ENROLLMENT(),
          element: (
            <Suspense>
              <Pages.MemberEnrollmentFormDogAddPage />
            </Suspense>
          )
        },
        {
          path: PATH.MEMBER_DOG_INFO_EDITE_PAGE(),
          element: (
            <Suspense>
              <Pages.MemberDogInfoEditePage />
            </Suspense>
          )
        },
        {
          path: PATH.MEMBER_DOG_ENROLLMENT_INFO_PAGE(),
          element: (
            <Suspense>
              <Pages.MemberEnrollmentDogInfoPage />
            </Suspense>
          )
        },
        {
          path: PATH.MEMBER_DOG_INFO_PAGE(),
          element: (
            <Suspense>
              <Pages.MemberDogInfoPage />
            </Suspense>
          )
        }
      ],
      loader: () => {
        if (!localStorage.getItem("token")) return redirect(PATH.LOGIN);
        return null;
      }
    }
  ];
};

export default MemberRoutes;