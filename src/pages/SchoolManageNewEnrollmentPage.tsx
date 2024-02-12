import Header from "components/common/Header"
import TitleWithIcon from "components/Admin/SchoolManage/TitleWithIcon"
import ListIcon from "assets/svg/list-icon"

const SchoolManageNewEnrollmentPage = () => {
  return (
    <>
      <Header type="text" text="신규가입"/>
      <div style={{margin:`calc(5vh + 32px) 16px` }}>
        <TitleWithIcon title="신규가입" icon={<ListIcon/>} />
      </div>
    </>
  )
}

export default SchoolManageNewEnrollmentPage