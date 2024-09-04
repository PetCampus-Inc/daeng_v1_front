import { PATH } from "constants/path";

import * as Pages from "pages";
import { Suspense } from "react";
import { RouteObject } from "react-router-dom";
import PrivateRouter from "routes/PrivateRouter";
import { Role } from "types/common/role.types";

const MemberRoutes = (): RouteObject[] => {
  return [
    {
      element: <PrivateRouter roles={[Role.ROLE_MEMBER]} />,
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
          path: PATH.AGENDA(),
          element: <Pages.AgendaPage />
        },
        {
          path: PATH.MEMBER_MY_PAGE,
          element: (
            <Suspense>
              <Pages.MemberMyPage />
            </Suspense>
          )
        },
        {
          path: PATH.MEMBER_MY_INFO_PAGE,
          element: (
            <Suspense>
              <Pages.MemberMyInfoPage />
            </Suspense>
          )
        },
        {
          path: PATH.MEMBER_MY_INFO_EDIT_PAGE,
          element: (
            <Suspense>
              <Pages.MemberMyInfoEditPage />
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
          path: PATH.MEMBER_MY_SCHOOL_SEARCH,
          element: (
            <Suspense>
              <Pages.MemberSchoolSearchPage />
            </Suspense>
          )
        },
        {
          path: PATH.MEMBER_MY_ENROLLMENT,
          element: (
            <Suspense>
              <Pages.MemberEnrollmentFormDogAddPage />
            </Suspense>
          )
        },
        {
          path: PATH.MEMBER_DOG_INFO_EDIT_PAGE(),
          element: (
            <Suspense>
              <Pages.MemberDogInfoEditPage />
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
          path: PATH.MEMBER_PROFILE_EDIT_PAGE,
          element: (
            <Suspense>
              <Pages.MemberProfileEditPage />
            </Suspense>
          )
        },
        {
          path: PATH.MEMBER_ADD_DOG_PROFILE_EDIT_PAGE,
          element: (
            <Suspense>
              <Pages.MemberAddDogProfileEditPage />
            </Suspense>
          )
        }
      ]
    }
  ];
};

export default MemberRoutes;
