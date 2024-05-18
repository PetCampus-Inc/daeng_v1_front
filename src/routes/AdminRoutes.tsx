import type { QueryClient } from "@tanstack/react-query";

import { PATH } from "constants/path";

import * as Pages from "pages";
import { Suspense } from "react";
import { createRoutesFromElements, Route } from "react-router-dom";
import { useRecoilState } from "recoil";
import caredogLoader from "routes/caredogLoader";
import { adminInfoState } from "store/admin";

const AdminRoutes = ({ queryClient }: { queryClient: QueryClient }) => {
  const [auth] = useRecoilState(adminInfoState);

  return createRoutesFromElements(
    <Route path={PATH.ADMIN}>
      <Route path={PATH.ADMIN_LOGIN} element={<Pages.AdminLoginPage />} />
      <Route path={PATH.ADMIN_SIGNUP} element={<Pages.AdminSignupPage />} />
      <Route path={PATH.ADMIN_ATTENDANCE}>
        <Route
          index
          element={
            <Suspense>
              <Pages.AttendancePage />
            </Suspense>
          }
        />
        <Route
          path={PATH.ADMIN_ATTENDANCE_INFO()}
          element={
            <Suspense>
              <Pages.DogInfoPage />
            </Suspense>
          }
        />
        <Route
          path={PATH.ADMIN_ATTENDANCE_INFO_NEW_TICKET()}
          element={
            <Suspense>
              <Pages.NewTicketPage />
            </Suspense>
          }
        />
        <Route
          path={PATH.ADMIN_ATTENDANCE_INFO_GALLERY()}
          element={
            <Suspense>
              <Pages.DogGalleryPage />
            </Suspense>
          }
        />
      </Route>
      <Route path={PATH.ADMIN_CARE}>
        <Route
          index
          id="caredog"
          loader={() => caredogLoader({ adminId: auth?.adminId, queryClient })}
          element={
            <Suspense>
              <Pages.AttendCarePage />
            </Suspense>
          }
        />
        <Route path="delete" element={<Pages.AttendCareDeletePage />} />
        <Route
          path={PATH.ADMIN_CARE_NOTICE()}
          element={
            <Suspense>
              <Pages.AttendCareNoticePage />
            </Suspense>
          }
        />
        <Route path={PATH.ADMIN_CARE_GALLERY} element={<Pages.AttendCareGallery type="main" />} />
        <Route path={PATH.ADMIN_CARE_INFO()}>
          <Route index element={<Pages.AttendCareInfo />} />
          <Route
            path={PATH.ADMIN_CARE_INFO_GALLERY()}
            element={<Pages.AttendCareGallery type="info" />}
          />
        </Route>
      </Route>
      <Route
        path={PATH.ADMIN_CHAT}
        element={
          <Suspense>
            <Pages.Chat />
          </Suspense>
        }
      />
      <Route path={PATH.ADMIN_SCHOOL_MANAGE}>
        <Route
          index
          element={
            <Suspense>
              <Pages.SchoolManagePage />
            </Suspense>
          }
        />
        <Route
          path={PATH.ADMIN_TEACHER_MANAGE}
          element={
            <Suspense>
              <Pages.TeacherManagePage />
            </Suspense>
          }
        />
        <Route path={PATH.ADMIN_ENROLLMENT}>
          <Route
            index
            element={
              <Suspense>
                <Pages.SchoolManageEnrollmentPage />
              </Suspense>
            }
          />
          <Route
            path={PATH.ADMIN_MEMBER_FORM()}
            element={
              <Suspense>
                <Pages.MemberEnrollmentFormDetailPage />
              </Suspense>
            }
          />
          <Route path={PATH.ADMIN_FORMS}>
            <Route
              index
              element={
                <Suspense>
                  <Pages.EnrollmentFormListPage />
                </Suspense>
              }
            />
            <Route
              path={PATH.ADMIN_EDIT_FORM()}
              element={
                <Suspense>
                  <Pages.EnrollmentFormEditPage />
                </Suspense>
              }
            />
            <Route
              path={PATH.ADMIN_FORM()}
              element={
                <Suspense>
                  <Pages.EnrollmentFormDetailPage />
                </Suspense>
              }
            />
          </Route>
          <Route
            path={PATH.ADMIN_CREATE_FORM}
            element={
              <Suspense>
                <Pages.EnrollmentFormCreatePage />
              </Suspense>
            }
          />
          <Route
            path={PATH.ADMIN_SUBMIT_FORM}
            element={
              <Suspense>
                <Pages.EnrollmentFormSubmitPage />
              </Suspense>
            }
          />
        </Route>
      </Route>
      <Route path={PATH.ADMIN_MY_PAGE}>
        <Route
          index
          element={
            auth?.role === "ROLE_OWNER" ? (
              <Suspense>
                <Pages.PrincipalMyPage />
              </Suspense>
            ) : (
              <Suspense>
                <Pages.TeacherMyPage />
              </Suspense>
            )
          }
        />
        {/* <Route path={PATH.ADMIN_MY_PAGE_EDIT} element={<Pages.EditAdminProfile />} /> */}
        <Route
          path={PATH.ADMIN_MY_SCHOOL_INFO}
          element={
            <Suspense>
              <Pages.SchoolInfoPage />
            </Suspense>
          }
        />
        {/* <Route path={PATH.ADMIN_MY_SCHOOL_INFO_EDIT} element={<Pages.SchoolInfoEditPage />} /> */}
      </Route>
    </Route>
  );
};

export default AdminRoutes;
