import type { QueryClient } from "@tanstack/react-query";

import { routes } from "constants/path";

import * as Pages from "pages";
import { Suspense } from "react";
import { RouteObject } from "react-router-dom";
import PrivateRouter from "routes/PrivateRouter";
import { Role } from "types/common/role.types";

const MemberRoutes = ({ queryClient }: { queryClient: QueryClient }): RouteObject[] => {
  return [
    {
      element: <PrivateRouter roles={[Role.ROLE_MEMBER]} />,
      path: routes.root,
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
          path: routes.member.album.dynamic(),
          element: <Pages.PhotoAlbumPage />
        },
        {
          path: routes.member.album.date.dynamic(),
          element: <Pages.DateAlbumPage />
        },
        {
          path: routes.member.agenda.dynamic(),
          element: <Pages.AgendaPage />
        },
        {
          path: routes.member.mypage.root,
          element: (
            <Suspense>
              <Pages.MemberMyPage />
            </Suspense>
          )
        },
        {
          path: routes.member.mypage.profile.root,
          element: (
            <Suspense>
              <Pages.MemberMyInfoPage />
            </Suspense>
          )
        },
        {
          path: routes.member.mypage.profile.edit.root,
          element: (
            <Suspense>
              <Pages.MemberMyInfoEditPage />
            </Suspense>
          )
        },
        {
          path: routes.member.mypage.dog.school.dynamic(),
          element: (
            <Suspense>
              <Pages.MemberSchoolInfoPage />
            </Suspense>
          )
        },
        {
          path: routes.member.mypage.enrollment.root,
          element: (
            <Suspense>
              <Pages.MemberEnrollmentPage />
            </Suspense>
          )
        },
        {
          path: routes.member.dogInfo.edit.dynamic(),
          element: (
            <Suspense>
              <Pages.MemberDogInfoEditPage />
            </Suspense>
          )
        },
        {
          path: routes.member.dogInfo.enrollment.dynamic(),
          element: (
            <Suspense>
              <Pages.MemberEnrollmentDogInfoPage />
            </Suspense>
          )
        },
        {
          path: routes.member.dogInfo.dynamic(),
          element: (
            <Suspense>
              <Pages.MemberDogInfoPage />
            </Suspense>
          )
        },
        {
          path: routes.member.profile.root,
          element: (
            <Suspense>
              <Pages.MemberProfileEditPage />
            </Suspense>
          )
        },
        {
          path: routes.member.profile.dog.root,
          element: (
            <Suspense>
              <Pages.MemberAddDogProfileEditPage />
            </Suspense>
          )
        },
        {
          path: routes.member.mypage.enrollment.root,
          element: (
            <Suspense>
              <Pages.MemberEnrollmentPage />
            </Suspense>
          )
        }
      ]
    }
  ];
};

export default MemberRoutes;
