import { SCHOOL_PHONE_REGEX } from "constants/validCheck";

import { Flex, Layout, SearchInput, Text, TextInput } from "components/common";
import Header from "components/common/Header";
import Postcode from "components/common/Postcode";
import AddressModifyBottomSheet from "components/SignUp/modal/AddressModifyBottomSheet";
import { useSchoolInfoEdit } from "hooks/api/admin/mypage";
import useGetPrincipalInfo from "hooks/api/useGetPrincipalInfo";
import { useAdminInfo } from "hooks/common/useAdminInfo";
import { useOverlay } from "hooks/common/useOverlay";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { formatSchoolNumber } from "utils/formatter";
import { isEmpty } from "utils/is";

import { BottomButton } from "../../components/common/Button";
import { PreventLeaveModal } from "../../components/common/Modal";

const SchoolInfoEditPage = () => {
  const [isPhoneDirty, setIsPhoneDirty] = useState(false);
  const { data } = useGetPrincipalInfo();
  const { schoolId } = useAdminInfo();
  const overlay = useOverlay();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    setValue,
    watch,
    getFieldState,
    formState: { dirtyFields }
  } = useForm();
  const { schoolInfoEditMutation } = useSchoolInfoEdit();

  const watchAddress = watch("schoolAddress", "");
  const schoolNameFieldState = getFieldState("newSchoolName");
  const addressFieldState = getFieldState("schoolAddress");
  const detailAddressFieldState = getFieldState("schoolAddressDetail");

  const isDirty = !isEmpty(dirtyFields) || isPhoneDirty;

  const openModal = () => {
    if (
      schoolNameFieldState.isDirty ||
      isPhoneDirty ||
      addressFieldState.isTouched ||
      detailAddressFieldState.isDirty
    ) {
      overlay.open(({ isOpen, close }) => (
        <PreventLeaveModal isOpen={isOpen} close={close} action={() => navigate("/admin/mypage")} />
      ));
    } else {
      navigate("/admin/mypage");
    }
  };

  const handleCompleteAddress = (value: string) => {
    setValue("schoolAddress", value);
  };

  const openPostCodePopup = () =>
    overlay.open(({ isOpen, close }) => (
      <Postcode isOpen={isOpen} close={close} onComplete={handleCompleteAddress} />
    ));

  const handleAddressFieldClick = () => {
    if (watchAddress.length > 0) {
      openAddressModifyPopup();
    } else {
      openPostCodePopup();
    }
  };

  const openAddressModifyPopup = () =>
    overlay.open(({ isOpen, close }) => (
      <AddressModifyBottomSheet
        isOpen={isOpen}
        close={close}
        action={openPostCodePopup}
        address={watchAddress}
      />
    ));

  const handleClear = () => {
    setValue("schoolAddress", "");
  };

  const handleChangeNumber = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formattedValue = formatSchoolNumber(value);
    setValue(field, formattedValue);
    setIsPhoneDirty(true);
  };

  const onSubmit = handleSubmit((data) => {
    const req = {
      schoolId: schoolId,
      schoolName: data.newSchoolName,
      phoneNumber: data.newSchoolNumber,
      address: data.schoolAddress,
      addressDetail: data.schoolAddressDetail
    };
    schoolInfoEditMutation(req);
  });

  return (
    <>
      <Header type="text" text="유치원 정보 수정" handleClick={openModal} />
      <Layout type="detail" paddingTop="2rem" paddingX="1rem">
        <Flex direction="column" height="62%" justify="space-between">
          <Flex direction="column" gap={8}>
            <Text typo="label2_14_R" color="darkBlack">
              유치원 이름
            </Text>
            <TextInput
              className="defaultValue"
              defaultValue={data.schoolName}
              name="newSchoolName"
              register={register}
              rules={{
                minLength: 1
              }}
            />
          </Flex>
          <Flex direction="column" gap={8}>
            <Text typo="label2_14_R" color="darkBlack">
              전화번호
            </Text>
            <TextInput
              className="defaultValue"
              defaultValue={data.schoolNumber}
              name="newSchoolNumber"
              register={register}
              rules={{
                pattern: {
                  value: SCHOOL_PHONE_REGEX,
                  message: "올바른 연락처를 입력해주세요"
                }
              }}
              onChange={handleChangeNumber("newSchoolNumber")}
            />
          </Flex>
          <Flex direction="column" gap={8}>
            <Text typo="label2_14_R" color="darkBlack">
              유치원 주소
            </Text>
            <SearchInput
              name="schoolAddress"
              className="defaultValue"
              register={register}
              placeholder="주소를 검색해 주세요"
              onSearch={openPostCodePopup}
              onClick={handleAddressFieldClick}
              onClear={handleClear}
              defaultValue={data?.address}
              required
            />
            <TextInput
              name="schoolAddressDetail"
              className="defaultValue"
              register={register}
              defaultValue={data.addressDetail}
              required
            />
          </Flex>
          <Flex direction="column" gap={8}>
            <Text typo="label2_14_R" color="darkBlack">
              사업자 등록번호
            </Text>
            <Text typo="caption1_12_R" color="darkBlack">
              사업자등록번호 변경을 원하시면 010-6684-3515로 문의 주세요
            </Text>
            <TextInput placeholder={data.registrationNumber} disabled />
          </Flex>
        </Flex>
        <BottomButton disabled={!isDirty} wrapColor="white" type="submit" onClick={onSubmit}>
          수정 완료
        </BottomButton>
      </Layout>
    </>
  );
};

export default SchoolInfoEditPage;
