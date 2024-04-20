import { PATH } from "constants/path";

import { Link, useParams } from "react-router-dom";

const AttendCareInfoPage = () => {
  const { dogId } = useParams();
  if (!dogId) return null;

  return (
    <div>
      AttendCareInfoPage
      <br />
      <Link to={PATH.ADMIN_CARE_INFO_GALLERY(parseInt(dogId))}>사진 앨범 전송으로 이동</Link>
    </div>
  );
};

export default AttendCareInfoPage;
