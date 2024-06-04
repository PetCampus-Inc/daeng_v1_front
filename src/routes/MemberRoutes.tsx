import { PATH } from "constants/path";

import * as Pages from "pages";
import { Suspense } from "react";
import { RouteObject, redirect } from "react-router-dom";
import { ACCESS_TOKEN_KEY } from "store/auth";

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
          path: PATH.ALBUM,
          element: (
            <Suspense>
              <Pages.ImageAlbumPage />
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
        },
        {
          path: PATH.MEMEBER_PROFILE_EDITE_PAGE,
          element: (
            <Suspense>
              <Pages.MemberOnboardingProfileEditePage />
            </Suspense>
          )
        },
        {
          path: PATH.MEMEBER_ADD_DOG_PROFILE_EDITE_PAGE,
          element: (
            <Suspense>
              <Pages.MemberAddDogProfileEditePage />
            </Suspense>
          )
        }
      ],
      loader: () => {
        // if (!localStorage.getItem(ACCESS_TOKEN_KEY)) return redirect(PATH.LOGIN);
        return null;
      }
    }
  ];
};

export default MemberRoutes;
